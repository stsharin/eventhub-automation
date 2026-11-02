import {Page, Locator} from '@playwright/test';

export class BookingPage {
    readonly page: Page;
    readonly increaseTicketsButton: Locator;
    readonly decreaseTicketsButton: Locator;
    readonly fullNameInput: Locator;
    readonly emailInput: Locator;
    readonly phoneInput: Locator;
    readonly confirmBookingButton: Locator;
    readonly bookingConfirmedMessage: Locator;
    readonly bookingRef: Locator;
    readonly viewMyBookingsButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.increaseTicketsButton = page.getByRole('button', { name: '+', exact: true });
        this.decreaseTicketsButton = page.getByRole('button', { name: '−', exact: true });
        this.fullNameInput = page.getByRole('textbox', { name: 'Full Name' });
        this.emailInput = page.getByTestId('customer-email');
        this.phoneInput = page.getByRole('textbox', { name: 'Phone Number' });
        this.confirmBookingButton = page.getByRole('button', { name: 'Confirm Booking' });
        this.bookingConfirmedMessage = page.getByRole('heading', { name: 'Booking Confirmed!' });
        this.bookingRef = page.getByText(/^[A-Z]-[A-Z0-9]{6}$/);
        this.viewMyBookingsButton = page.getByRole('button', { name: 'View My Bookings' });
    }

    async increaseTickets() {
        await this.increaseTicketsButton.click();
    }

    async bookTicket(fullName: string, email: string, phone: string) {
        await this.fullNameInput.fill(fullName);
        await this.emailInput.fill(email);
        await this.phoneInput.fill(phone);
        await this.confirmBookingButton.click();
    }

    async goToMyBookings() {
        await this.viewMyBookingsButton.click();
    }
}
