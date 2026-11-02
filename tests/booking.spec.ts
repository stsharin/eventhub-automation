import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { EventsPage } from '../pages/EventsPage';
import { BookingPage } from '../pages/BookingPage';
import { NavBar } from '../pages/NavBar';
import { validUser } from '../utils/testData';
test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const eventsPage = new EventsPage(page);
    const navBar = new NavBar(page);
    await page.goto('/login');
    await loginPage.login(validUser.email, validUser.password);
    await expect(navBar.logoutButton).toBeVisible();
    await page.getByRole('link', { name: 'Browse Events →' }).click();
    await expect(page).toHaveURL(/events/);
    await eventsPage.clickBookNow();
});
test('User should book 1 ticket successfully', async ({ page }) => {
    const bookingPage = new BookingPage(page);
    await bookingPage.bookTicket('Sharin Test', validUser.email, '9876543210');
    await expect(bookingPage.bookingConfirmedMessage).toBeVisible();
    await expect(page.getByText('Your tickets are reserved.')).toBeVisible();
});
test('User should book 2 tickets successfully', async ({ page }) => {
    const bookingPage = new BookingPage(page);
    await bookingPage.increaseTickets();
    await expect(page.getByText('$300 × 2 tickets')).toBeVisible();
    await bookingPage.bookTicket('Sharin Test', validUser.email, '9876543210');
    await expect(bookingPage.bookingConfirmedMessage).toBeVisible();
});
test('User should see errors when booking form is empty', async ({ page }) => {
    const bookingPage = new BookingPage(page);
    await bookingPage.bookTicket('', '', '');
    await expect(page.getByText('Name must be at least 2 chars')).toBeVisible();
    await expect(page.getByText('Enter a valid email')).toBeVisible();
    await expect(page.getByText('Enter a valid 10-digit phone')).toBeVisible();
});
test('User should see error with invalid phone number', async ({ page }) => {
    const bookingPage = new BookingPage(page);
    await bookingPage.bookTicket('Sharin Test', validUser.email, '12345');
    await expect(page.getByText('Enter a valid 10-digit phone')).toBeVisible();
});
