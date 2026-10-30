import {Page, Locator} from '@playwright/test';

export class NavBar {
    readonly page: Page;
    readonly logoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.logoutButton = page.getByRole('button', { name: 'Logout' });
    }

    loggedInUser(email: string): Locator {
        return this.page.getByRole('navigation').getByText(email, { exact: true });
    }
}
