import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ForgotPasswordPage extends BasePage {
  readonly recoverForm: Locator;
  readonly emailInput: Locator;
  readonly submitBtn: Locator;
  readonly cancelLink: Locator;
  readonly outcomeMessage: Locator;

  constructor(page: Page) {
    super(page, 'ForgotPasswordPage');

    this.recoverForm = page.locator('form[action="/account/recover"]');
    this.emailInput = this.recoverForm.locator('#recover-email');
    this.submitBtn = this.recoverForm.getByRole('button', { name: /submit/i });
    this.cancelLink = this.recoverForm.getByText('Cancel');
    this.outcomeMessage = page.locator('.errors, [role="alert"]').or(
      page.getByText(/password reset email|sent you an email|receive an email/i),
    );
  }

  async goto(): Promise<void> {
    await this.navigateTo('/account/login');
    const forgotLink = this.page.getByText('Forgot your password?');
    this.logger.info('Clicking forgot password link');
    await forgotLink.click();
  }

  async requestReset(email: string): Promise<void> {
    this.logger.info(`Requesting password reset for email: ${email}`);
    await this.emailInput.fill(email);
    await this.submitBtn.click();
  }

  async cancel(): Promise<void> {
    this.logger.info('Clicking cancel link');
    await this.cancelLink.click();
  }
}
