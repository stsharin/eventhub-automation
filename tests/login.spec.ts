import {test, expect} from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';
import {NavBar} from '../pages/NavBar';
import {validUser} from '../utils/testData';

test('User should login successfully', async ({page}) => {
    const loginPage = new LoginPage(page);
    const navBar = new NavBar(page);
    await page.goto('/login');
    await loginPage.login(validUser.email, validUser.password);
    await expect(navBar.logoutButton).toBeVisible();
});
