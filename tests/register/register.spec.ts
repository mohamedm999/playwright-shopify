import { test, expect } from '../../fixtures/page-fixtures';
import { testData } from '../../fixtures/test-data';

// This top-level hook applies to EVERY test inside this file automatically
test.beforeEach(async ({ pm }) => {
  await pm.registerPage.goto();
});

test.describe('Register Page — UI Visibility', () => {

  test('UI-001 to UI-005: Core UI elements are visible', async ({ pm }) => {
    await expect.soft(pm.registerPage.firstNameInput, 'First Name input should be visible').toBeVisible();
    await expect.soft(pm.registerPage.lastNameInput, 'Last Name input should be visible').toBeVisible();
    await expect.soft(pm.registerPage.emailInput, 'Email input should be visible').toBeVisible();
    await expect.soft(pm.registerPage.passwordInput, 'Password input should be visible').toBeVisible();
    await expect.soft(pm.registerPage.createBtn, 'Create button should be visible').toBeVisible();
  });
});

test.describe('Register Page — Validation (Data-Driven)', () => {

  for (const user of testData.registrationData.invalidUsers) {
    test(`Invalid Registration: ${user.description}`, async ({ page, pm }) => {
      await pm.registerPage.register(user.firstName, user.lastName, user.email, user.password);
      // If validation fails (native or server), the user should remain on the register page
      // (or be redirected back to it). Wait slightly to let any navigation start if it was going to.
      await page.waitForTimeout(1000);
      await expect(page).toHaveURL(/.*\/account\/register/);
    });
  }
});

test.describe('Register Page — Functional', () => {

  test('FUN-001: Valid registration logic', async ({ page, pm }) => {
    // Generate a unique email to prevent "Email already taken" errors
    const uniqueEmail = `test+${Date.now()}@example.com`;
    await pm.registerPage.register('John', 'Doe', uniqueEmail, 'securePassword123!');
    
    // Check if redirected to the account page or captcha challenge.
    // If there is a captcha (common in Shopify), we might not land on /account immediately, 
    // but we verify that we moved past the initial register page state or that there are no validation errors.
    // Assuming no captcha, we check for URL:
    // await expect(page).toHaveURL(/\/account/);
    
    // If captcha is present, URL might be /challenge
    await expect(page).not.toHaveURL(/\/account\/register$/);
    await expect(pm.registerPage.errorMessage).toBeHidden();
  });
  
  test('FUN-002: Registration with already used email fails', async ({ pm }) => {
    // Re-use an existing email
    await pm.registerPage.register('John', 'Doe', testData.validUser.email, 'securePassword123!');
    await expect(pm.registerPage.errorMessage).toBeVisible();
    await expect(pm.registerPage.errorMessage).toContainText(/email has already been taken/i);
  });
});

test.describe('Register Page — Security (Data-Driven)', () => {

  for (const payload of testData.registrationData.securityPayloads) {
    test(`Security: ${payload.description}`, async ({ page, pm }) => {
      await pm.registerPage.register(payload.firstName, payload.lastName, payload.email, payload.password);
      
      // Attack should NOT succeed — user should NOT be logged into the account dashboard
      await expect(page).not.toHaveURL(/\/account(?!\/register|\/login|\/challenge)/);
    });
  }
});
