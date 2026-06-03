export const users = {
  valid: {
    email: process.env.TEST_USER_EMAIL ?? 'customer@example.com',
    password: process.env.TEST_USER_PASSWORD ?? 'Password123!',
  },
  invalid: {
    email: 'invalid@example.com',
    password: 'wrong-password',
  },
};

export const loginMessages = {
  invalidCredentials: /incorrect|invalid|wrong/i,
};

export const forgotPasswordMessages = {
  requestSubmitted: /email|reset|sent|instructions/i,
};

export const securityPayloads = [
  { name: 'sql-injection', value: "' OR '1'='1" },
  { name: 'script-tag', value: '<script>alert("xss")</script>' },
  { name: 'template-injection', value: '{{7*7}}' },
];
