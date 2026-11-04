# EventHub Automation — Playwright + TypeScript

End-to-end UI test automation for the **EventHub** QA practice application, built with **Playwright** and **TypeScript** using the **Page Object Model**.

**Application Under Test:** [EventHub](https://eventhub.rahulshettyacademy.com/)

![Playwright](https://img.shields.io/badge/Playwright-1.63-2EAD33?logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Status](https://img.shields.io/badge/status-in%20development-orange)

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Test Coverage](#test-coverage)
- [Bugs Found](#bugs-found)
- [Project Structure](#project-structure)
- [Page Objects](#page-objects)
- [Getting Started](#getting-started)
- [Running Tests](#running-tests)
- [Test Reports](#test-reports)
- [Configuration](#configuration)
- [Roadmap](#roadmap)
- [Author](#author)

---

## Tech Stack

| Tool | Purpose |
| --- | --- |
| [Playwright Test](https://playwright.dev/) | End-to-end UI automation and test runner |
| TypeScript | Test and page object code |
| Node.js / npm | Runtime and dependency management |
| Git & GitHub | Version control |

---

## Test Coverage

**43 test cases** across 7 spec files, each executed on **Chromium, Firefox and WebKit** (129 runs in total).

### Summary

| Feature | Spec file | Tests | Status |
| --- | --- | :---: | --- |
| User Registration | `register.spec.ts` | 5 | ✅ Automated |
| User Login | `login.spec.ts` | 4 | ✅ Automated |
| Logout & Protected Pages | `login.spec.ts` | 4 | ✅ Automated |
| Home Page | `home.spec.ts` | 5 | ✅ Automated |
| Event Search | `event.spec.ts` | 2 | ✅ Automated |
| Event Filtering | `event.spec.ts` | 4 | ✅ Automated |
| Clear Filters | `event.spec.ts` | 1 | ✅ Automated |
| Event Details | `event.spec.ts` | 1 | ✅ Automated |
| Event Booking | `booking.spec.ts` | 4 | ✅ Automated |
| Ticket Limits | `booking.spec.ts` | 1 | ✅ Automated |
| My Bookings (view details, go back, cancel, keep booking) | `booking.spec.ts` | 2 | ✅ Automated |
| Refund Eligibility | `booking.spec.ts` | 2 | ✅ Automated |
| Admin – Manage Events (add, edit, delete, validation, cancel edit) | `admin.spec.ts` | 6 | ✅ Automated |
| Admin – Manage Bookings (view, cancel, status filter) | `adminBookings.spec.ts` | 2 | ✅ Automated |
| API Testing | — | — | 🔄 Planned |
| CI/CD | — | — | 🔄 Planned |

### Test Cases

#### Registration — `tests/register.spec.ts`

| # | Test case | Steps |
| --- | --- | --- |
| 1 | User should register successfully | Open `/register`, register with a **unique email** generated per run, then verify the **Logout** button is visible |
| 2 | User should see error with invalid email | Register with email `abc`, then verify *Enter a valid email* is shown |
| 3 | User should see error with weak password | Register with password `abc123`, then verify *Password does not meet the requirements below* is shown |
| 4 | User should see error when passwords do not match | Register with different password and confirm password, then verify *Passwords do not match* is shown |
| 5 | User should see error when email is already registered | Register with the email from `.env`, then verify *Email already registered* is shown |

#### Login — `tests/login.spec.ts`

| # | Test case | Steps |
| --- | --- | --- |
| 6 | User should login successfully | Open `/login`, sign in with credentials from `.env`, then verify the **Logout** button is visible |
| 7 | User should see error with wrong password | Sign in with a wrong password, then verify *Invalid email or password* is shown |
| 8 | User should see error with unregistered email | Sign in with an email that has no account, then verify *Invalid email or password* is shown |
| 9 | User should see errors when fields are empty | Click **Sign In** with empty fields, then verify *Enter a valid email* and *Password must be at least 6 characters* are shown |
| 10 | User should logout successfully | Sign in, click **Logout**, then verify the URL contains `/login` and the **Sign In** button is visible |
| 11 | Logged out user should be redirected to login from My Bookings | Open `/bookings` without signing in, then verify the URL contains `/login` |
| 12 | Logged out user should be redirected to login from Manage Events | Open `/admin/events` without signing in, then verify the URL contains `/login` |
| 13 | Logged out user should be redirected to login from Manage Bookings | Open `/admin/bookings` without signing in, then verify the URL contains `/login` |

#### Home — `tests/home.spec.ts`

Every test in this file starts from a shared `beforeEach` hook: log in → verify the **Logout** button is visible → open the home page `/`.

| # | Test case | Type | What it verifies |
| --- | --- | --- | --- |
| 14 | User should see featured events on home page | Positive | The *Featured Events* heading and the *Dilli Diwali Mela*, *Hollywood Monsoon Night — Los Angeles* and *World Tech Summit* cards are visible |
| 15 | Browse Events link should open events page | Positive | **Browse Events →** opens `/events` |
| 16 | My Bookings link should open my bookings page | Positive | **My Bookings** opens `/bookings` |
| 17 | View all link should open events page | Positive | **View all →** opens `/events` |
| 18 | Explore All Events link should open events page | Positive | **Explore All Events** opens `/events` |

#### Events — `tests/event.spec.ts`

Every test in this file starts from a shared `beforeEach` hook: log in → verify the **Logout** button is visible → click **Browse Events →** → verify the URL contains `/events`.

| # | Test case | Type | What it verifies |
| --- | --- | --- | --- |
| 19 | User should see matching events | Positive | Searching `music` shows *Hollywood Monsoon Night — Los Angeles* |
| 20 | User should see no events found | Negative | Searching `xyz` shows *No events found* |
| 21 | User should filter events by category | Positive | Category `Conference` shows *World Tech Summit* |
| 22 | User should filter events by city | Positive | City `Delhi` shows *Dilli Diwali Mela* |
| 23 | Should show no events when the selected city has no matches | Negative | City `Pune` shows *No events found* |
| 24 | User should filter events by category and city | Positive | `Festival` + `Delhi` together show *Dilli Diwali Mela* |
| 25 | User should clear filters | Positive | After **Clear filters**, dropdowns reset to *All Categories* and *All Cities* |
| 26 | User should see event details | Positive | **Book Now** on *Dilli Diwali Mela* opens its details page showing the event name, venue (*Pragati Maidan Exhibition Grounds*) and ticket price |

#### Booking — `tests/booking.spec.ts`

Every test in this file starts from a shared `beforeEach` hook: log in → verify the **Logout** button is visible → click **Browse Events →** → click **Book Now** on *Dilli Diwali Mela*.

| # | Test case | Type | What it verifies |
| --- | --- | --- | --- |
| 27 | User should book 1 ticket successfully | Positive | Booking with valid name, email and phone shows *Booking Confirmed!* and *Your tickets are reserved.* |
| 28 | User should book 2 tickets successfully | Positive | Clicking **+** shows *$300 × 2 tickets*, then the booking shows *Booking Confirmed!* |
| 29 | User should see errors when booking form is empty | Negative | **Confirm Booking** with empty fields shows *Name must be at least 2 chars*, *Enter a valid email* and *Enter a valid 10-digit phone* |
| 30 | User should see error with invalid phone number | Negative | Phone `12345` shows *Enter a valid 10-digit phone* |
| 31 | User should book, view details, go back and cancel booking | End-to-end | Books a ticket and saves the booking reference → **View My Bookings** shows the booking → **View Details** shows the customer name and phone → **← Back to My Bookings** returns to `/bookings` → **Cancel Booking** + **Yes, cancel it** removes the booking |
| 32 | Ticket count should stay between 1 and 10 | Positive | **−** is disabled at 1 ticket; after clicking **+** 9 times the summary shows *$300 × 10 tickets* and **+** is disabled |
| 33 | User should keep booking when cancel is dismissed | Positive | On My Bookings, **Cancel Booking** + dialog **Cancel** keeps the booking, then the test cancels it |
| 34 | Single ticket booking should be eligible for refund | Positive | On the booking details page, **Check eligibility for refund?** shows *Eligible for refund. Single-ticket bookings qualify for a full refund.* |
| 35 | Group booking should not be eligible for refund | Positive | A 2-ticket booking shows *Not eligible for refund. Group bookings (2 tickets) are non-refundable.* |

> The booking tests create real bookings on the test account (the end-to-end, keep booking and refund tests cancel their own booking). Use **Clear all bookings** on the My Bookings page now and then to keep the test data clean.

#### Admin – Manage Events — `tests/admin.spec.ts`

Every test in this file starts from a shared `beforeEach` hook: log in → verify the **Logout** button is visible → open `/admin/events`.

| # | Test case | Type | What it verifies |
| --- | --- | --- | --- |
| 36 | User should see errors when add event form is empty | Negative | **+ Add Event** with empty fields shows *Title is required*, *City is required*, *Venue is required*, *Event date is required*, *Enter a valid price (≥ 0)* and *Must have at least 1 seat* |
| 37 | Featured events should be read-only | Positive | The *Dilli Diwali Mela* row shows *Read-only* instead of Edit and Delete buttons |
| 38 | User should add, edit and delete an event | End-to-end | Adds an event with a unique title and checks the price *$100* in the table → the event shows on the Events page → **Edit** the price to *$150* and checks the table → **Delete** + **Delete event** removes it |
| 39 | User should see error with past date | Negative | An event dated `2025-01-10` shows *Must be a future date* |
| 40 | User should see errors with negative price and 0 seats | Negative | Price `-5` and seats `0` show *Enter a valid price (≥ 0)* and *Must have at least 1 seat* |
| 41 | User should not save changes when edit is cancelled | Positive | Adds an event at *$100* → **Edit** the price to *999* → **Cancel edit** keeps *$100* → deletes the event |

> The add/edit/delete and cancel edit tests delete their own event. Each user can add up to 6 events — when the limit is reached, the oldest event is replaced automatically.

#### Admin – Manage Bookings — `tests/adminBookings.spec.ts`

Every test in this file starts from a shared `beforeEach` hook: log in → verify the **Logout** button is visible. Each test then books 1 ticket for *Dilli Diwali Mela* and opens `/admin/bookings`.

| # | Test case | Type | What it verifies |
| --- | --- | --- | --- |
| 42 | User should view, keep and cancel a booking in Manage Bookings | End-to-end | The new booking shows as *confirmed* → **View** opens a dialog with the booking reference, customer name and phone → **Close** closes it → **Cancel** + dialog **Cancel** keeps the booking *confirmed* → **Cancel** + **Yes, cancel it** removes it |
| 43 | Cancelled booking should show in the Cancelled filter | Known bug | Marked with `test.fail()` for **BUG-005** — after cancelling, the booking should appear under the *Cancelled* filter, but it disappears. If the bug is fixed, this test will be reported so it can be updated |

---

## Bugs Found

Exploratory testing alongside the automation surfaced the following defects. Each one was reproduced on the live site and written up with steps to reproduce, expected and actual results, and a marked screenshot in **[docs/BUG_REPORTS.md](docs/BUG_REPORTS.md)**.

| ID | Bug | Severity | Priority |
| --- | --- | --- | --- |
| BUG-001 | Past events are listed under "Upcoming Events" | Medium | Medium |
| BUG-002 | Hollywood Monsoon Night has mixed-up location and can't be found with the City filter | Medium | Medium |
| BUG-003 | Booking form accepts phone numbers longer than 10 digits | Medium | Medium |
| BUG-004 | Available seats don't update after booking | Low | Low |
| BUG-005 | Cancelled bookings disappear instead of showing in the "Cancelled" filter | Medium | Medium |

New bugs can be logged with the repository's GitHub **Bug report** issue template.

---

## Project Structure

```text
eventhub-automation/
├── .github/
│   └── ISSUE_TEMPLATE/
│       └── bug_report.md      # GitHub issue template for bug reports
├── docs/
│   ├── BUG_REPORTS.md         # Documented defects with evidence
│   └── screenshots/           # Screenshots referenced by the bug reports
├── pages/                     # Page Object Model classes
│   ├── RegisterPage.ts
│   ├── LoginPage.ts
│   ├── NavBar.ts
│   ├── HomePage.ts
│   ├── EventsPage.ts
│   ├── EventDetailsPage.ts
│   ├── BookingPage.ts
│   ├── MyBookingsPage.ts
│   ├── BookingDetailsPage.ts
│   ├── AdminEventsPage.ts
│   └── AdminBookingsPage.ts
├── tests/                     # Test specs
│   ├── register.spec.ts
│   ├── login.spec.ts
│   ├── home.spec.ts
│   ├── event.spec.ts
│   ├── booking.spec.ts
│   ├── admin.spec.ts
│   └── adminBookings.spec.ts
├── utils/
│   └── testData.ts            # Credentials from .env and shared test data
├── .env.example               # Template for local credentials (.env is git-ignored)
├── playwright.config.ts       # Browsers, base URL, reporter, screenshots, traces
├── tsconfig.json
├── package.json
└── README.md
```

---

## Page Objects

Locators and user actions live in page classes under `pages/`, so tests read as user steps and a UI change only needs fixing in one place.

| Page object | Locators | Actions |
| --- | --- | --- |
| `RegisterPage` | email, password, confirm password, Create Account button | `register(email, password, confirmPassword)` |
| `LoginPage` | email, password, Sign In button | `login(email, password)` |
| `NavBar` | Logout button | `logout()` |
| `HomePage` | Featured Events heading, Browse Events →, My Bookings, View all →, Explore All Events links | — |
| `EventsPage` | search box, category filter, city filter, Clear filters button, Book Now button | `searchEvent()`, `filterByCategory()`, `filterByCity()`, `clearFilters()`, `clickBookNow()` |
| `EventDetailsPage` | event name, venue, ticket price | — |
| `BookingPage` | + / − ticket buttons, full name, email, phone, Confirm Booking button, *Booking Confirmed!* message, booking reference, View My Bookings button | `increaseTickets()`, `bookTicket(fullName, email, phone)`, `goToMyBookings()` |
| `MyBookingsPage` | booking cards, *Yes, cancel it* button, dialog Cancel button | `viewBookingDetails(bookingRef)`, `clickCancel(bookingRef)`, `cancelBooking(bookingRef)` |
| `BookingDetailsPage` | ← Back to My Bookings button, Check eligibility for refund button | `goBackToMyBookings()`, `checkRefund()` |
| `AdminEventsPage` | title, description, category, city, venue, event date & time, price, total seats, + Add Event button, Cancel edit button, Delete event confirm button | `addEvent(title, description, category, city, venue, date, price, seats)`, `editPrice(title, newPrice)`, `editPriceAndCancel(title, newPrice)`, `deleteEvent(title)` |
| `AdminBookingsPage` | status filter, booking dialog, Close button, dialog Cancel button, *Yes, cancel it* button | `viewBooking(bookingRef)`, `clickCancel(bookingRef)`, `cancelBooking(bookingRef)`, `filterByStatus(status)` |

Locators prefer user-facing queries (`getByRole`, `getByText`) and `data-testid` attributes (`getByTestId`) over CSS/XPath.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended) and npm
- Git

### Installation

```bash
git clone https://github.com/stsharin/eventhub-automation.git
cd eventhub-automation
npm install
npx playwright install
```

> `npx playwright install` downloads the browser builds that match the installed Playwright version. Re-run it whenever you update `@playwright/test`.

### Credentials

The login, home, event, booking and admin tests need an existing EventHub account. Credentials are read from environment variables and are never committed:

```bash
cp .env.example .env
```

Then set your own account in `.env`:

```text
EVENTHUB_EMAIL=your-email@example.com
EVENTHUB_PASSWORD=your-password
```

On CI, set `EVENTHUB_EMAIL` and `EVENTHUB_PASSWORD` as secrets instead. Variables already set in the environment take precedence over `.env`.

---

## Running Tests

| Command | Description |
| --- | --- |
| `npx playwright test` | Run all tests on all browsers |
| `npx playwright test --project=chromium` | Run on a single browser (`chromium`, `firefox`, `webkit`) |
| `npx playwright test tests/event.spec.ts` | Run a single spec file |
| `npx playwright test -g "event details"` | Run tests whose title matches a pattern |
| `npx playwright test --headed` | Run with a visible browser window |
| `npx playwright test --ui` | Open Playwright UI mode for interactive runs and debugging |
| `npx playwright test --debug` | Step through tests with the Playwright Inspector |

---

## Test Reports

An HTML report is generated after every run:

```bash
npx playwright show-report
```

It includes pass/fail status, duration and error details for each test, plus screenshots for failed tests and traces for retried tests (see [Configuration](#configuration)).

---

## Configuration

Key settings in `playwright.config.ts`:

| Setting | Value |
| --- | --- |
| Base URL | `https://eventhub.rahulshettyacademy.com` (tests navigate with relative paths) |
| Credentials | Loaded from `.env` via `dotenv` |
| Browsers | Chromium, Firefox, WebKit |
| Mode | Headless |
| Parallel execution | Fully parallel (1 worker on CI) |
| Retries | 0 locally, 2 on CI |
| Screenshots | Only on failure |
| Traces | On first retry |
| Reporter | HTML |

---

## Roadmap

### UI Automation

- [x] User registration
- [x] User login
- [x] Event search (positive and negative)
- [x] Event filtering by category, city and both
- [x] Clear filters
- [x] Event details
- [x] Event booking (Confirm Booking flow)
- [x] My Bookings: view booking details, go back and cancel booking
- [x] Admin – Manage Events: add, edit and delete events
- [x] Admin – Manage Bookings: view, cancel and status filter
- [x] Home page: featured events and links
- [x] Logout and protected pages
- [x] Ticket limits and refund eligibility
- [x] Assertions for successful login and registration outcomes
- [x] Negative login and registration scenarios (invalid credentials, validation messages)

### Framework Improvements

- [x] Page Object Model
- [x] Use `baseURL` with relative paths in `page.goto()`
- [ ] Test fixtures for page objects and logged-in state
- [x] Unique test users for registration
- [x] External test data files
- [x] Credentials via environment variables (`.env`)
- [ ] npm scripts for common test commands

### API & CI/CD

- [ ] API automation
- [ ] UI + API integration scenarios
- [ ] GitHub Actions workflow
- [ ] Publish test reports as CI artifacts

---

## Author

**stsharin** — [github.com/stsharin](https://github.com/stsharin)
