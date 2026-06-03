# Playwright Shopify

Playwright test automation scaffold for Shopify storefront account flows.

## Structure

- `tests/` contains Playwright specs grouped by feature.
- `pages/` contains Page Object Model classes.
- `fixtures/` contains test data separated from test logic.
- `utils/` contains reusable helpers.
- `config/` contains environment configuration.
- `.github/workflows/` contains the CI pipeline.

## Setup

```bash
npm install
npx playwright install
cp .env.example .env
```

Update `.env` with the target Shopify store URL and test credentials.

## Run Tests

```bash
npm test
```

Run headed mode:

```bash
npm run test:headed
```

Open the HTML report:

```bash
npm run report
```
