import type { Locator, Page } from '@playwright/test';
import { env } from '../config/env';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly forgotPasswordLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByLabel(/email/i);
    this.passwordInput = page.getByLabel(/password/i);
    this.submitButton = page.getByRole('button', { name: /log in|login|sign in/i });
    this.forgotPasswordLink = page.getByRole('link', { name: /forgot password/i });
  }

  async goto() {
    await this.page.goto(env.loginPath);
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submit();
  }

  async submit() {
    await this.submitButton.click();
  }
}
