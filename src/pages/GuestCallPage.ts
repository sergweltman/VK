import { Page, expect } from '@playwright/test';

export class GuestCallPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://call.myteam.mail.ru/8448fdae17b64623b8d62de7022bdee9');
  }

  async acceptPermissions() {
    await this.page.context().grantPermissions(['camera', 'microphone']);
  }

  async enterGuestName(name: string) {
    await this.page.getByPlaceholder('Ваше имя').fill(name);
  }

  async joinCall() {
    await this.page.getByRole('button', { name: /присоединиться/i }).click();
  }

  async expectInCall() {
    await expect(this.page.getByText(/вы в конференции/i)).toBeVisible();
  }
}
