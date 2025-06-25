import { test, devices } from '@playwright/test';
import { GuestCallPage } from '../pages/GuestCallPage';

const viewports = [
  { name: 'Desktop 1280x720', width: 1280, height: 720 },
  { name: 'iPhone 12', device: devices['iPhone 12'] },
  { name: 'Pixel 5', device: devices['Pixel 5'] },
];

for (const config of viewports) {
  test.describe(config.name, () => {
    test.use(config.device ? { ...config.device } : { viewport: { width: config.width!, height: config.height! } });

    test(`Join call`, async ({ page }) => {
      const call = new GuestCallPage(page);
      await call.goto();
      await call.acceptPermissions();
      await call.enterGuestName('ViewportTester');
      await call.joinCall();
      await call.expectInCall();
    });
  });
}
