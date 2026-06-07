# Playwright Shopify Automation Framework

A production-grade, scalable Playwright + TypeScript test automation framework designed for testing Shopify storefront flows (such as account registration and login).

## 🚀 Key Features

- **Advanced Page Object Model (POM)**: Leverages a `BasePage` class for common browser interactions and a `PageManager` for centralized page instantiation.
- **Custom Test Fixtures**: Built-in Playwright fixtures (like `pm` for PageManager) provide clean, low-boilerplate test orchestration.
- **Strict Separation of Concerns**: 
  - Locators and actions belong in `pages/`.
  - Assertions and logic belong in `tests/` or `utils/assertions.ts`.
  - Test data belongs in `fixtures/test-data.ts`.
- **Structured Logging**: Custom `Logger` utility captures timestamped, categorized execution logs for superior observability.
- **Environment Validation**: Fail-fast environment configuration through `config/env.ts` ensures tests never run with missing credentials or misconfigured URLs.
- **Data-Driven & Security Testing**: Built-in support for parameterized tests and common security/exploratory attack vectors (e.g., SQLi, XSS).

## 📁 Project Structure

```text
playwright-shopify/
├── config/              # Environment variables and validation (env.ts)
├── fixtures/            # Test data and custom Playwright fixtures
├── pages/               # Page Object Models (BasePage, LoginPage, PageManager)
├── tests/               # Test spec files organized by feature
├── utils/               # Helpers, loggers, and custom assertions
├── playwright.config.ts # Core Playwright configuration
└── README.md            # You are here
```

## 🛠️ Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Install Playwright Browsers**
   ```bash
   npx playwright install
   ```

3. **Configure Environment**
   Copy the example environment file and update it with your target Shopify store URL and valid test credentials.
   ```bash
   cp .env.example .env
   ```

## 🏃 Running Tests

The project includes several pre-configured npm scripts in `package.json`:

- **Run all tests (headless)**
  ```bash
  npm test
  ```

- **Run tests in UI/headed mode**
  ```bash
  npm run test:headed
  ```

- **Run tests in debug mode**
  ```bash
  npm run test:debug
  ```

- **View HTML Test Report**
  ```bash
  npm run test:report
  ```

- **Run tests on specific browsers**
  ```bash
  npm run test:chromium
  npm run test:firefox
  npm run test:webkit
  ```

## 📖 Comprehensive Engineering Guide

For an in-depth understanding of the architectural decisions, Git strategies, CI/CD setup, Prompt Engineering rules, and strict anti-patterns enforced in this framework, please read the **[Playwright Shopify Framework Guide](./playwright-shopify-framework-guide.md)** included in this repository.
