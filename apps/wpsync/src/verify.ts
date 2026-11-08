import { WpsyncError } from "./errors";
import type { Check } from "./doctor";
import { http, parseJson } from "./http";
import { projectAt, requireDocker } from "./project";

/**
 * `wpsync verify`: is the local copy really working? (design section 14.4, step 10.) Pages and
 * wp-admin load without PHP errors, permalinks work, no live address is left in the database,
 * images load, and the active plugins and theme match what live had at the pull.
 *
 * Pages are fetched over plain http://<name>.ddev.site, which DDEV also serves, so the check
 * doesn't depend on mkcert being trusted.
 */
export async function verify(options: { dir?: string } = {}): Promise<Check[]> {
  const project = projectAt(options.dir ?? process.cwd());
  if (!project.exists()) throw new WpsyncError("not_a_project", `${project.dir} isn't a wpsync site project.`);
  const meta = project.read();
  if (meta.setup !== "ready" || !meta.localUrl) throw new WpsyncError("not_pulled", "This project hasn't been pulled yet.");
  requireDocker();
  project.ddev(["start", "-y"]);

  const base = meta.localUrl.replace(/^https:/, "http:");
  const checks: Check[] = [];
  const page = async (id: string, label: string, url: string) => {
    const response = await http(url).catch(() => null);
    const status = response?.status ?? 0;
    const phpError = !!response && /There has been a critical error|Fatal error|Parse error|Warning: .* on line \d+/i.test(response.text);
    checks.push({
      id,
      label,
      ok: status === 200 && !phpError,
      detail: !response ? "no answer" : phpError ? `HTTP ${status}, with a PHP error on the page` : `HTTP ${status}`,
      fix: "Look at ddev logs for the PHP error, or compare the page with live.",
    });
    return response;
  };

  await page("home", "Home page", `${base}/`);
  await page("login", "wp-admin login page", `${base}/wp-login.php`);

  const links: string[] = [];
  for (const route of ["pages", "posts"]) {
    const response = await http(`${base}/wp-json/wp/v2/${route}?per_page=2&_fields=link`).catch(() => null);
    const list = response?.status === 200 ? parseJson(response.text) : null;
    if (Array.isArray(list)) for (const item of list) if (typeof item?.link === "string") links.push(item.link);
  }
  for (const [i, link] of links.entries()) await page(`content-${i + 1}`, "Content page", link.replace(/^https:/, "http:"));

  const structure = project.wp("option", "get", "permalink_structure");
  checks.push({
    id: "permalinks",
    label: "Pretty permalinks",
    ok: links.length === 0 || checks.filter((c) => c.id.startsWith("content-")).every((c) => c.ok),
    detail: structure ? `structure ${structure}` : "plain (?p=123) links",
    fix: "Run ddev wp rewrite flush; on Apache sites, check .htaccess came across.",
  });

  const liveHost = new URL(meta.homeUrl).host;
  const left = Number(
    project.wp("search-replace", `//${liveHost}`, `//${new URL(meta.localUrl).host}`, "--all-tables-with-prefix", "--dry-run", "--format=count") || "0",
  );
  checks.push({
    id: "live-urls",
    label: "No live addresses left in the database",
    ok: left === 0,
    detail: left === 0 ? "none" : `${left} still point at ${liveHost}`,
    fix: "Pull again; if they stay, they may be in a format wpsync can't rewrite (for example base64 in a page builder).",
  });

  const media = await http(`${base}/wp-json/wp/v2/media?per_page=3&_fields=source_url`).catch(() => null);
  const images = media?.status === 200 ? (parseJson(media.text) as Array<{ source_url?: string }> | undefined) ?? [] : [];
  if (images.length) {
    const results = await Promise.all(images.map((m) => (m.source_url ? http(m.source_url.replace(/^https:/, "http:")).catch(() => null) : null)));
    const bad = results.filter((r) => r?.status !== 200).length;
    checks.push({
      id: "images",
      label: "Images load",
      ok: bad === 0,
      detail: bad === 0 ? `${images.length} checked` : `${bad} of ${images.length} don't load`,
      fix: "Pull again: the files may not have come across.",
    });
  }

  if (meta.lastPull?.activePlugins) {
    const active = new Set(project.wp("plugin", "list", "--status=active", "--field=name").split("\n").filter(Boolean));
    const missing = meta.lastPull.activePlugins.filter((name) => !active.has(name));
    checks.push({
      id: "plugins",
      label: "Same active plugins as live",
      ok: missing.length === 0,
      detail: missing.length ? `not active locally: ${missing.join(", ")}` : `${active.size} active`,
      fix: "A plugin may have switched itself off locally (for example a license check). Look in the local wp-admin's Plugins page.",
    });
  }
  if (meta.lastPull?.theme) {
    const theme = project.wp("option", "get", "stylesheet");
    checks.push({
      id: "theme",
      label: "Same theme as live",
      ok: theme === meta.lastPull.theme,
      detail: theme,
      fix: `Live uses ${meta.lastPull.theme}.`,
    });
  }

  const logs = (() => {
    try {
      return project.ddev(["logs", "-s", "web", "--tail", "200"]);
    } catch {
      return "";
    }
  })();
  const fatals = logs.split("\n").filter((line) => /PHP Fatal error/.test(line));
  checks.push({
    id: "php-log",
    label: "No PHP fatal errors in the web server log",
    ok: fatals.length === 0,
    detail: fatals.length ? fatals[fatals.length - 1]!.slice(0, 200) : "none in the last 200 lines",
    fix: "Fix the error shown, then run wpsync verify again.",
  });
  return checks;
}
