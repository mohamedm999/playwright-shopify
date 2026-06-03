import { Page, Locator } from '@playwright/test';

export class ForgotPasswordPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly submitBtn: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.emailInput = page.getByLabel('Email Address');
    this.submitBtn = page.getByRole('button', { name: /submit|reset|send/i });
    this.successMessage = page.getByText(/sent|email|reset/i);
  }

  async goto(): Promise<void> {
    await this.page.goto('/account/login');
    // Click forgot password link from login page
    const forgotLink = this.page.getByText('Forgot your password?');
    await forgotLink.click();
  }

  async requestReset(email: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.submitBtn.click();
  }
}