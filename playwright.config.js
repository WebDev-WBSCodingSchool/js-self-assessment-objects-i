import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  retries: 0,
  reporter: [['html', { open: 'never' }], ['line']],
  use: {
    headless: true,
    trace: 'off',
    screenshot: 'off'
  }
});
