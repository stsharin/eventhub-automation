import {Page, Locator} from '@playwright/test';

export class RegisterPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly confirmPasswordInput: Locator;
    readonly createAccountButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.getByTestId('register-email');
        this.passwordInput = page.getByTestId('register-password');
        this.confirmPasswordInput = page.getByRole('textbox', { name: 'Repeat your password' });
        this.createAccountButton = page.getByTestId('register-btn');
    }

    async register(email: string, password: string, confirmPassword: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.confirmPasswordInput.fill(confirmPassword);
        await this.createAccountButton.click();
    }
}