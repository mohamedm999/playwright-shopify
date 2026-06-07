import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class RegisterPage extends BasePage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly createBtn: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page, 'RegisterPage');

    // Using input#id locators because Shopify uses the same IDs for both 
    // the wrapper div and the input element, causing strict mode violations.
    this.firstNameInput = page.locator('input#first_name');
    this.lastNameInput = page.locator('input#last_name');
    this.emailInput = page.locator('input#email');
    this.passwordInput = page.locator('input#password');
    this.createBtn = page.getByRole('button', { name: /create|register/i });
    this.errorMessage = page.locator('.errors, [role="alert"]'); // Shopify default error container
  }

  async goto(): Promise<void> {
    await this.navigateTo('/account/register');
  }

  async register(firstName: string, lastName: string, email: string, password: string): Promise<void> {
    this.logger.info(`Attempting registration for email: ${email}`);

    if (firstName) await this.firstNameInput.fill(firstName);
    if (lastName) await this.lastNameInput.fill(lastName);
    if (email) await this.emailInput.fill(email);
    if (password) await this.passwordInput.fill(password);
    
    await this.createBtn.click();
  }
}
