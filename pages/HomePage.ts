import {Page, Locator} from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly featuredEventsHeading: Locator;
    readonly browseEventsLink: Locator;
    readonly myBookingsLink: Locator;
    readonly viewAllLink: Locator;
    readonly exploreAllEventsLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.featuredEventsHeading = page.getByRole('heading', { name: 'Featured Events' });
        this.browseEventsLink = page.getByRole('link', { name: 'Browse Events →' });
        this.myBookingsLink = page.getByRole('main').getByRole('link', { name: 'My Bookings' });
        this.viewAllLink = page.getByRole('link', { name: 'View all →' });
        this.exploreAllEventsLink = page.getByRole('link', { name: 'Explore All Events' });
    }
}
