import { test as base } from '@playwright/test';
import { PageManager } from '../pages/PageManager';

// Extend base test by providing the "pm" (Page Manager) fixture.
export const test = base.extend<{ pm: PageManager }>({
  pm: async ({ page }, use) => {
    await use(new PageManager(page));
  },
});

export { expect } from '@playwright/test';
