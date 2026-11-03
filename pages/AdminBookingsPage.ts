import {Page, Locator} from '@playwright/test';

export class AdminBookingsPage {
    readonly page: Page;
    readonly statusFilter: Locator;
    readonly bookingDialog: Locator;
    readonly closeDialogButton: Locator;
    readonly keepBookingButton: Locator;
    readonly confirmCancelButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.statusFilter = page.getByRole('combobox');
        this.bookingDialog = page.getByRole('dialog');
        this.closeDialogButton = page.getByRole('button', { name: 'Close' });
        this.keepBookingButton = page.getByRole('dialog').getByRole('button', { name: 'Cancel', exact: true });
        this.confirmCancelButton = page.getByTestId('confirm-dialog-yes');
    }

    async viewBooking(bookingRef: string) {
        await this.page.getByRole('row', { name: bookingRef }).getByRole('button', { name: 'View' }).click();
    }

    async clickCancel(bookingRef: string) {
        await this.page.getByRole('row', { name: bookingRef }).getByRole('button', { name: 'Cancel', exact: true }).click();
    }

    async cancelBooking(bookingRef: string) {
        await this.clickCancel(bookingRef);
        await this.confirmCancelButton.click();
    }

    async filterByStatus(status: string) {
        await this.statusFilter.selectOption(status);
    }
}
