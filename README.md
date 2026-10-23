# Automation Tester Exam 1.0 — empeo

Playwright JavaScript (CommonJS) automation for the empeo UAT registration form. Shared selectors/actions use the Page Object Model. OTP backend verification remains untested.

## Run on Windows PowerShell

```powershell
npm.cmd install
npx.cmd playwright install chromium
npx.cmd playwright test --grep-invert "@e2e"
npx.cmd playwright show-report
```

Using `npm.cmd` and `npx.cmd` avoids PowerShell `.ps1` execution-policy restrictions.

## Useful commands

```powershell
npx.cmd playwright test --list
npx.cmd playwright test --grep "REG-002" --headed
npx.cmd playwright test --grep-invert "@e2e" --headed
```

The `@e2e` suite is intentionally disabled, even if `RUN_E2E` was previously set. It must only be re-enabled after authorized, resettable UAT test-account fixtures become available. Do not use personal email addresses or fictitious third-party mailboxes for real signup.

## Files

- `pages/registration.page.js`: Page Object Model, reusable locators/actions.
- `tests/registration.spec.js`: required fields and form UI.
- `tests/validation.spec.js`: negative email and phone tests.
- `tests/e2e.spec.js`: disabled, pending registration and OTP/promo integration scenarios.
- `TEST_CASES.md`: scenario coverage, priority and status.
- `TEST_EXECUTION_SUMMARY.md`: actual results and integration limitations.
- `playwright.config.js`: reports, traces, screenshots, sequential workers.

## Code concepts

- `test()` declares an independent scenario; `beforeEach()` starts from a clean registration page.
- `page.goto()` opens a page; `getByTestId()` finds an element by its stable identifier.
- `fill()` inputs data; `click()` acts; `expect(...).toBeVisible()` checks the actual result.
- `fillValid()` avoids duplicating field setup; `overrides` changes just the data under test.
- `test.skip` and `test.fixme` keep unverified flows from appearing as passed.

On 23 October 2026, screenshots of the user's non-E2E UAT run showed **25 passed, 0 failed, 0 skipped**, in approximately 1.3 minutes. This result applies only to the selected executed suite, not Successful Registration or OTP. See `TEST_EXECUTION_SUMMARY.md`.

## Submission choice

The exam allows either **a recording of automation running** or **code files/project with run instructions**. This archive satisfies the second format. A video is optional and should only be submitted after a successful genuine run; never present a simulated recording as proof.

## Evidence and limitations

See `TEST_EXECUTION_SUMMARY.md`. To reproduce the 25-case scope, run `npx.cmd playwright test --grep-invert "@e2e"` on the latest local project and use the resulting `playwright-report/` output as evidence. `node_modules/` and `test-results/` need not be submitted.
