import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { users, loginMessages, securityPayloads } from '../../fixtures/test-data';

test.describe('Login', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('shows login form', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginBtn).toBeVisible();
  });

  test('validates required fields', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.clickLogin();

    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
  });

  test('rejects invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(users.invalid.email, users.invalid.password);

    await expect(page.getByText(loginMessages.invalidCredentials)).toBeVisible();
  });

  for (const payload of securityPayloads) {
    test(`does not authenticate security payload: ${payload.name}`, async ({ page }) => {
      const loginPage = new LoginPage(page);

      await loginPage.login(payload.value, payload.value);

      await expect(loginPage.loginBtn).toBeVisible();
    });
  }
});
