import { Page, Locator } from '@playwright/test';
export class EventDetailsPage {
  readonly page: Page;
  readonly eventName: Locator;
  readonly venue: Locator;
  readonly ticketPrice: Locator;
  readonly confirmBookingButton: Locator;
  constructor(page: Page) {
    this.page = page;
    this.eventName = page.getByText('Dilli Diwali Mela', {exact: true});
    this.venue = page.getByText('Pragati Maidan Exhibition Grounds', {exact: true});
    this.ticketPrice = page.getByRole('paragraph').filter({ hasText: '$' });
    this.confirmBookingButton = page.getByRole('button', {name: 'Confirm Booking'});
  }
}
