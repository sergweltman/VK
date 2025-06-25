import { test } from '@playwright/test';
import { GuestCallPage } from '../pages/GuestCallPage';

test.describe('Guest Join Call', () => {
  test('User can join the call as guest', async ({ page }) => {
    const call = new GuestCallPage(page);

    await call.goto();
    await call.acceptPermissions();
    await call.enterGuestName('QA Tester');
    await call.joinCall();

    await call.expectInCall();
  });
});
