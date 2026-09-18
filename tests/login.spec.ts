import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('User should login successfully', async ({ page }) => {

  const loginPage = new LoginPage(page);

  await loginPage.navigateToLoginPage();

  await loginPage.login(
    'sharin@gmail.com',
    'kkkkkkkkA1@'
  );

  await expect(page).toHaveURL(/login/);
});
