import { test, expect } from '@playwright/test';

test.describe('Omairc landing page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('a visitor lands on the hero and can get to install', async ({ page }) => {
    await expect(page).toHaveTitle(/Omairc/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      /A dead-simple IRC client, for humans and their agents/,
    );
    await expect(page.getByText(/You chat in it\. Your agent scripts it over a socket/)).toBeVisible();

    await page.getByRole('link', { name: 'Get Omairc' }).click();

    await expect(page).toHaveURL(/#install$/);
    await expect(page.getByRole('heading', { name: 'Get it running' })).toBeInViewport();
    await expect(page.getByText('git clone https://github.com/fredimachado/omairc.git')).toBeVisible();
    await expect(page.getByText('sudo pacman -U omairc-*.pkg.tar.zst')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Worth knowing before you switch' })).toHaveCount(0);
  });

  test('a visitor jumps between sections from the nav', async ({ page }) => {
    const nav = page.getByRole('navigation');

    await nav.getByRole('link', { name: 'Agents' }).click();
    await expect(page).toHaveURL(/#agents$/);
    await expect(page.getByRole('heading', { name: 'One window, one socket, no second client' })).toBeInViewport();
    await expect(page.getByText('omairc read \'#omarchy\' --since 5m')).toBeVisible();

    await nav.getByRole('link', { name: 'Features' }).click();
    await expect(page).toHaveURL(/#features$/);
    await expect(page.getByRole('heading', { name: 'Everything you\'d want from an IRC client' })).toBeInViewport();
    await expect(page.getByRole('heading', { name: /Keyboard first/ })).toBeVisible();

    await nav.getByRole('link', { name: 'Install' }).click();
    await expect(page).toHaveURL(/#install$/);
    await expect(page.getByRole('heading', { name: 'From source' })).toBeInViewport();

    await nav.getByRole('link', { name: 'omairc' }).click();
    await expect(page).toHaveURL(/#top$/);
    await expect(page.getByRole('heading', { level: 1 })).toBeInViewport();
    await expect(nav.getByRole('link', { name: 'omairc' }).locator('img')).toHaveAttribute('src', 'omairc.svg');
  });

  test('a visitor sees a recording of Omairc in the hero', async ({ page }) => {
    const shot = page.getByRole('img', { name: 'Omairc' });
    await expect(shot).toBeVisible();
    await expect(shot).toHaveAttribute(
      'src',
      'https://raw.githubusercontent.com/fredimachado/omairc/master/omairc.gif',
    );
    await expect.poll(async () => shot.evaluate((el) => el.complete && el.naturalWidth > 0)).toBe(true);
  });

  test('a visitor opens source and issue links in a new tab', async ({ page }) => {
    const navGitHub = page.getByRole('navigation').getByRole('link', { name: 'GitHub' });
    await expect(navGitHub).toHaveAttribute('href', 'https://github.com/fredimachado/omairc');
    await expect(navGitHub).toHaveAttribute('target', '_blank');

    const popupPromise = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'View source' }).click();
    const popup = await popupPromise;
    await expect(popup).toHaveURL(/github\.com\/fredimachado\/omairc/);
    await popup.close();

    const footer = page.getByRole('contentinfo');
    await expect(footer.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
      'href',
      'https://github.com/fredimachado/omairc',
    );
    await expect(footer.getByRole('link', { name: 'Issues' })).toHaveAttribute(
      'href',
      'https://github.com/fredimachado/omairc/issues',
    );
    await expect(footer.getByRole('link', { name: 'Omarchy' })).toHaveAttribute(
      'href',
      'https://omarchy.org',
    );
  });

  test('a keyboard visitor can activate Get Omairc with Enter', async ({ page }) => {
    const getOmairc = page.getByRole('link', { name: 'Get Omairc' });
    await getOmairc.focus();
    await expect(getOmairc).toBeFocused();

    await page.keyboard.press('Enter');

    await expect(page).toHaveURL(/#install$/);
    await expect(page.getByRole('heading', { name: 'Get it running' })).toBeInViewport();
  });

  test('a phone visitor still reaches install without the desktop chrome', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.reload();

    await expect(page.getByRole('navigation').getByRole('link', { name: 'Agents' })).toBeHidden();
    await expect(page.getByRole('img', { name: 'Omairc' })).toBeVisible();

    await page.getByRole('link', { name: 'Get Omairc' }).click();
    await expect(page.getByRole('heading', { name: 'Get it running' })).toBeInViewport();
    await expect(page.getByRole('heading', { name: 'From a release package' })).toBeVisible();
  });
});
