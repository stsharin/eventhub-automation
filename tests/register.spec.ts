import {test, expect} from '@playwright/test';
import {RegisterPage} from '../pages/RegisterPage';
import {NavBar} from '../pages/NavBar';

test('User should register successfully', async ({page}) => {
    const registerPage = new RegisterPage(page);
    const navBar = new NavBar(page);
    const email = 'test' + Date.now() + '@example.com';
    await page.goto('/register');
    await registerPage.register(email, 'passworD123#', 'passworD123#');
    await expect(navBar.logoutButton).toBeVisible();
});
