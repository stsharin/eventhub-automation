import { Page, Locator } from '@playwright/test';

export class EventPage {

  readonly page: Page;
  readonly browseEventsLink: Locator;
  readonly searchEventsInput: Locator;
  readonly noEventsFoundText: Locator;
  readonly hollywoodMonsoonEvent: Locator;

  constructor(page: Page) {

    this.page = page;

    this.browseEventsLink = page.getByRole('link', {
      name: 'Browse Events →'
    });

    this.searchEventsInput = page.getByRole('textbox', {
      name: 'Search events, venues…'
    });

    this.noEventsFoundText = page.getByText(
      'No events found'
    );

    this.hollywoodMonsoonEvent = page.getByText(
      'Hollywood Monsoon Night — Los Angeles'
    );
  }

  async clickBrowseEvents() {
    await this.browseEventsLink.click();
  }

  async searchEvent(eventName: string) {
    await this.searchEventsInput.fill(eventName);
  }
}
