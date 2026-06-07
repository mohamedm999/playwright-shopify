import { Page } from '@playwright/test';
import { Logger, createLogger } from '../utils/logger';

/**
 * Base Page Object that provides common Playwright page interactions
 * and structured logging capabilities.
 */
export abstract class BasePage {
  readonly page: Page;
  readonly logger: Logger;

  /**
   * Initializes the BasePage with a specific context for logging.
   * @param page - The Playwright Page instance
   * @param pageName - The name of the page object for logging context
   */
  constructor(page: Page, pageName: string) {
    this.page = page;
    this.logger = createLogger(pageName);
  }

  /**
   * Navigates to the specified URL and logs the action.
   * @param url - The relative or absolute URL to navigate to
   */
  async navigateTo(url: string): Promise<void> {
    this.logger.info(`Navigating to ${url}`);
    await this.page.goto(url);
  }
}
