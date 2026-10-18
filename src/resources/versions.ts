import { baseURL } from "./once-ui.config";

/**
 * The docs versions, one deployed site per version.
 *
 * Each version is built from its own branch, so its pages and live examples
 * match what that version ships. The picker in the header moves between the
 * sites and keeps the reader on the same page.
 *
 * With one entry the header shows the version as a label. To add a version:
 * deploy its branch to its own URL, add an entry here (on every branch), and
 * set `CURRENT_VERSION` on each branch to that branch's entry. An entry with
 * `published: false` is listed but cannot be picked, for a site not up yet.
 *
 *   {
 *     id: "3",
 *     label: "3.0 beta",
 *     status: "beta",
 *     npmTag: "next",
 *     url: "https://next.docs.example.com",
 *     branch: "next",
 *     published: true,
 *     samePaths: true,
 *   },
 */
export type VersionStatus = "stable" | "beta" | "legacy";

export interface DocsVersion {
  id: string;
  /** Shown in the picker and the beta notice. */
  label: string;
  /** npm dist-tag a reader installs this version from, if it has one. */
  npmTag?: string;
  status: VersionStatus;
  /** Origin of this version's docs site. */
  url: string;
  /** Branch the site is built from; GitHub links point at it. */
  branch: string;
  /** Whether the site at `url` is deployed. */
  published: boolean;
  /**
   * Whether this site has the same page paths, so the picker can keep the
   * reader on the page they are on. Otherwise it opens the site's home page.
   */
  samePaths: boolean;
}

export const VERSIONS: DocsVersion[] = [
  {
    id: "2",
    label: "v2.2",
    npmTag: "latest",
    status: "stable",
    url: baseURL,
    branch: "main",
    published: true,
    samePaths: true,
  },
];

export const CURRENT_VERSION = "2";

export const currentVersion: DocsVersion =
  VERSIONS.find((v) => v.id === CURRENT_VERSION) ?? VERSIONS[0];

export const stableVersion: DocsVersion =
  VERSIONS.find((v) => v.status === "stable") ?? currentVersion;

/** The address of `path` on another version's site. */
export function versionHref(version: DocsVersion, path: string): string {
  if (!version.samePaths) return version.url;
  return `${version.url}${path.startsWith("/") ? path : `/${path}`}`;
}
