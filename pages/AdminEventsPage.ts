import {Page, Locator} from '@playwright/test';

export class AdminEventsPage {
    readonly page: Page;
    readonly titleInput: Locator;
    readonly descriptionInput: Locator;
    readonly categorySelect: Locator;
    readonly cityInput: Locator;
    readonly venueInput: Locator;
    readonly dateInput: Locator;
    readonly priceInput: Locator;
    readonly seatsInput: Locator;
    readonly addEventButton: Locator;
    readonly confirmDeleteButton: Locator;
    readonly cancelEditButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.titleInput = page.getByTestId('event-title-input');
        this.descriptionInput = page.getByPlaceholder('Describe the event…');
        this.categorySelect = page.getByLabel('Category');
        this.cityInput = page.getByLabel('City');
        this.venueInput = page.getByLabel('Venue');
        this.dateInput = page.getByLabel('Event Date & Time');
        this.priceInput = page.getByLabel('Price ($)');
        this.seatsInput = page.getByLabel('Total Seats');
        this.addEventButton = page.getByTestId('add-event-btn');
        this.confirmDeleteButton = page.getByTestId('confirm-dialog-yes');
        this.cancelEditButton = page.getByRole('button', { name: 'Cancel edit' });
    }

    async addEvent(title: string, description: string, category: string, city: string, venue: string, date: string, price: string, seats: string) {
        await this.titleInput.fill(title);
        await this.descriptionInput.fill(description);
        await this.categorySelect.selectOption(category);
        await this.cityInput.fill(city);
        await this.venueInput.fill(venue);
        await this.dateInput.fill(date);
        await this.priceInput.fill(price);
        await this.seatsInput.fill(seats);
        await this.addEventButton.click();
    }

    async editPrice(title: string, newPrice: string) {
        await this.page.getByRole('row', { name: title }).getByTestId('edit-event-btn').click();
        await this.priceInput.fill(newPrice);
        await this.addEventButton.click();
    }

    async editPriceAndCancel(title: string, newPrice: string) {
        await this.page.getByRole('row', { name: title }).getByTestId('edit-event-btn').click();
        await this.priceInput.fill(newPrice);
        await this.cancelEditButton.click();
    }

    async deleteEvent(title: string) {
        await this.page.getByRole('row', { name: title }).getByTestId('delete-event-btn').click();
        await this.confirmDeleteButton.click();
    }
}
