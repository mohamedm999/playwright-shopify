import { Page, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ForgotPasswordPage } from '../pages/ForgotPasswordPage';

/**
 * Helper function to assert that a login attempt was rejected.
 * We keep assertions out of the Page Object (Rule #4) and place them here.
 */
export async function expectLoginRejected(page: Page, loginPage: LoginPage) {
  await expect(page).toHaveURL(/\/account\/login/);

  // If there's an explicit error message shown, verify it
  if (await loginPage.errorMessage.count()) {
    await expect(loginPage.errorMessage.first()).toBeVisible();
    return;
  }

  // Otherwise, fallback to checking if the captcha challenge appeared
  await expect(loginPage.captchaProtectedLoginForm).toBeAttached();
}

/**
 * Helper to assert the recovery form is visible.
 * Assertions belong in the test layer, not in the Page Object.
 */
export async function expectRecoverFormVisible(page: Page, forgotPasswordPage: ForgotPasswordPage) {
  await expect(page).toHaveURL(/\/account\/login/);
  await expect(forgotPasswordPage.recoverForm).toBeVisible();
  await expect(forgotPasswordPage.emailInput).toBeVisible();
}

/**
 * Helper to assert that a reset request was processed.
 */
export async function expectResetRequestHandled(page: Page, forgotPasswordPage: ForgotPasswordPage) {
  await expect(page).toHaveURL(/\/account\/login/);

  if (await forgotPasswordPage.outcomeMessage.count()) {
    await expect(forgotPasswordPage.outcomeMessage.first()).toBeVisible();
    return;
  }

  // Fallback state if no direct outcome message is presented
  await expectRecoverFormVisible(page, forgotPasswordPage);
}
