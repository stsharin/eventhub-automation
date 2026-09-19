# EventHub Automation — Playwright + TypeScript

End-to-end UI test automation project for the **EventHub QA practice application**, built using **Playwright and TypeScript**.

The project focuses on automating core user journeys with reliable locators, assertions, and maintainable test cases.

**Application Under Test:** [EventHub](https://eventhub.rahulshettyacademy.com/)

---

## Tech Stack

* **Playwright** — End-to-end UI automation
* **TypeScript** — Test development
* **Node.js** — Runtime environment
* **npm** — Dependency management
* **Git & GitHub** — Version control
* **VS Code** — Development environment

---

## Automated Test Coverage

### Authentication

* User Registration
* User Login
* Login validation
* Registration validation

### Event Management

* Event page navigation
* Event search
* Search result validation
* Event filtering
* Filter result validation

### Current Coverage

| Feature            | Status      |
| ------------------ | ----------- |
| User Registration  | ✅ Automated |
| User Login         | ✅ Automated |
| Event Page         | ✅ Automated |
| Event Search       | ✅ Automated |
| Event Filtering    | ✅ Automated |
| Event Details      | 🔄 Planned  |
| Event Booking      | 🔄 Planned  |
| Negative Scenarios | 🔄 Planned  |
| API Testing        | 🔄 Planned  |
| CI/CD              | 🔄 Planned  |

---

## Project Structure

```text
eventhub-automation/
│
├── tests/
│   ├── login.spec.ts
│   ├── registration.spec.ts
│   ├── event.spec.ts
│
├── pages/
│   ├── LoginPage.ts
│   ├── RegistrationPage.ts
│   └── EventPage.ts
│
├── playwright.config.ts
├── tsconfig.json
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

> The project structure will evolve as the automation framework grows.

---

## Automation Approach

The current automation suite focuses on:

* End-to-end UI testing
* Reliable Playwright locators
* Meaningful assertions
* Functional validations
* Independent test scenarios
* Clear test descriptions
* Browser-based test execution
* Playwright HTML reporting

As the project grows, additional framework practices such as Page Object Model, reusable components, test fixtures, and test data management may be introduced.

---

## Getting Started

### Prerequisites

Make sure the following are installed:

* Node.js
* npm
* Git
* VS Code

Verify the installation:

```bash
node --version
npm --version
git --version
```

### Clone the Repository

```bash
git clone https://github.com/stsharin/eventhub-automation.git
```

Navigate to the project:

```bash
cd eventhub-automation
```

### Install Dependencies

```bash
npm install
```

### Install Playwright Browsers

```bash
npx playwright install
```

---

## Running Tests

### Run all tests

```bash
npx playwright test
```

### Run tests in headed mode

```bash
npx playwright test --headed
```

### Run a specific test file

```bash
npx playwright test tests/login.spec.ts
```

### Run Playwright UI Mode

```bash
npx playwright test --ui
```

### Run tests on Chromium

```bash
npx playwright test --project=chromium
```

---

## Test Reports

Playwright's HTML reporter can be used to review test execution results.

```bash
npx playwright show-report
```

The report provides information such as:

* Test execution status
* Execution duration
* Failed test details
* Screenshots
* Videos
* Trace information

---

## Cross-Browser Testing

Playwright supports execution across multiple browser engines:

* Chromium
* Firefox
* WebKit

Browser projects can be configured in:

```text
playwright.config.ts
```

---

## Git Workflow

The project is maintained using Git and GitHub.

Before starting work:

```bash
git pull
```

After making changes:

```bash
git add .
git commit -m "Add event filtering automation"
git push
```

---

## Roadmap

### UI Automation

* [x] User registration
* [x] User login
* [x] Event page navigation
* [x] Event search
* [x] Event filtering
* [ ] Event details validation
* [ ] Event booking
* [ ] Negative test scenarios

### Framework Improvements

* [ ] Page Object Model
* [ ] Reusable page components
* [ ] Test fixtures
* [ ] Test data management
* [ ] Environment-based configuration

### API & CI/CD

* [ ] API automation
* [ ] UI + API integration scenarios
* [ ] GitHub Actions
* [ ] Automated CI test execution
* [ ] Test report artifacts

---

## Project Status

**Status: 🚧 In Development**

The project is actively being developed. Additional functional scenarios and framework improvements will be added incrementally.

---

## Learning Objectives

This project provides hands-on experience with:

* End-to-End Test Automation
* Playwright
* TypeScript
* UI Testing
* Assertions & Validations
* Cross-Browser Testing
* Test Reporting
* Git & GitHub
* Automation Framework Design
* CI/CD

---

## Author

**stsharin**

GitHub: [github.com/stsharin](https://github.com/stsharin)

---
