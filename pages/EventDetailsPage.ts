import { Page, Locator } from '@playwright/test';
import { featuredEvent } from '../utils/testData';
export class EventDetailsPage {
  readonly page: Page;
  readonly eventName: Locator;
  readonly venue: Locator;
  readonly ticketPrice: Locator;
  constructor(page: Page) {
    this.page = page;
    this.eventName = page.getByText(featuredEvent.name, {exact: true});
    this.venue = page.getByText(featuredEvent.venue, {exact: true});
    this.ticketPrice = page.getByRole('paragraph').filter({ hasText: '$' });
  }
}
