import { Page, Locator } from '@playwright/test';

export class EventPage {

    readonly page: Page;
    readonly searchBox: Locator;

    constructor(page: Page) {

        this.page = page;

        this.searchBox = page.getByRole('textbox', {
            name: 'Search events, venues…'
        });
    }

    async searchEvent(eventName: string) {

        await this.searchBox.fill(eventName);
    }
}