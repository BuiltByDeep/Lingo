# Testing Setup for Lingo App

## Overview

Since MCP servers are having connection issues, we'll use Playwright directly in the project for browser automation testing.

## Setup Playwright

### 1. Install Playwright

```bash
cd lingo-app
npm install -D @playwright/test
npx playwright install chromium
```

### 2. Create Playwright Config

Create `playwright.config.js`:

```javascript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'http://localhost:5173',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  webServer: {
    command: 'npm run dev',
    port: 5173,
    reuseExistingServer: true,
  },
});
```

### 3. Create Test Directory

```bash
mkdir -p tests
```

## Example Tests

### Test 1: AI Language Buddy - Language Selection

Create `tests/ai-buddy-languages.spec.js`:

```javascript
import { test, expect } from '@playwright/test';

test.describe('AI Language Buddy - Language Selection', () => {
  test('should display 8 language options', async ({ page }) => {
    await page.goto('/');
    
    // Sign in (adjust selectors based on your app)
    await page.click('text=Sign In');
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');
    
    // Open AI Buddy
    await page.click('text=AI Language Buddy');
    
    // Check for 8 languages
    await expect(page.locator('text=Spanish')).toBeVisible();
    await expect(page.locator('text=French')).toBeVisible();
    await expect(page.locator('text=Japanese')).toBeVisible();
    await expect(page.locator('text=Korean')).toBeVisible();
    await expect(page.locator('text=German')).toBeVisible();
    await expect(page.locator('text=Italian')).toBeVisible();
    await expect(page.locator('text=Portuguese')).toBeVisible();
    await expect(page.locator('text=Chinese')).toBeVisible();
  });

  test('should select Korean and show Korean greeting', async ({ page }) => {
    await page.goto('/');
    // ... sign in steps ...
    
    // Open AI Buddy and select Korean
    await page.click('text=AI Language Buddy');
    await page.click('text=Korean');
    
    // Verify Korean greeting appears
    await expect(page.locator('text=안녕하세요')).toBeVisible();
    await expect(page.locator('text=📝')).toBeVisible();
  });
});
```

### Test 2: Mode Switching

Create `tests/ai-buddy-modes.spec.js`:

```javascript
import { test, expect } from '@playwright/test';

test.describe('AI Language Buddy - Mode Switching', () => {
  test('should switch between all 7 modes', async ({ page }) => {
    await page.goto('/');
    // ... sign in and open AI Buddy ...
    
    // Select a language
    await page.click('text=Korean');
    
    // Test each mode
    const modes = ['Learn', 'Chat', 'Translate', 'Grammar', 'Pronunciation', 'Practice', 'Vocab'];
    
    for (const mode of modes) {
      await page.click(`button:has-text("${mode}")`);
      await expect(page.locator(`button:has-text("${mode}")`)).toHaveCSS('font-weight', '700');
    }
  });
});
```

### Test 3: Simple Mode Toggle

Create `tests/ai-buddy-simple-mode.spec.js`:

```javascript
import { test, expect } from '@playwright/test';

test.describe('AI Language Buddy - Simple Mode', () => {
  test('should toggle Simple Mode', async ({ page }) => {
    await page.goto('/');
    // ... sign in and open AI Buddy ...
    
    // Select language
    await page.click('text=French');
    
    // Simple Mode should be ON by default
    const simpleModeButton = page.locator('button:has-text("👶")');
    await expect(simpleModeButton).toBeVisible();
    
    // Toggle OFF
    await simpleModeButton.click();
    await expect(simpleModeButton).toContainText('Normal');
    
    // Toggle ON
    await simpleModeButton.click();
    await expect(simpleModeButton).toContainText('Simple');
  });
});
```

### Test 4: Visual Regression

Create `tests/visual-regression.spec.js`:

```javascript
import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests', () => {
  test('should match language selection screen', async ({ page }) => {
    await page.goto('/');
    // ... sign in and open AI Buddy ...
    
    await expect(page).toHaveScreenshot('language-selection.png');
  });

  test('should match each mode interface', async ({ page }) => {
    await page.goto('/');
    // ... sign in, open AI Buddy, select Korean ...
    
    const modes = ['Learn', 'Chat', 'Translate', 'Grammar', 'Pronunciation', 'Practice', 'Vocab'];
    
    for (const mode of modes) {
      await page.click(`button:has-text("${mode}")`);
      await expect(page).toHaveScreenshot(`mode-${mode.toLowerCase()}.png`);
    }
  });
});
```

## Running Tests

### Run All Tests
```bash
npm run test
```

### Run Specific Test File
```bash
npx playwright test tests/ai-buddy-languages.spec.js
```

### Run in UI Mode (Interactive)
```bash
npx playwright test --ui
```

### Run with Browser Visible
```bash
npx playwright test --headed
```

### Generate Test Report
```bash
npx playwright show-report
```

## Add to package.json

Add these scripts to `lingo-app/package.json`:

```json
{
  "scripts": {
    "test": "playwright test",
    "test:ui": "playwright test --ui",
    "test:headed": "playwright test --headed",
    "test:report": "playwright show-report"
  }
}
```

## Testing Checklist

### AI Language Buddy Tests

- [ ] Language selection displays 8 options
- [ ] Each language shows correct greeting
- [ ] Korean responses use Korean (not Spanish)
- [ ] French responses use French (not Spanish)
- [ ] Japanese responses use Japanese (not Spanish)
- [ ] All responses include 📝 (English translation)
- [ ] Mode switching works correctly
- [ ] Simple Mode toggle changes behavior
- [ ] Voice input button appears
- [ ] All 7 modes render correctly

### Authentication Tests

- [ ] Sign-in modal opens
- [ ] Email/password login works
- [ ] Google sign-in button appears
- [ ] Sign-up modal opens
- [ ] Error messages display correctly

### Chat Room Tests

- [ ] Room list displays
- [ ] Can join a room
- [ ] Messages send successfully
- [ ] Real-time updates work
- [ ] Private messages work

## Debugging Tests

### View Test Traces
```bash
npx playwright show-trace trace.zip
```

### Debug Specific Test
```bash
npx playwright test --debug tests/ai-buddy-languages.spec.js
```

### Take Screenshots on Failure
Already configured in `playwright.config.js`

## CI/CD Integration

### GitHub Actions Example

Create `.github/workflows/playwright.yml`:

```yaml
name: Playwright Tests
on:
  push:
    branches: [ main, dev ]
  pull_request:
    branches: [ main, dev ]
jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: 18
    - name: Install dependencies
      run: cd lingo-app && npm ci
    - name: Install Playwright Browsers
      run: cd lingo-app && npx playwright install --with-deps chromium
    - name: Run Playwright tests
      run: cd lingo-app && npm run test
    - uses: actions/upload-artifact@v3
      if: always()
      with:
        name: playwright-report
        path: lingo-app/playwright-report/
        retention-days: 30
```

## Best Practices

1. **Use data-testid attributes** for reliable selectors
2. **Wait for elements** before interacting
3. **Take screenshots** on important steps
4. **Test in isolation** - each test should be independent
5. **Use fixtures** for common setup (sign-in, etc.)
6. **Test real user flows** - not just individual components

## Next Steps

1. Install Playwright: `npm install -D @playwright/test`
2. Create `playwright.config.js`
3. Create `tests/` directory
4. Write your first test
5. Run tests: `npm run test`

This approach is more reliable than MCP servers and gives you full control over your testing workflow.
