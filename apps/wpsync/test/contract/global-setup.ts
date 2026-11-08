import type { TestProject } from "vitest/node";
import { BASE_URL, clearApplicationPasswords, freshLoginPassword, removeBridge, startSite } from "@wp-dev-automation/test-harness";

/** Throwaway login passwords for the harness site, set fresh every run. */
export interface ConnectHarness {
  baseUrl: string;
  adminPassword: string;
  editorPassword: string;
}

declare module "vitest" {
  export interface ProvidedContext {
    connectHarness: ConnectHarness;
  }
}

/** Starts from a site wpsync has never touched: no bridge, no Application Passwords. */
export default function setup(project: TestProject): void {
  startSite();
  removeBridge();
  clearApplicationPasswords("admin");
  clearApplicationPasswords("editor");
  project.provide("connectHarness", {
    baseUrl: BASE_URL,
    adminPassword: freshLoginPassword("admin"),
    editorPassword: freshLoginPassword("editor"),
  });
}
