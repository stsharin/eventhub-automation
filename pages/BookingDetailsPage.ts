import {Page, Locator} from '@playwright/test';

export class BookingDetailsPage {
    readonly page: Page;
    readonly backToMyBookingsButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.backToMyBookingsButton = page.getByRole('button', { name: '← Back to My Bookings' });
    }

    async goBackToMyBookings() {
        await this.backToMyBookingsButton.click();
    }
}
