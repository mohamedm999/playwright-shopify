import { Page } from '@playwright/test';
import { createLogger } from './logger';

const logger = createLogger('ScreenshotHelper');

/**
 * Captures a full-page screenshot with a descriptive name.
 * Screenshots are automatically saved by Playwright's artifact system,
 * but this helper provides explicit control for debugging.
 */
export async function captureScreenshot(
  page: Page,
  name: string,
  options?: { fullPage?: boolean }
): Promise<Buffer> {
  const screenshotName = `${name}-${Date.now()}`;
  logger.info(`Capturing screenshot: ${screenshotName}`);

  const buffer = await page.screenshot({
    path: `test-results/screenshots/${screenshotName}.png`,
    fullPage: options?.fullPage ?? true,
  });

  return buffer;
}

/**
 * Captures a screenshot of a specific element.
 */
export async function captureElementScreenshot(
  page: Page,
  selector: string,
  name: string
): Promise<Buffer> {
  const element = page.locator(selector);
  const screenshotName = `${name}-element-${Date.now()}`;
  logger.info(`Capturing element screenshot: ${screenshotName}`);

  return await element.screenshot({
    path: `test-results/screenshots/${screenshotName}.png`,
  });
}