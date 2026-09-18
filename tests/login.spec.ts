import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('User should login successfully', async ({ page }) => {

  const loginPage = new LoginPage(page);

  await page.goto('https://eventhub.rahulshettyacademy.com');

  await loginPage.login(
    'sharin@gmail.com',
    'kkkkkkkkA1@'
  );

});
