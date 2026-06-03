import { test, expect } from '@playwright/test';
import { ForgotPasswordPage } from '../../pages/ForgotPasswordPage';
import { users, forgotPasswordMessages } from '../../fixtures/test-data';

test.describe('Forgot password', () => {
  test.beforeEach(async ({ page }) => {
    const forgotPasswordPage = new ForgotPasswordPage(page);
    await forgotPasswordPage.goto();
  });

  test('shows reset password form', async ({ page }) => {
    const forgotPasswordPage = new ForgotPasswordPage(page);

    await expect(forgotPasswordPage.emailInput).toBeVisible();
    await expect(forgotPasswordPage.submitBtn).toBeVisible();
  });

  test('submits reset request for registered email', async ({ page }) => {
    const forgotPasswordPage = new ForgotPasswordPage(page);

    await forgotPasswordPage.requestReset(users.valid.email);

    await expect(page.getByText(forgotPasswordMessages.requestSubmitted)).toBeVisible();
  });
});
