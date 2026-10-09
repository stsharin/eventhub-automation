import { Page, Locator } from '@playwright/test';

export class EventPage {

    readonly page: Page;
    readonly searchBox: Locator;
    readonly categoryFilter: Locator;

    constructor(page: Page) {

        this.page = page;

        this.searchBox = page.getByRole('textbox', { name: 'Search events, venues…' });
        this.categoryFilter = page.getByRole('combobox').first();
    }

    async searchEvent(eventName: string) {

        await this.searchBox.fill(eventName);
    }

    async filterByCategory(category: string) {
        await this.categoryFilter.selectOption(category);
    }
}