import type { InfoResponse } from "@wp-dev-automation/protocol";

/**
 * Picks DDEV settings that match the live site. When DDEV doesn't offer the live version, the
 * nearest newer one wins: newer PHP and databases still run older code and read older dumps,
 * while older ones can choke on newer syntax and collations.
 */

/** Versions DDEV 1.25 offers. */
export const DDEV_PHP = ["5.6", "7.0", "7.1", "7.2", "7.3", "7.4", "8.0", "8.1", "8.2", "8.3", "8.4", "8.5"];
export const DDEV_MARIADB = ["5.5", "10.0", "10.1", "10.2", "10.3", "10.4", "10.5", "10.6", "10.7", "10.8", "10.11", "11.4", "11.8"];
export const DDEV_MYSQL = ["5.5", "5.6", "5.7", "8.0", "8.4"];

function majorMinor(version: string): [number, number] {
  const [major = "0", minor = "0"] = version.split(".");
  return [Number.parseInt(major, 10) || 0, Number.parseInt(minor, 10) || 0];
}

function compare(a: string, b: string): number {
  const [am, an] = majorMinor(a);
  const [bm, bn] = majorMinor(b);
  return am - bm || an - bn;
}

/** The supported version equal to live's major.minor, else the nearest newer, else the newest. */
export function nearestVersion(live: string, supported: readonly string[]): string {
  const [major, minor] = majorMinor(live);
  const wanted = `${major}.${minor}`;
  const sorted = [...supported].sort(compare);
  return sorted.find((v) => compare(v, wanted) >= 0) ?? sorted[sorted.length - 1]!;
}

export interface DdevSettings {
  name: string;
  phpVersion: string;
  webserver: "nginx-fpm" | "apache-fpm";
  database: { type: "mariadb" | "mysql"; version: string };
}

/** A DDEV project name (it becomes <name>.ddev.site) from a site's home address. */
export function ddevName(homeUrl: string): string {
  const url = new URL(homeUrl);
  const raw = `${url.hostname}${url.pathname}`.toLowerCase();
  return raw.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 63).replace(/-+$/, "") || "site";
}

export function ddevSettings(info: InfoResponse, name: string): DdevSettings {
  const software = (info.server.software ?? "").toLowerCase();
  // Apache and LiteSpeed sites rely on .htaccess, which nginx ignores.
  const webserver = software.includes("apache") || software.includes("litespeed") ? "apache-fpm" : "nginx-fpm";
  const type = info.database.engine === "mysql" ? "mysql" : "mariadb";
  return {
    name,
    phpVersion: nearestVersion(info.php.version, DDEV_PHP),
    webserver,
    database: { type, version: nearestVersion(info.database.version, type === "mysql" ? DDEV_MYSQL : DDEV_MARIADB) },
  };
}

export function renderDdevConfig(settings: DdevSettings, homeUrl: string): string {
  return `# Local copy of ${homeUrl}, written by wpsync to match the live site's server.
# Changing php_version is safe; changing the database type or version means pulling again.
name: ${settings.name}
type: wordpress
docroot: wp
php_version: "${settings.phpVersion}"
webserver_type: ${settings.webserver}
database:
  type: ${settings.database.type}
  version: "${settings.database.version}"
web_environment:
  - WP_ENVIRONMENT_TYPE=local
`;
}
