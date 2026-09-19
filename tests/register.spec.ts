import {test, expect} from '@playwright/test';
import {RegisterPage} from '../pages/RegisterPage';

test('User should register successfully', async ({page}) => {
    const registerPage = new RegisterPage(page);
    await page.goto('https://eventhub.rahulshettyacademy.com/register');
    await registerPage.register('sharintest@example.com', 'passworD123#', 'passworD123#');
});