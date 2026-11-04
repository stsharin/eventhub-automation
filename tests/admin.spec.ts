import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AdminEventsPage } from '../pages/AdminEventsPage';
import { NavBar } from '../pages/NavBar';
import { validUser } from '../utils/testData';
test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const navBar = new NavBar(page);
    await page.goto('/login');
    await loginPage.login(validUser.email, validUser.password);
    await expect(navBar.logoutButton).toBeVisible();
    await page.goto('/admin/events');
});
test('User should see errors when add event form is empty', async ({ page }) => {
    const adminEventsPage = new AdminEventsPage(page);
    await adminEventsPage.addEventButton.click();
    await expect(page.getByText('Title is required')).toBeVisible();
    await expect(page.getByText('City is required')).toBeVisible();
    await expect(page.getByText('Venue is required')).toBeVisible();
    await expect(page.getByText('Event date is required')).toBeVisible();
    await expect(page.getByText('Enter a valid price (≥ 0)')).toBeVisible();
    await expect(page.getByText('Must have at least 1 seat')).toBeVisible();
});
test('Featured events should be read-only', async ({ page }) => {
    await expect(page.getByRole('row', { name: /Dilli Diwali Mela/ })).toContainText('Read-only');
});
test('User should add, edit and delete an event', async ({ page }) => {
    const adminEventsPage = new AdminEventsPage(page);
    const title = 'QA Test Meetup ' + Date.now();

    await adminEventsPage.addEvent(title, 'Test event created by automation.', 'Workshop', 'Mumbai', 'Test Hall', '2027-12-15T18:00', '100', '50');
    await expect(page.getByRole('row', { name: title })).toContainText('$100');

    await page.goto('/events');
    await expect(page.getByText(title)).toBeVisible();

    await page.goto('/admin/events');
    await adminEventsPage.editPrice(title, '150');
    await expect(page.getByRole('row', { name: title })).toContainText('$150');

    await adminEventsPage.deleteEvent(title);
    await expect(page.getByRole('row', { name: title })).not.toBeVisible();
});
test('User should see error with past date', async ({ page }) => {
    const adminEventsPage = new AdminEventsPage(page);
    await adminEventsPage.addEvent('Past Date Event', 'Test', 'Workshop', 'Mumbai', 'Test Hall', '2025-01-10T18:00', '100', '50');
    await expect(page.getByText('Must be a future date')).toBeVisible();
});
test('User should see errors with negative price and 0 seats', async ({ page }) => {
    const adminEventsPage = new AdminEventsPage(page);
    await adminEventsPage.addEvent('Invalid Event', 'Test', 'Workshop', 'Mumbai', 'Test Hall', '2027-12-15T18:00', '-5', '0');
    await expect(page.getByText('Enter a valid price (≥ 0)')).toBeVisible();
    await expect(page.getByText('Must have at least 1 seat')).toBeVisible();
});
test('User should not save changes when edit is cancelled', async ({ page }) => {
    const adminEventsPage = new AdminEventsPage(page);
    const title = 'Cancel Edit Test ' + Date.now();

    await adminEventsPage.addEvent(title, 'Test', 'Workshop', 'Mumbai', 'Test Hall', '2027-12-15T18:00', '100', '50');
    await expect(page.getByRole('row', { name: title })).toContainText('$100');

    await adminEventsPage.editPriceAndCancel(title, '999');
    await expect(page.getByRole('row', { name: title })).toContainText('$100');

    await adminEventsPage.deleteEvent(title);
    await expect(page.getByRole('row', { name: title })).not.toBeVisible();
});
