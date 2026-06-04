import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginBtn: Locator;
  readonly forgotPasswordLink: Locator;
  readonly errorMessage: Locator;
  readonly customerLoginForm: Locator;
  readonly captchaProtectedLoginForm: Locator;

  constructor(page: Page) {
    super(page, 'LoginPage');

    this.customerLoginForm = page.locator('form#customer_login');
    this.emailInput = this.customerLoginForm.getByLabel('Email Address');
    this.passwordInput = this.customerLoginForm.getByLabel('Password');
    this.loginBtn = this.customerLoginForm.getByRole('button', { name: /sign in/i });
    this.forgotPasswordLink = this.customerLoginForm.getByText('Forgot your password?');
    this.errorMessage = page.locator('.errors, [role="alert"]');
    this.captchaProtectedLoginForm = page.locator(
      'form#customer_login[data-cptcha="true"][data-hcaptcha-bound="true"]',
    );
  }

  async goto(): Promise<void> {
    await this.navigateTo('/account/login');
  }

  async login(email: string, password: string): Promise<void> {
    this.logger.info(`Attempting login with email: ${email}`);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginBtn.click();
  }

  async fillEmail(email: string): Promise<void> {
    this.logger.info(`Filling email: ${email}`);
    await this.emailInput.fill(email);
  }

  async fillPassword(password: string): Promise<void> {
    this.logger.info('Filling password');
    await this.passwordInput.fill(password);
  }

  async clickLogin(): Promise<void> {
    this.logger.info('Clicking login button');
    await this.loginBtn.click();
  }

  async clickForgotPassword(): Promise<void> {
    this.logger.info('Clicking forgot password link');
    await this.forgotPasswordLink.click();
  }
}
