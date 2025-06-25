import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',  // Папка с тестами
  timeout: 30 * 1000,  // Таймаут для теста (30 секунд)
  retries: 1,          // Кол-во повторов при ошибках (можно 0)
  reporter: [
    ['list'],          // Стандартный вывод в консоль
    ['allure-playwright']  // Allure репортер
  ],
  use: {
    headless: true,    // Запуск браузера в фоне без GUI
    video: 'retain-on-failure',  // Записывать видео при падениях тестов
    screenshot: 'only-on-failure', // Делать скриншоты при ошибках
    permissions: ['microphone', 'camera'],  // Разрешения для тестов
    launchOptions: {
      args: ['--use-fake-ui-for-media-stream'], // Автоматически разрешать доступ к микрофону и камере
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'edge',
      use: { channel: 'msedge' }, 
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
});