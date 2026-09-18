import { Page, Locator } from '@playwright/test';

export class LoginPage {

  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signinButton: Locator;

  constructor(page: Page) {

    this.page = page;

    this.emailInput = page.getByLabel('Email');

    this.passwordInput = page.getByLabel('Password');

    this.signinButton = page.getByRole('button', {
      name: 'Sign In'
    });
  }

  async navigateToLoginPage() {
    await this.page.goto(
      'https://eventhub.rahulshettyacademy.com'
    );
  }

  async login(email: string, password: string) {

    await this.emailInput.fill(email);

    await this.passwordInput.fill(password);

    await this.signinButton.click();
  }
}
