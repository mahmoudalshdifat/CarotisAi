import { mkdirSync } from 'node:fs';
import { test, expect } from '@playwright/test';

const BASE_URL = process.env.CAROTISAI_BASE_URL ?? 'http://127.0.0.1:5173';
const SCREENSHOT_DIR = 'evidence/tests/screenshots';
const DOWNLOAD_DIR = 'evidence/tests/downloads';
const SAMPLE_IMAGE = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9sX8nWQAAAAASUVORK5CYII=',
  'base64',
);

type RouteCheck = {
  name: string;
  path: string;
  signals: string[];
};

const ROUTES: RouteCheck[] = [
  {
    name: 'dashboard',
    path: '/',
    signals: ['Welcome to CarotisAi', 'View Demo'],
  },
  {
    name: 'analyze',
    path: '/analyze',
    signals: ['Upload Carotid Ultrasound Image', 'No API key configured'],
  },
  {
    name: 'history',
    path: '/history',
    signals: ['0 total analyses', 'No analyses yet. Upload your first image to get started.'],
  },
  {
    name: 'about',
    path: '/about',
    signals: ['About CarotisAi', 'Research Context'],
  },
  {
    name: 'settings',
    path: '/settings',
    signals: ['Google Gemini API Key', 'How to get a Gemini API key'],
  },
  {
    name: 'analyze-demo',
    path: '/analyze?demo=1',
    signals: ['Demo mode', 'Analysis Results'],
  },
];

function captureRuntimeErrors(page: Parameters<typeof test>[0]['page']) {
  const runtimeErrors: string[] = [];

  page.on('pageerror', error => {
    runtimeErrors.push(`pageerror: ${error.message}`);
  });

  page.on('console', message => {
    if (message.type() === 'error') {
      runtimeErrors.push(`console: ${message.text()}`);
    }
  });

  return runtimeErrors;
}

test.describe('CarotisAi browser smoke', () => {
  test.beforeAll(() => {
    mkdirSync(SCREENSHOT_DIR, { recursive: true });
    mkdirSync(DOWNLOAD_DIR, { recursive: true });
  });

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  });

  for (const route of ROUTES) {
    test(`renders ${route.name} without runtime errors`, async ({ page }) => {
      const runtimeErrors = captureRuntimeErrors(page);

      await page.goto(`${BASE_URL}${route.path}`, { waitUntil: 'domcontentloaded' });
      await page.waitForLoadState('networkidle');

      for (const signal of route.signals) {
        await expect(page.getByText(signal, { exact: false })).toBeVisible();
      }

      await expect(page.locator('main')).toBeVisible();
      await page.screenshot({
        path: `${SCREENSHOT_DIR}/${route.name}.png`,
        fullPage: true,
      });

      expect(runtimeErrors).toEqual([]);
    });
  }

  test('sidebar navigation reaches each main route', async ({ page }) => {
    const runtimeErrors = captureRuntimeErrors(page);

    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle');

    await page.getByRole('link', { name: 'Analyze' }).click();
    await expect(page).toHaveURL(/\/analyze$/);

    await page.getByRole('link', { name: 'History' }).click();
    await expect(page).toHaveURL(/\/history$/);

    await page.getByRole('link', { name: 'About' }).click();
    await expect(page).toHaveURL(/\/about$/);

    await page.getByRole('link', { name: 'Settings' }).click();
    await expect(page).toHaveURL(/\/settings$/);

    await page.getByRole('link', { name: 'Dashboard' }).click();
    await expect(page).toHaveURL(/\/$/);

    expect(runtimeErrors).toEqual([]);
  });

  test('analyze flow accepts an image and patient context', async ({ page }) => {
    const runtimeErrors = captureRuntimeErrors(page);

    await page.goto(`${BASE_URL}/analyze`, { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle');

    await page.locator('input[type="file"]').setInputFiles({
      name: 'carotid-ultrasound.png',
      mimeType: 'image/png',
      buffer: SAMPLE_IMAGE,
    });

    await expect(page.getByAltText('Carotid ultrasound preview')).toBeVisible();
  await expect(page.getByText('carotid-ultrasound.png').first()).toBeVisible();

    await page.getByRole('button', { name: /Patient Context \(optional\)/ }).click();
    await page.getByLabel('Age Group').selectOption('elderly');
    await page.getByLabel('Sex').selectOption('male');
    await page.getByLabel('Clinical Question').fill('Assessment of carotid stenosis prior to CEA');
    await page.getByRole('button', { name: 'smoking' }).click();

    await expect(page.getByRole('button', { name: /Patient Context \(optional\)/ })).toContainText('Configured');
    await expect(page.getByText('Patient context configured')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Analyse Image' })).toBeDisabled();

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/analyze-upload-context.png`,
      fullPage: true,
    });

    expect(runtimeErrors).toEqual([]);
  });

  test('language change persists after reload', async ({ page }) => {
    const runtimeErrors = captureRuntimeErrors(page);

    await page.goto(`${BASE_URL}/settings`, { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle');

    await page.getByRole('button', { name: /Deutsch/i }).click();
    await page.getByRole('link', { name: 'Dashboard' }).click();

    await expect(page.getByText('Willkommen bei CarotisAi')).toBeVisible();
    await expect(page.locator('html')).toHaveAttribute('lang', 'de');

    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle');

    await expect(page.getByText('Willkommen bei CarotisAi')).toBeVisible();
    await expect.poll(() => page.evaluate(() => localStorage.getItem('carotisai_language'))).toBe('de');

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/dashboard-german.png`,
      fullPage: true,
    });

    expect(runtimeErrors).toEqual([]);
  });

  test('demo results can be exported as a PDF', async ({ page }) => {
    const runtimeErrors = captureRuntimeErrors(page);

    await page.goto(`${BASE_URL}/analyze?demo=1`, { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle');

    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download Report (PDF)' }).click();
    const download = await downloadPromise;

    expect(download.suggestedFilename()).toMatch(/^CarotisAi_Report_[A-Za-z0-9-]+_\d{4}-\d{2}-\d{2}\.pdf$/);
    await download.saveAs(`${DOWNLOAD_DIR}/${download.suggestedFilename()}`);

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/analyze-demo-results.png`,
      fullPage: true,
    });

    expect(runtimeErrors).toEqual([]);
  });
});