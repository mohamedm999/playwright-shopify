import { Page } from '@playwright/test';
import { LoginPage } from './LoginPage';
import { ForgotPasswordPage } from './ForgotPasswordPage';
import { RegisterPage } from './RegisterPage';

/**
 * Page Object Manager that lazily instantiates pages.
 * Centralizes page creation and keeps test fixtures clean.
 */
export class PageManager {
  private _loginPage?: LoginPage;
  private _forgotPasswordPage?: ForgotPasswordPage;
  private _registerPage?: RegisterPage;

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

  get registerPage(): RegisterPage {
    if (!this._registerPage) {
      this._registerPage = new RegisterPage(this.page);
    }
    return this._registerPage;
  }
}
