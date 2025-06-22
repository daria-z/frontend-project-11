// playwright.config.js
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./test-data",
  timeout: 30000,
  use: {
    headless: true,
    baseURL: "http://localhost:8080",
    viewport: { width: 1280, height: 720 },
    screenshot: "only-on-failure",
    trace: "on-first-retry",
  },
  retries: 1,
  reporter: [["html", { open: "never" }]],
  projects: [
    {
      name: "chromium",
      use: { browserName: "chromium" },
    },
  ],
});
