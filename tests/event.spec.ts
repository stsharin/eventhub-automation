import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { EventPage } from '../pages/EventPage';

test.beforeEach(async ({ page }) => {

    const loginPage = new LoginPage(page);
    const eventPage = new EventPage(page);

    // Open application
    await page.goto('https://eventhub.rahulshettyacademy.com');

    // Login
    await loginPage.login(
        'sharin@gmail.com',
        'kkkkkkkkA1@'
    );

    await expect(page).toHaveURL(/login/);

    // Go to Events page
    await page.getByRole('link', {
        name: 'Browse Events →'
    }).click();

    await expect(page).toHaveURL(/events/);
});


test('User should see matching events', async ({ page }) => {

    const eventPage = new EventPage(page);

    await eventPage.searchEvent('music');

    await expect(
        page.getByText('Hollywood Monsoon Night — Los Angeles')
    ).toBeVisible();
});


test('User should see no events found', async ({ page }) => {

    const eventPage = new EventPage(page);

    await eventPage.searchEvent('xyz');

    await expect(
        page.getByText('No events found')
    ).toBeVisible();
});
