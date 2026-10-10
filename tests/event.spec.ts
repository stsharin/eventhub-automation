import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { EventsPage } from '../pages/EventsPage';
test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const eventsPage = new EventsPage(page);
    await page.goto('https://eventhub.rahulshettyacademy.com');
    await loginPage.login('sharin@gmail.com', 'kkkkkkkkA1@');
    await expect(page).toHaveURL(/login/);
    await page.getByRole('link', { name: 'Browse Events →' }).click();
    await expect(page).toHaveURL(/events/);
});
test('User should see matching events', async ({ page }) => {
    const eventsPage = new EventsPage(page);
    await eventsPage.searchEvent('music');
    await expect(page.getByText('Hollywood Monsoon Night — Los Angeles')).toBeVisible();
});
test('User should see no events found', async ({ page }) => {
    const eventsPage = new EventsPage(page);
    await eventsPage.searchEvent('xyz');
    await expect(page.getByText('No events found')).toBeVisible();
});
test('User should filter events by category', async ({ page }) => {
    const eventsPage = new EventsPage(page);
    await eventsPage.filterByCategory('Conference');
    await expect(page.getByText('World Tech Summit')).toBeVisible();
});
test('User should filter events by city', async ({ page }) => {
    const eventsPage = new EventsPage(page);
    await eventsPage.filterByCity('Delhi');
    await expect(page.getByText('Dilli Diwali Mela')).toBeVisible();
});
test('Should show no events when the selected city has no matches', async ({ page }) => {
    const eventsPage = new EventsPage(page);
    await eventsPage.filterByCity('Pune');
    await expect(page.getByText('No events found')).toBeVisible();
});
test('User should filter events by category and city', async ({ page }) => {
    const eventsPage = new EventsPage(page);
    await eventsPage.filterByCategory('Festival');
    await eventsPage.filterByCity('Delhi');
    await expect(page.getByText('Dilli Diwali Mela')).toBeVisible();
});
test('User should clear filters', async ({ page }) => {
    const eventsPage = new EventsPage(page);
    await eventsPage.filterByCategory('Festival');
    await eventsPage.filterByCity('Delhi');
    await eventsPage.clearFilters();
    await expect(page.getByRole('combobox').first().locator('option:checked')).toHaveText('All Categories');
    await expect(page.getByRole('combobox').nth(1).locator('option:checked')).toHaveText('All Cities');
});
test('User should click on Book Now button', async ({ page }) => {
    const eventsPage = new EventsPage(page);
    await eventsPage.clickBookNow();
    await expect (page.getByText('Dilli Diwali Mela')).toBeVisible();
    await expect (page).toHaveURL('https://eventhub.rahulshettyacademy.com/events/285');
    await expect (page.getByText('Pragati Maidan Exhibition Grounds')).toBeVisible();
    //await expect (page.getByText('$300', { exact: true })).toBeVisible();
});
