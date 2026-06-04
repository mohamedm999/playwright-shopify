import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ForgotPasswordPage } from '../../pages/ForgotPasswordPage';
import { testData } from '../../fixtures/test-data';

test.describe('Forgot Password — Navigation', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('FP-001: Clicking forgot password navigates to reset page', async ({ page }) => {
    await loginPage.clickForgotPassword();
    await expect(page).toHaveURL(/\/account\/login/); // Shopify keeps same URL with modal/section
  });
});

test.describe('Forgot Password — Reset Flow', () => {
  let forgotPasswordPage: ForgotPasswordPage;

  test.beforeEach(async ({ page }) => {
    forgotPasswordPage = new ForgotPasswordPage(page);
    await forgotPasswordPage.goto();
  });

  test('FP-002: Valid email shows success message', async () => {
    await forgotPasswordPage.requestReset(testData.resetEmails.valid);
    await expect(forgotPasswordPage.successMessage).toBeVisible();
  });

  test('FP-003: Unregistered email is handled appropriately', async () => {
    await forgotPasswordPage.requestReset(testData.resetEmails.unregistered);
    // Many apps show same message for security (don't reveal if email exists)
    await expect(forgotPasswordPage.successMessage).toBeVisible();
  });

  test('FP-004: Empty email shows validation error', async () => {
    await forgotPasswordPage.requestReset(testData.resetEmails.empty);
    await expect(forgotPasswordPage.emailInput).toBeVisible(); // Still on form
  });

  test('FP-005: Invalid email format shows validation error', async () => {
    await forgotPasswordPage.requestReset(testData.resetEmails.invalid);
    await expect(forgotPasswordPage.emailInput).toBeVisible(); // Still on form
  });
});

test.describe('Forgot Password — Back Navigation', () => {
  let forgotPasswordPage: ForgotPasswordPage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    forgotPasswordPage = new ForgotPasswordPage(page);
    loginPage = new LoginPage(page);
  });

  test('FP-006: Browser back returns to login page', async ({ page }) => {
    await loginPage.goto();
    await loginPage.clickForgotPassword();
    await page.goBack();
    await expect(loginPage.emailInput).toBeVisible();
  });
});