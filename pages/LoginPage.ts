import { expect, Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginBtn: Locator;
  readonly forgotPasswordLink: Locator;
  readonly errorMessage: Locator;
  readonly customerLoginForm: Locator;
  readonly captchaProtectedLoginForm: Locator;

  constructor(page: Page) {
    this.page = page;

    this.emailInput = page.getByLabel('Email Address');
    this.passwordInput = page.getByLabel('Password');
    this.customerLoginForm = page.locator('form#customer_login');
    this.loginBtn = this.customerLoginForm.getByRole('button', { name: /sign in/i });
    this.forgotPasswordLink = page.getByText('Forgot your password?');
    this.errorMessage = page.locator('.errors, [role="alert"]');
    this.captchaProtectedLoginForm = page.locator(
      'form#customer_login[data-cptcha="true"][data-hcaptcha-bound="true"]',
    );
  }

  async goto(): Promise<void> {
    await this.page.goto('/account/login');
  }
 
  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginBtn.click();
  }

  async expectLoginRejected(): Promise<void> {
    await expect(this.page).toHaveURL(/\/account\/login/);

    if (await this.errorMessage.count()) {
      await expect(this.errorMessage.first()).toBeVisible();
      return;
    }

    await expect(this.captchaProtectedLoginForm).toBeAttached();
  }

  async fillEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async clickLogin(): Promise<void> {
    await this.loginBtn.click();
  }

  async clickForgotPassword(): Promise<void> {
    await this.forgotPasswordLink.click();
  }
}
