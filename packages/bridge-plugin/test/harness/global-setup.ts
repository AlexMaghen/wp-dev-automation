import type { TestProject } from "vitest/node";
import { BASE_URL, freshApplicationPassword, installBridge, startSite } from "@wp-dev-automation/test-harness";

/** What the bridge contract tests receive through inject(). */
export interface Harness {
  baseUrl: string;
  /** "user:application-password" for the administrator. */
  adminAuth: string;
  /** "user:application-password" for an editor, who must be refused. */
  editorAuth: string;
}

declare module "vitest" {
  export interface ProvidedContext {
    harness: Harness;
  }
}

export default function setup(project: TestProject): void {
  startSite();
  installBridge();
  project.provide("harness", {
    baseUrl: BASE_URL,
    adminAuth: freshApplicationPassword("admin"),
    editorAuth: freshApplicationPassword("editor"),
  });
}
