export const testData = {
  // Valid credentials — read from environment, never hardcoded in source
  validUser: {
    email: process.env.SHOPIFY_EMAIL || 'test@example.com',
    password: process.env.SHOPIFY_PASSWORD || 'password123',
  },

  // Invalid credentials for negative testing
  invalidUsers: [
    { email: '', password: '', description: 'both fields empty' },
    { email: '', password: 'password123', description: 'empty email' },
    { email: 'test@example.com', password: '', description: 'empty password' },
    { email: 'wrong@test.com', password: 'wrongpassword', description: 'wrong credentials' },
    { email: 'notanemail', password: 'password123', description: 'invalid email format' },
    { email: 'user@', password: 'password123', description: 'missing domain' },
    { email: 'user@domain', password: 'password123', description: 'missing TLD' },
  ],

  // Security test payloads
  securityPayloads: [
    { email: "' OR 1=1 --", password: "' OR 1=1 --", description: 'SQL injection' },
    { email: '" OR ""="', password: '" OR ""="', description: 'SQL injection variant' },
    { email: '<script>alert(1)</script>', password: 'password123', description: 'XSS in email' },
    { email: 'test@test.com', password: '<script>alert(1)</script>', description: 'XSS in password' },
    { email: 'A'.repeat(10000) + '@test.com', password: 'P'.repeat(10000), description: 'long input values' },
    { email: '!@#$%^&*()_+-=[]{}|;:\'",./<>?', password: '!@#$%^&*()', description: 'special characters' },
    { email: 'test🔥@test.com', password: 'pass🔥word', description: 'unicode/emoji' },
  ],

  // Forgot password test data
  resetEmails: {
    valid: process.env.SHOPIFY_EMAIL || 'test@example.com',
    unregistered: 'nonexistent@example.com',
    empty: '',
    invalid: 'notanemail',
  },
} as const;