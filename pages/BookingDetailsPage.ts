import {Page, Locator} from '@playwright/test';

export class BookingDetailsPage {
    readonly page: Page;
    readonly backToMyBookingsButton: Locator;
    readonly checkRefundButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.backToMyBookingsButton = page.getByRole('button', { name: '← Back to My Bookings' });
        this.checkRefundButton = page.getByTestId('check-refund-btn');
    }

    async checkRefund() {
        await this.checkRefundButton.click();
    }

    async goBackToMyBookings() {
        await this.backToMyBookingsButton.click();
    }
}
