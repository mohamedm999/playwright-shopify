import { defineConfig, devices } from '@playwright/test';
import { env, validateEnv } from './config/env';

// Validate environment variables before running any tests
validateEnv();

export default defineConfig({
  // Test directory
  testDir: './tests',

  // Maximum time a single test can run
  timeout: 30_000,

  // Maximum time an `expect` assertion can wait
  expect: {
    timeout: 5_000,
  },

  // Run tests in parallel (full parallel mode)
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in source
  forbidOnly: !!process.env.CI,

  // Retry failed tests once on CI, twice locally for debugging
  retries: process.env.CI ? 1 : 2,

  // Use all available workers for parallel execution
  workers: process.env.CI ? 1 : undefined,

  // HTML reporter for human-readable results
  reporter: [
    ['html', { open: 'never' }],
    ['list'],
  ],

  // Shared settings for all tests
  use: {
    // Base URL - all page.goto() calls use relative paths
    baseURL: env.BASE_URL,

    // Browser context settings
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,

    // Artifacts - capture evidence on failure
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    video: 'retain-on-failure',

    // Navigation timeout
    navigationTimeout: 15_000,
    actionTimeout: 10_000,
  },

  // Browser projects
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 13'] },
    },
  ],
});
