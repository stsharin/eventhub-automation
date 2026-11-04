import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { EventsPage } from '../pages/EventsPage';
import { EventDetailsPage } from '../pages/EventDetailsPage';
import { NavBar } from '../pages/NavBar';
import { validUser, featuredEvent, otherEvents } from '../utils/testData';
test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const navBar = new NavBar(page);
    await page.goto('/login');
    await loginPage.login(validUser.email, validUser.password);
    await expect(navBar.logoutButton).toBeVisible();
    await page.getByRole('link', { name: 'Browse Events →' }).click();
    await expect(page).toHaveURL(/events/);
});
test('User should see matching events', async ({ page }) => {
    const eventsPage = new EventsPage(page);
    await eventsPage.searchEvent('music');
    await expect(page.getByText(otherEvents.concert)).toBeVisible();
});
test('User should see no events found', async ({ page }) => {
    const eventsPage = new EventsPage(page);
    await eventsPage.searchEvent('xyz');
    await expect(page.getByText('No events found')).toBeVisible();
});
test('User should filter events by category', async ({ page }) => {
    const eventsPage = new EventsPage(page);
    await eventsPage.filterByCategory('Conference');
    await expect(page.getByText(otherEvents.conference)).toBeVisible();
});
test('User should filter events by city', async ({ page }) => {
    const eventsPage = new EventsPage(page);
    await eventsPage.filterByCity(featuredEvent.city);
    await expect(page.getByText(featuredEvent.name)).toBeVisible();
});
test('Should show no events when the selected city has no matches', async ({ page }) => {
    const eventsPage = new EventsPage(page);
    await eventsPage.filterByCity('Pune');
    await expect(page.getByText('No events found')).toBeVisible();
});
test('User should filter events by category and city', async ({ page }) => {
    const eventsPage = new EventsPage(page);
    await eventsPage.filterByCategory(featuredEvent.category);
    await eventsPage.filterByCity(featuredEvent.city);
    await expect(page.getByText(featuredEvent.name)).toBeVisible();
});
test('User should clear filters', async ({ page }) => {
    const eventsPage = new EventsPage(page);
    await eventsPage.filterByCategory(featuredEvent.category);
    await eventsPage.filterByCity(featuredEvent.city);
    await eventsPage.clearFilters();
    await expect(page.getByRole('combobox').first().locator('option:checked')).toHaveText('All Categories');
    await expect(page.getByRole('combobox').nth(1).locator('option:checked')).toHaveText('All Cities');
});
test('User should see event details', async ({ page }) => {
    const eventsPage = new EventsPage(page);
    const eventDetailsPage = new EventDetailsPage(page);

    await eventsPage.clickBookNow();
    await expect(eventDetailsPage.eventName).toBeVisible();
    await expect(eventDetailsPage.venue).toBeVisible();
    await expect(eventDetailsPage.ticketPrice).toBeVisible();
});