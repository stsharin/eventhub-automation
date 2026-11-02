import {test, expect} from '@playwright/test';
import {RegisterPage} from '../pages/RegisterPage';
import {NavBar} from '../pages/NavBar';
import {validUser} from '../utils/testData';

test('User should register successfully', async ({page}) => {
    const registerPage = new RegisterPage(page);
    const navBar = new NavBar(page);
    const email = 'test' + Date.now() + '@example.com';
    await page.goto('/register');
    await registerPage.register(email, 'passworD123#', 'passworD123#');
    await expect(navBar.logoutButton).toBeVisible();
});

test('User should see error with invalid email', async ({page}) => {
    const registerPage = new RegisterPage(page);
    await page.goto('/register');
    await registerPage.register('abc', 'passworD123#', 'passworD123#');
    await expect(page.getByText('Enter a valid email')).toBeVisible();
});

test('User should see error with weak password', async ({page}) => {
    const registerPage = new RegisterPage(page);
    await page.goto('/register');
    await registerPage.register('test@example.com', 'abc123', 'abc123');
    await expect(page.getByText('Password does not meet the requirements below')).toBeVisible();
});

test('User should see error when passwords do not match', async ({page}) => {
    const registerPage = new RegisterPage(page);
    await page.goto('/register');
    await registerPage.register('test@example.com', 'passworD123#', 'passworD456#');
    await expect(page.getByText('Passwords do not match')).toBeVisible();
});

test('User should see error when email is already registered', async ({page}) => {
    const registerPage = new RegisterPage(page);
    await page.goto('/register');
    await registerPage.register(validUser.email, 'passworD123#', 'passworD123#');
    await expect(page.getByText('Email already registered')).toBeVisible();
});
