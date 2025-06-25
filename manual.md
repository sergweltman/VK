// Запуск проекта локально
1. Установить зависимости:  
   npm install
2. Установить браузеры Playwright:  
   npx playwright install --with-deps
3. Выбрать репозиторий с проектом File/Open File
3. Запустить тесты:  
   npx playwright test
4. Сгенерировать отчёт Allure:  
   npx allure generate allure-results --clean -o allure-report
5. Открыть отчёт:  
   npx allure open allure-report

