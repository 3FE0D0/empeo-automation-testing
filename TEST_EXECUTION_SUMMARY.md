# Test Execution Summary

**Project:** empeo Registration System — Automation Tester Exam 1.0  
**Target:** https://portal.uat.gofive.co.th/Register/empeo  
**Framework:** Playwright + JavaScript  
**Execution date:** 23 October 2026

## Actual execution results

Based on screenshots of the final selected non-E2E UAT test run:

| Measure | Result |
| --- | ---: |
| Executed | 25 |
| Passed | 25 |
| Failed | 0 |
| Skipped within selected suite | 0 |
| Duration | Approximately 1.3 minutes |

**Pass rate: 100% of executed tests.** This does not indicate full registration coverage.

## Scope covered

- Required-field and error-message validation
- Email and phone negative validation
- Company type and business/user dropdown interactions
- Valid, invalid, empty, and whitespace promo code UI behavior
- 254/255/256-character first/last-name boundaries
- Phone special-character and spacing scenarios

The individual scenarios and assertions are in the Playwright specs. Tests that merely inspect a field's value are not evidence of backend validation.

## Blocked / not executed on real UAT

| Scenario | Status | Reason |
| --- | --- | --- |
| Successful registration | Blocked | No authorized disposable test email/account |
| Valid OTP `123456` | Blocked | Actual OTP screen requires registration |
| Invalid/expired/reused OTP | Blocked | Needs OTP screen and controlled fixtures |
| Expired/reused promo code | Blocked | Needs known expired/used promo fixtures |

The `@e2e` suite is intentionally skipped, and its cases are **not counted as Passed**. The OTP and phone values supplied in the exam are fixtures, not evidence of successful backend verification.

## Risks and findings

- UAT accounts can persist and affect subsequent runs.
- During early runs, a Crisp Chat overlay intercepted the terms checkbox; the test setup was improved and the final selected suite passed.
- A promo code with leading/trailing spaces was rejected in the observed UAT behavior. Whether trimming is required needs specification confirmation.
- The project deliberately excludes real signup from routine automated execution.

## Reproduce the selected suite

```powershell
npm.cmd install
npx.cmd playwright install chromium
npx.cmd playwright test --grep-invert "@e2e"
npx.cmd playwright show-report
```

## Conclusion

All 25 executed non-E2E tests passed in the final observed run. Full registration and OTP integration remain unverified because the required controlled account/OTP fixtures were unavailable.
