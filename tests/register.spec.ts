import {test, expect} from '@playwright/test';
import {RegisterPage} from '../pages/RegisterPage';
import {NavBar} from '../pages/NavBar';
import {uniqueEmail} from '../utils/testData';

test('User should register successfully', async ({page}) => {
    const registerPage = new RegisterPage(page);
    const navBar = new NavBar(page);
    const email = uniqueEmail();
    await page.goto('/register');
    await registerPage.register(email, 'passworD123#', 'passworD123#');
    await expect(page).not.toHaveURL(/\/register/);
    await expect(navBar.logoutButton).toBeVisible();
    await expect(navBar.loggedInUser(email)).toBeVisible();
});
