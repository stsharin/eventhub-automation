import {Page, Locator} from '@playwright/test';

export class MyBookingsPage {
    readonly page: Page;
    readonly bookingCards: Locator;
    readonly confirmCancelButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.bookingCards = page.getByTestId('booking-card');
        this.confirmCancelButton = page.getByTestId('confirm-dialog-yes');
    }

    async viewBookingDetails(bookingRef: string) {
        await this.bookingCards.filter({ hasText: bookingRef }).getByRole('button', { name: 'View Details' }).click();
    }

    async cancelBooking(bookingRef: string) {
        await this.bookingCards.filter({ hasText: bookingRef }).getByTestId('cancel-booking-btn').click();
        await this.confirmCancelButton.click();
    }
}
