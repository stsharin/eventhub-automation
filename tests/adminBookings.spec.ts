import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { EventsPage } from '../pages/EventsPage';
import { BookingPage } from '../pages/BookingPage';
import { AdminBookingsPage } from '../pages/AdminBookingsPage';
import { NavBar } from '../pages/NavBar';
import { validUser, customer } from '../utils/testData';
test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const navBar = new NavBar(page);
    await page.goto('/login');
    await loginPage.login(validUser.email, validUser.password);
    await expect(navBar.logoutButton).toBeVisible();
});
test('User should view, keep and cancel a booking in Manage Bookings', async ({ page }) => {
    const eventsPage = new EventsPage(page);
    const bookingPage = new BookingPage(page);
    const adminBookingsPage = new AdminBookingsPage(page);

    await page.goto('/events');
    await eventsPage.clickBookNow();
    await bookingPage.bookTicket(customer.name, validUser.email, customer.phone);
    await expect(bookingPage.bookingConfirmedMessage).toBeVisible();
    const bookingRef = await bookingPage.bookingRef.innerText();

    await page.goto('/admin/bookings');
    await expect(page.getByRole('row', { name: bookingRef })).toContainText('confirmed');

    await adminBookingsPage.viewBooking(bookingRef);
    await expect(adminBookingsPage.bookingDialog).toContainText(bookingRef);
    await expect(adminBookingsPage.bookingDialog).toContainText(customer.name);
    await expect(adminBookingsPage.bookingDialog).toContainText(customer.phone);
    await adminBookingsPage.closeDialogButton.click();
    await expect(adminBookingsPage.bookingDialog).not.toBeVisible();

    await adminBookingsPage.clickCancel(bookingRef);
    await adminBookingsPage.keepBookingButton.click();
    await expect(page.getByRole('row', { name: bookingRef })).toContainText('confirmed');

    await adminBookingsPage.cancelBooking(bookingRef);
    await expect(page.getByRole('row', { name: bookingRef })).not.toBeVisible();
});
test('Cancelled booking should show in the Cancelled filter', async ({ page }) => {
    test.fail(true, 'Known bug BUG-005: cancelled bookings disappear instead of showing as cancelled');
    const eventsPage = new EventsPage(page);
    const bookingPage = new BookingPage(page);
    const adminBookingsPage = new AdminBookingsPage(page);

    await page.goto('/events');
    await eventsPage.clickBookNow();
    await bookingPage.bookTicket(customer.name, validUser.email, customer.phone);
    await expect(bookingPage.bookingConfirmedMessage).toBeVisible();
    const bookingRef = await bookingPage.bookingRef.innerText();

    await page.goto('/admin/bookings');
    await adminBookingsPage.cancelBooking(bookingRef);
    await adminBookingsPage.filterByStatus('Cancelled');
    await expect(page.getByRole('row', { name: bookingRef })).toBeVisible();
});
