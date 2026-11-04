import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { NavBar } from '../pages/NavBar';
import { validUser } from '../utils/testData';
test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const navBar = new NavBar(page);
    await page.goto('/login');
    await loginPage.login(validUser.email, validUser.password);
    await expect(navBar.logoutButton).toBeVisible();
    await page.goto('/');
});
test('User should see featured events on home page', async ({ page }) => {
    const homePage = new HomePage(page);
    await expect(homePage.featuredEventsHeading).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Dilli Diwali Mela' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Hollywood Monsoon Night — Los Angeles' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'World Tech Summit' })).toBeVisible();
});
test('Browse Events link should open events page', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.browseEventsLink.click();
    await expect(page).toHaveURL(/events/);
});
test('My Bookings link should open my bookings page', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.myBookingsLink.click();
    await expect(page).toHaveURL(/bookings/);
});
test('View all link should open events page', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.viewAllLink.click();
    await expect(page).toHaveURL(/events/);
});
test('Explore All Events link should open events page', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.exploreAllEventsLink.click();
    await expect(page).toHaveURL(/events/);
});
