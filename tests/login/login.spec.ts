import { test, expect } from '../../fixtures/page-fixtures';
import { testData } from '../../fixtures/test-data';
import { expectLoginRejected } from '../../utils/assertions';

// This top-level hook applies to EVERY test inside this file automatically
test.beforeEach(async ({ pm }) => {
  await pm.loginPage.goto();
});

test.describe('Login Page — UI Visibility', () => {

  test('UI-001 to UI-004: Core UI elements are visible', async ({ pm }) => {
    // Using soft assertions: if one element is missing, it won't stop the test,
    // allowing us to see all missing elements in a single run.
    await expect.soft(pm.loginPage.emailInput, 'Email input should be visible').toBeVisible();
    await expect.soft(pm.loginPage.passwordInput, 'Password input should be visible').toBeVisible();
    await expect.soft(pm.loginPage.loginBtn, 'Login button should be visible').toBeVisible();
    await expect.soft(pm.loginPage.forgotPasswordLink, 'Forgot password link should be visible').toBeVisible();
  });
});

test.describe('Login Page — Validation (Data-Driven)', () => {

  for (const user of testData.invalidUsers) {
    test(`Invalid Login: ${user.description}`, async ({ page, pm }) => {
      await pm.loginPage.login(user.email, user.password);
      await expectLoginRejected(page, pm.loginPage);
    });
  }
});

test.describe('Login Page — Functional', () => {

  test('FUN-001: Valid login redirects to account page', async ({ page, pm }) => {
    await pm.loginPage.login(testData.validUser.email, testData.validUser.password);
    await expect(page).toHaveURL(/\/account/);
  });

  test('FUN-002: Invalid login is rejected', async ({ page, pm }) => {
    await pm.loginPage.login('wrong@test.com', 'wrongpassword');
    await expectLoginRejected(page, pm.loginPage);
  });

  test('FUN-003: Unregistered email is rejected', async ({ page, pm }) => {
    await pm.loginPage.login('nonexistent@test.com', 'anypassword');
    await expectLoginRejected(page, pm.loginPage);
  });

  test('FUN-004: Session persists after page reload', async ({ page, pm }) => {
    await pm.loginPage.login(testData.validUser.email, testData.validUser.password);
    await expect(page).toHaveURL(/\/account/);
    await page.reload();
    await expect(page).toHaveURL(/\/account/);
  });
});

test.describe('Login Page — Security (Data-Driven)', () => {

  for (const payload of testData.securityPayloads) {
    test(`Security: ${payload.description}`, async ({ page, pm }) => {
      await pm.loginPage.login(payload.email, payload.password);
      // Attack should NOT succeed — user should NOT be logged in
      await expect(page).not.toHaveURL(/\/account(?!\/login)/);
    });
  }
});
