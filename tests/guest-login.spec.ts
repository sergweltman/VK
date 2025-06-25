import { test, expect } from '@playwright/test';

const callUrl = 'https://call.myteam.mail.ru/8448fdae17b64623b8d62de7022bdee9';

test('Гость может ввести имя', async ({ page }) => {
  await page.goto(callUrl);

  const nameInput = page.locator('input[name="name"]');
  // Явное ожидание появления поля ввода имени
  await nameInput.waitFor({ state: 'visible', timeout: 10000 });
  
  await nameInput.fill('Тестовый Гость');
  await expect(nameInput).toHaveValue('Тестовый Гость');
});

test('Кнопка "Войти" активна после ввода имени', async ({ page }) => {
  await page.goto(callUrl);

  const nameInput = page.locator('input[name="name"]');
  await nameInput.waitFor({ state: 'visible', timeout: 10000 });
  await nameInput.fill('Гость');

  const joinButton = page.locator('button:has-text("Войти")');
  // Ждём, когда кнопка станет доступна
  await expect(joinButton).toBeEnabled({ timeout: 10000 });
});

test('При отсутствии доступа к камере/микрофону отображается предупреждение', async ({ page }) => {
  await page.goto(callUrl);

  // Отклоняем разрешения на камеру и микрофон
  await page.context().grantPermissions([], { origin: callUrl });

  // Предположим, что предупреждение появляется с определённым селектором
  const warning = page.locator('.warning-selector'); // <- Замени на реальный селектор предупреждения
  await warning.waitFor({ state: 'visible', timeout: 10000 });
  await expect(warning).toBeVisible();
});

test('Отображение на мобильном устройстве iPhone SE', async ({ browser }) => {
  const iPhone = { name: 'iPhone SE', viewport: { width: 375, height: 667 }, userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)...' };
  const context = await browser.newContext({
    ...iPhone,
    permissions: ['microphone', 'camera'],
  });
  const page = await context.newPage();
  await page.goto(callUrl);

  const nameInput = page.locator('input[name="name"]');
  await nameInput.waitFor({ state: 'visible', timeout: 10000 });
  await expect(nameInput).toBeVisible();
});

test('Отображение на мобильном устройстве Pixel 7', async ({ browser }) => {
  const iPhone = { name: 'Pixel 7 Pro', viewport: { width: 412, height: 915 }, userAgent: 'Chrome/137.0.7151.115 (Android 15; Pixel 7)' };
  const context = await browser.newContext({
    ...iPhone,
    permissions: ['microphone', 'camera'],
  });
  const page = await context.newPage();
  await page.goto(callUrl);

  const nameInput = page.locator('input[name="name"]');
  await nameInput.waitFor({ state: 'visible', timeout: 10000 });
  await expect(nameInput).toBeVisible();
});