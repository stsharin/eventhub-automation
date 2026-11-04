import {Page, Locator} from '@playwright/test';

export class MyBookingsPage {
    readonly page: Page;
    readonly bookingCards: Locator;
    readonly confirmCancelButton: Locator;
    readonly keepBookingButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.bookingCards = page.getByTestId('booking-card');
        this.confirmCancelButton = page.getByTestId('confirm-dialog-yes');
        this.keepBookingButton = page.getByRole('dialog').getByRole('button', { name: 'Cancel', exact: true });
    }

    async viewBookingDetails(bookingRef: string) {
        await this.bookingCards.filter({ hasText: bookingRef }).getByRole('button', { name: 'View Details' }).click();
    }

    async clickCancel(bookingRef: string) {
        await this.bookingCards.filter({ hasText: bookingRef }).getByTestId('cancel-booking-btn').click();
    }

    async cancelBooking(bookingRef: string) {
        await this.clickCancel(bookingRef);
        await this.confirmCancelButton.click();
    }
}
