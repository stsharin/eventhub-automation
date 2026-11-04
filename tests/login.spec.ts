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

test('User should see error with wrong password', async ({page}) => {
    const loginPage = new LoginPage(page);
    await page.goto('/login');
    await loginPage.login(validUser.email, 'wrongPass1!');
    await expect(page.getByText('Invalid email or password')).toBeVisible();
});

test('User should see error with unregistered email', async ({page}) => {
    const loginPage = new LoginPage(page);
    await page.goto('/login');
    await loginPage.login('notregistered12345@example.com', 'passworD123#');
    await expect(page.getByText('Invalid email or password')).toBeVisible();
});

test('User should see errors when fields are empty', async ({page}) => {
    const loginPage = new LoginPage(page);
    await page.goto('/login');
    await loginPage.login('', '');
    await expect(page.getByText('Enter a valid email')).toBeVisible();
    await expect(page.getByText('Password must be at least 6 characters')).toBeVisible();
});

test('User should logout successfully', async ({page}) => {
    const loginPage = new LoginPage(page);
    const navBar = new NavBar(page);
    await page.goto('/login');
    await loginPage.login(validUser.email, validUser.password);
    await expect(navBar.logoutButton).toBeVisible();
    await navBar.logout();
    await expect(page).toHaveURL(/login/);
    await expect(loginPage.signInButton).toBeVisible();
});

test('Logged out user should be redirected to login from My Bookings', async ({page}) => {
    await page.goto('/bookings');
    await expect(page).toHaveURL(/login/);
});

test('Logged out user should be redirected to login from Manage Events', async ({page}) => {
    await page.goto('/admin/events');
    await expect(page).toHaveURL(/login/);
});

test('Logged out user should be redirected to login from Manage Bookings', async ({page}) => {
    await page.goto('/admin/bookings');
    await expect(page).toHaveURL(/login/);
});
