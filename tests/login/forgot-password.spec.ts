import { test, expect } from '../../fixtures/page-fixtures';
import { testData } from '../../fixtures/test-data';
import { expectRecoverFormVisible, expectResetRequestHandled } from '../../utils/assertions';

test.describe('Forgot Password - Navigation', () => {
  test.beforeEach(async ({ pm }) => {
    await pm.loginPage.goto();
  });

  test('FP-001: Clicking forgot password shows reset form', async ({ page, pm }) => {
    await pm.loginPage.clickForgotPassword();
    await expect(page).toHaveURL(/\/account\/login/);
    await expectRecoverFormVisible(page, pm.forgotPasswordPage);
  });
});

test.describe('Forgot Password - Reset Flow', () => {
  test.beforeEach(async ({ pm }) => {
    await pm.forgotPasswordPage.goto();
  });

  test('FP-002: Valid email reset request is handled', async ({ page, pm }) => {
    await pm.forgotPasswordPage.requestReset(testData.resetEmails.valid);
    await expectResetRequestHandled(page, pm.forgotPasswordPage);
  });

  test('FP-003: Unregistered email is handled appropriately', async ({ page, pm }) => {
    await pm.forgotPasswordPage.requestReset(testData.resetEmails.unregistered);
    await expectResetRequestHandled(page, pm.forgotPasswordPage);
  });

  test('FP-004: Empty email remains on reset form', async ({ page, pm }) => {
    await pm.forgotPasswordPage.requestReset(testData.resetEmails.empty);
    await expectRecoverFormVisible(page, pm.forgotPasswordPage);
  });

  test('FP-005: Invalid email format remains on reset form', async ({ page, pm }) => {
    await pm.forgotPasswordPage.requestReset(testData.resetEmails.invalid);
    await expectRecoverFormVisible(page, pm.forgotPasswordPage);
  });
});

test.describe('Forgot Password - Return Navigation', () => {
  test('FP-006: Cancel returns to login page', async ({ pm }) => {
    await pm.forgotPasswordPage.goto();
    await pm.forgotPasswordPage.cancel();
    await expect(pm.loginPage.emailInput).toBeVisible();
  });
});
