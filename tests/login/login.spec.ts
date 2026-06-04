import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { testData } from '../../fixtures/test-data';

test.describe('Login Page — UI Visibility', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('UI-001: Email field is visible', async () => {
    await expect(loginPage.emailInput).toBeVisible();
  });

  test('UI-002: Password field is visible', async () => {
    await expect(loginPage.passwordInput).toBeVisible();
  });

  test('UI-003: Login button is visible', async () => {
    await expect(loginPage.loginBtn).toBeVisible();
  });

  test('UI-004: Forgot password link is visible', async () => {
    await expect(loginPage.forgotPasswordLink).toBeVisible();
  });
});

test.describe('Login Page — Validation (Data-Driven)', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  for (const user of testData.invalidUsers) {
    test(`Invalid Login: ${user.description}`, async () => {
      await loginPage.login(user.email, user.password);
      await loginPage.expectLoginRejected();
    });
  }
});

test.describe('Login Page — Functional', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('FUN-001: Valid login redirects to account page', async ({ page }) => {
    await loginPage.login(testData.validUser.email, testData.validUser.password);
    await expect(page).toHaveURL(/\/account/);
  });

  test('FUN-002: Invalid login is rejected', async () => {
    await loginPage.login('wrong@test.com', 'wrongpassword');
    await loginPage.expectLoginRejected();
  });

  test('FUN-003: Unregistered email is rejected', async () => {
    await loginPage.login('nonexistent@test.com', 'anypassword');
    await loginPage.expectLoginRejected();
  });

  test('FUN-004: Session persists after page reload', async ({ page }) => {
    await loginPage.login(testData.validUser.email, testData.validUser.password);
    await expect(page).toHaveURL(/\/account/);
    await page.reload();
    await expect(page).toHaveURL(/\/account/);
  });
});

test.describe('Login Page — Security (Data-Driven)', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  for (const payload of testData.securityPayloads) {
    test(`Security: ${payload.description}`, async ({ page }) => {
      await loginPage.login(payload.email, payload.password);
      // Attack should NOT succeed — user should NOT be logged in
      await expect(page).not.toHaveURL(/\/account(?!\/login)/);
    });
  }
});
