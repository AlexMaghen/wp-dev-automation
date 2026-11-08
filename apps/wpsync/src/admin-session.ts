import { z } from "zod";
import { WpsyncError } from "./errors";
import { CookieJar, http, parseJson } from "./http";
import type { Site } from "./site";

/**
 * A logged-in wp-admin session, used only while connecting: to create the Application Password
 * and to upload the bridge plugin, the two things an Application Password can't do by itself.
 */
export class AdminSession {
  private constructor(
    private readonly site: Site,
    private readonly jar: CookieJar,
  ) {}

  /** Logs in the way the browser login form does. The password is used for this one request. */
  static async login(site: Site, username: string, password: string): Promise<AdminSession> {
    const jar = new CookieJar();
    // wp-login.php refuses logins that don't carry its test cookie ("cookies are blocked").
    jar.set("wordpress_test_cookie", "WP%20Cookie%20check");
    const loginUrl = `${site.siteUrl}/wp-login.php`;

    const page = await http(loginUrl, { jar });
    if (page.status === 404 || !/name=["']log["']/.test(page.text)) {
      throw new WpsyncError(
        "login_page_missing",
        `The site's login page isn't at ${loginUrl}.`,
        "A security plugin may have moved it. Create an Application Password yourself (Users → Profile) and use that instead.",
      );
    }

    const response = await http(loginUrl, {
      method: "POST",
      jar,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        log: username,
        pwd: password,
        "wp-submit": "Log In",
        redirect_to: `${site.siteUrl}/wp-admin/`,
        testcookie: "1",
      }).toString(),
    });

    if (jar.has("wordpress_logged_in_")) return new AdminSession(site, jar);

    const error = /<div[^>]+id=["']login_error["'][^>]*>([\s\S]*?)<\/div>/i.exec(response.text);
    if (error?.[1]) {
      throw new WpsyncError("login_failed", `WordPress refused the login: ${plainText(error[1])}`);
    }
    throw new WpsyncError(
      "login_blocked",
      "The login didn't complete. The site probably asks for a second step, such as two-factor or a CAPTCHA.",
      "Create an Application Password yourself (Users → Profile → Application Passwords) and use that instead.",
    );
  }

  /** A nonce for REST calls made with this session's cookies. */
  private async restNonce(): Promise<string> {
    const response = await http(`${this.site.siteUrl}/wp-admin/admin-ajax.php?action=rest-nonce`, { jar: this.jar });
    const nonce = response.text.trim();
    if (response.status !== 200 || !/^[a-f0-9]{6,}$/i.test(nonce)) {
      throw new WpsyncError("nonce_failed", "WordPress didn't hand out a REST nonce for the login session.");
    }
    return nonce;
  }

  private async rest(method: string, route: string, body?: unknown): Promise<{ status: number; body: unknown }> {
    const headers: Record<string, string> = { Accept: "application/json", "X-WP-Nonce": await this.restNonce() };
    if (body !== undefined) headers["Content-Type"] = "application/json";
    const response = await http(this.site.restUrl(route), {
      method,
      jar: this.jar,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    return { status: response.status, body: parseJson(response.text) ?? response.text };
  }

  /** Creates an Application Password for the logged-in user. WordPress shows it only this once. */
  async createApplicationPassword(name: string): Promise<{ uuid: string; password: string }> {
    const result = await this.rest("POST", "/wp/v2/users/me/application-passwords", { name });
    const created = z.object({ uuid: z.string(), password: z.string() }).safeParse(result.body);
    if (result.status !== 201 || !created.success) {
      const code = (result.body as { code?: string } | undefined)?.code;
      throw new WpsyncError(
        "application_password_failed",
        `WordPress wouldn't create an Application Password (HTTP ${result.status}${code ? `, ${code}` : ""}).`,
        code === "application_passwords_disabled"
          ? "A plugin or setting has turned Application Passwords off. Turn them back on and connect again."
          : undefined,
      );
    }
    return created.data;
  }

  /** Revokes one of the user's Application Passwords. Missing ones are ignored. */
  async deleteApplicationPassword(uuid: string): Promise<void> {
    const result = await this.rest("DELETE", `/wp/v2/users/me/application-passwords/${uuid}`);
    if (result.status !== 200 && result.status !== 404) {
      throw new WpsyncError("application_password_delete_failed", `Couldn't revoke an old wpsync key (HTTP ${result.status}).`);
    }
  }

  /** Uploads a plugin zip through wp-admin's "Upload Plugin" form, as the browser would. */
  async uploadPlugin(zip: Uint8Array, filename: string): Promise<void> {
    const form = await http(`${this.site.siteUrl}/wp-admin/plugin-install.php?tab=upload`, { jar: this.jar });
    const section = form.text.slice(Math.max(0, form.text.indexOf("plugin-upload-form")));
    const nonce = /name=["']_wpnonce["']\s+value=["']([^"']+)["']/.exec(section)?.[1];
    if (form.status !== 200 || !nonce) {
      throw new WpsyncError(
        "plugin_upload_unavailable",
        "This site doesn't allow uploading plugins from wp-admin.",
        "The host has probably turned plugin installs off (DISALLOW_FILE_MODS). wpsync needs them for its bridge.",
      );
    }

    const body = new FormData();
    body.set("_wpnonce", nonce);
    body.set("_wp_http_referer", new URL(`${this.site.siteUrl}/wp-admin/plugin-install.php?tab=upload`).pathname + "?tab=upload");
    body.set("pluginzip", new Blob([new Uint8Array(zip)], { type: "application/zip" }), filename);
    body.set("install-plugin-submit", "Install Now");

    const response = await http(`${this.site.siteUrl}/wp-admin/update.php?action=upload-plugin`, {
      method: "POST",
      jar: this.jar,
      body,
    });
    if (/request-filesystem-credentials-form/.test(response.text)) {
      throw new WpsyncError(
        "filesystem_credentials",
        "WordPress asked for FTP details to install the bridge: it can't write plugin files itself on this host.",
      );
    }
  }

  /** Ends the session on the server too, so its login cookie stops working. Best effort. */
  async logout(): Promise<void> {
    try {
      const admin = await http(`${this.site.siteUrl}/wp-admin/`, { jar: this.jar });
      // The admin bar writes the "&" as &#038; (esc_url), older screens as &amp;.
      const href = /wp-login\.php\?action=logout(?:&#038;|&amp;|&)_wpnonce=([a-f0-9]+)/i.exec(admin.text);
      if (href?.[1]) {
        await http(`${this.site.siteUrl}/wp-login.php?action=logout&_wpnonce=${href[1]}`, { jar: this.jar });
      }
    } catch {
      // Leaving the session to expire on its own is acceptable.
    }
  }
}

function plainText(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#160;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .replace(/\s*Lost your password\?\s*$/i, "")
    .trim();
}
