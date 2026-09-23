import { test, expect } from '@playwright/test';

test.describe('Omairc website', () => {
  test('landing page keeps section navigation and links to the new pages', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Omairc/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/dead-simple IRC client/);

    const nav = page.getByRole('navigation', { name: 'Primary' });
    await nav.getByRole('link', { name: 'Features' }).click();
    await expect(page).toHaveURL(/#features$/);
    await expect(page.getByRole('heading', { name: /Everything you’d want/ })).toBeInViewport();

    await expect(nav.getByRole('link', { name: 'Feedback' })).toHaveAttribute('href', '#feedback');
    await expect(nav.getByRole('link', { name: 'Docs', exact: true })).toHaveAttribute('href', '/docs/');
    await expect(nav.getByRole('link', { name: 'Changelog' })).toHaveAttribute('href', '/changelog/');
    await expect(nav.getByRole('link', { name: 'Search documentation' })).toContainText('Search docs');
  });

  test('copy controls copy their adjacent commands', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/#install');
    const command = `curl -fsSL ${new URL(page.url()).origin}/install.sh | sh`;
    await expect(page.locator('code.install-command')).toHaveText(command);
    await page.locator('.install-card.primary').getByRole('button', { name: 'Copy' }).click();
    await expect(page.getByRole('status')).toHaveText('Copied to clipboard');
    await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toBe(command);
  });

  test('docs expose navigation and Pagefind search', async ({ page }) => {
    await page.goto('/docs/');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Omairc documentation');
    await expect(page.getByRole('link', { name: 'Install Omairc' }).first()).toBeVisible();
    const search = page.getByRole('button', { name: /Search/ }).first();
    await expect(search).toBeVisible();
    await search.click();
    await expect(page.getByRole('dialog')).toBeVisible();
  });

  test('reference docs and changelog render real content', async ({ page }) => {
    await page.goto('/docs/reference/cli/');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('CLI reference');
    await expect(page.getByText('omairc connections', { exact: true })).toBeVisible();
    await expect(page.getByText(/uncertain send is not safe to retry/i)).toBeVisible();

    await page.goto('/changelog/');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Changelog');
    await expect(page.locator('.release').first()).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Releases' })).toBeVisible();
    await expect(page.locator('#v1\\.0\\.0').getByRole('heading', { name: 'Added' })).toBeVisible();
    await expect(page.locator('#v0\\.2\\.0').getByRole('heading', { name: 'Highlights' })).toBeVisible();
  });

  test('mobile menu reaches docs', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    const nav = page.getByRole('navigation', { name: 'Primary' });
    await expect(nav.getByRole('link', { name: 'Docs', exact: true })).toBeHidden();
    await nav.getByRole('button', { name: 'Menu' }).click();
    await expect(nav.getByRole('link', { name: 'Docs', exact: true })).toBeVisible();
    await nav.getByRole('link', { name: 'Docs', exact: true }).click();
    await expect(page).toHaveURL(/\/docs\/$/);
  });
});
