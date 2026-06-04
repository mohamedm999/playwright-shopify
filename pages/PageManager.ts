import { Page } from '@playwright/test';
import { LoginPage } from './LoginPage';
import { ForgotPasswordPage } from './ForgotPasswordPage';

/**
 * Page Object Manager that lazily instantiates pages.
 * Centralizes page creation and keeps test fixtures clean.
 */
export class PageManager {
  private _loginPage?: LoginPage;
  private _forgotPasswordPage?: ForgotPasswordPage;

  constructor(private readonly page: Page) {}

  get loginPage(): LoginPage {
    if (!this._loginPage) {
      this._loginPage = new LoginPage(this.page);
    }
    return this._loginPage;
  }

  get forgotPasswordPage(): ForgotPasswordPage {
    if (!this._forgotPasswordPage) {
      this._forgotPasswordPage = new ForgotPasswordPage(this.page);
    }
    return this._forgotPasswordPage;
  }
}
