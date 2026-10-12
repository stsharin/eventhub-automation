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

**10 test cases** across 3 spec files, each executed on **Chromium, Firefox and WebKit** (30 runs in total).

### Summary

| Feature | Spec file | Tests | Status |
| --- | --- | :---: | --- |
| User Registration | `register.spec.ts` | 1 | ✅ Automated |
| User Login | `login.spec.ts` | 1 | ✅ Automated |
| Event Search | `event.spec.ts` | 2 | ✅ Automated |
| Event Filtering | `event.spec.ts` | 4 | ✅ Automated |
| Clear Filters | `event.spec.ts` | 1 | ✅ Automated |
| Event Details | `event.spec.ts` | 1 | ✅ Automated |
| Event Booking | — | — | 🔄 Planned |
| API Testing | — | — | 🔄 Planned |
| CI/CD | — | — | 🔄 Planned |

### Test Cases

#### Registration — `tests/register.spec.ts`

| # | Test case | Steps |
| --- | --- | --- |
| 1 | User should register successfully | Open `/register`, fill email, password and confirm password, click **Create Account** |

#### Login — `tests/login.spec.ts`

| # | Test case | Steps |
| --- | --- | --- |
| 2 | User should login successfully | Open the home page, enter valid credentials, click **Sign In** |

#### Events — `tests/event.spec.ts`

Every test in this file starts from a shared `beforeEach` hook: log in → click **Browse Events →** → verify the URL contains `/events`.

| # | Test case | Type | What it verifies |
| --- | --- | --- | --- |
| 3 | User should see matching events | Positive | Searching `music` shows *Hollywood Monsoon Night — Los Angeles* |
| 4 | User should see no events found | Negative | Searching `xyz` shows *No events found* |
| 5 | User should filter events by category | Positive | Category `Conference` shows *World Tech Summit* |
| 6 | User should filter events by city | Positive | City `Delhi` shows *Dilli Diwali Mela* |
| 7 | Should show no events when the selected city has no matches | Negative | City `Pune` shows *No events found* |
| 8 | User should filter events by category and city | Positive | `Festival` + `Delhi` together show *Dilli Diwali Mela* |
| 9 | User should clear filters | Positive | After **Clear filters**, dropdowns reset to *All Categories* and *All Cities* |
| 10 | User should see event details | Positive | **Book Now** on *Dilli Diwali Mela* opens its details page showing the event name, venue (*Pragati Maidan Exhibition Grounds*) and ticket price |

---

## Project Structure

```text
eventhub-automation/
├── pages/                     # Page Object Model classes
│   ├── RegisterPage.ts
│   ├── LoginPage.ts
│   ├── EventsPage.ts
│   └── EventDetailsPage.ts
├── tests/                     # Test specs
│   ├── register.spec.ts
│   ├── login.spec.ts
│   └── event.spec.ts
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
| `EventsPage` | search box, category filter, city filter, Clear filters button, Book Now button | `searchEvent()`, `filterByCategory()`, `filterByCity()`, `clearFilters()`, `clickBookNow()` |
| `EventDetailsPage` | event name, venue, ticket price, Confirm Booking button | — (Confirm Booking is ready for the upcoming booking tests) |

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
| Base URL | `https://eventhub.rahulshettyacademy.com` |
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
- [ ] Event booking (Confirm Booking flow)
- [ ] Assertions for successful login and registration outcomes
- [ ] Negative login and registration scenarios (invalid credentials, validation messages)

### Framework Improvements

- [x] Page Object Model
- [ ] Use `baseURL` with relative paths in `page.goto()`
- [ ] Test fixtures for page objects and logged-in state
- [ ] Test data management (unique test users, external test data)
- [ ] Credentials via environment variables (`.env`)
- [ ] npm scripts for common test commands

### API & CI/CD

- [ ] API automation
- [ ] UI + API integration scenarios
- [ ] GitHub Actions workflow
- [ ] Publish test reports as CI artifacts

---

## Author

**stsharin** — [github.com/stsharin](https://github.com/stsharin)
