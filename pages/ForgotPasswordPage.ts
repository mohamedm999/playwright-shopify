import type { Locator, Page } from '@playwright/test';
import { env } from '../config/env';

export class ForgotPasswordPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByLabel(/email/i);
    this.submitButton = page.getByRole('button', { name: /reset|send|submit/i });
  }

  async goto() {
    await this.page.goto(env.forgotPasswordPath);
  }

  async requestReset(email: string) {
    await this.emailInput.fill(email);
    await this.submitButton.click();
  }
}
