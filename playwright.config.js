const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  workers: 1,
  use: {
    baseURL: "http://127.0.0.1:8765",
    storageState: { cookies: [], origins: [{ origin: "http://127.0.0.1:8765", localStorage: [{ name: "styleAtlas.analyticsConsent.v1", value: "denied" }] }] },
    trace: "retain-on-failure"
  },
  webServer: {
    command: "python3 -m http.server 8765 --bind 127.0.0.1",
    url: "http://127.0.0.1:8765",
    reuseExistingServer: true
  }
});
