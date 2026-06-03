export const env = {
  baseURL: process.env.BASE_URL ?? 'https://your-shop.myshopify.com',
  loginPath: process.env.LOGIN_PATH ?? '/account/login',
  forgotPasswordPath: process.env.FORGOT_PASSWORD_PATH ?? '/account/login#recover',
  ci: process.env.CI === 'true',
};
