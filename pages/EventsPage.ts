import { Page, Locator } from '@playwright/test';
export class EventsPage {
    readonly page: Page;
    readonly searchBox: Locator;
    readonly categoryFilter: Locator;
    readonly citiesFilter: Locator;
    readonly clearFiltersButton: Locator;
    readonly bookNowButton: Locator;
    constructor(page: Page) {
        this.page = page;
        this.searchBox = page.getByRole('textbox', { name: 'Search events, venues…' });
        this.categoryFilter = page.getByRole('combobox').first();
        this.citiesFilter = page.getByRole('combobox').nth(1);
        this.clearFiltersButton = page.getByRole('button', { name: 'Clear filters' });
        this.bookNowButton = page.getByRole('article').filter({ hasText: 'FestivalFeaturedDilli Diwali' }).getByTestId('book-now-btn');
    }
    async searchEvent(eventName: string) {
        await this.searchBox.fill(eventName);
    }
    async filterByCategory(category: string) {
        await this.categoryFilter.selectOption(category);
    }
    async filterByCity(city: string) {
        await this.citiesFilter.selectOption(city);
    }
    async clearFilters() {
        await this.clearFiltersButton.click();
    }
    async clickBookNow() {
        await this.bookNowButton.click();
    }
}