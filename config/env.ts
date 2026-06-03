/**
 * Centralized environment configuration.
 * All environment-specific values are read here with sensible defaults.
 * Sensitive values MUST be provided via environment variables.
 */

export const env = {
  // Application under test
  BASE_URL: process.env.BASE_URL || 'https://sauce-demo.myshopify.com',

  // Test credentials - NEVER commit real passwords
  EMAIL: process.env.SHOPIFY_EMAIL || '',
  PASSWORD: process.env.SHOPIFY_PASSWORD || '',

  // Timeouts (in milliseconds)
  DEFAULT_TIMEOUT: Number(process.env.DEFAULT_TIMEOUT) || 30_000,
  NAVIGATION_TIMEOUT: Number(process.env.NAVIGATION_TIMEOUT) || 15_000,
  ACTION_TIMEOUT: Number(process.env.ACTION_TIMEOUT) || 10_000,

  // Environment flag
  IS_CI: !!process.env.CI,

  // Headless mode - default true, set false for local debugging
  HEADLESS: process.env.HEADLESS !== 'false',
} as const;

/**
 * Validates that required environment variables are set.
 * Call this at the top of playwright.config.ts or in a global setup.
 */
export function validateEnv(): void {
  const requiredForFunctionalTests = ['SHOPIFY_EMAIL', 'SHOPIFY_PASSWORD'];
  const missing = requiredForFunctionalTests.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    console.warn(
      `[WARN] Missing environment variables: ${missing.join(', ')}. ` +
        'Functional tests requiring credentials will use defaults or fail.',
    );
  }
}
