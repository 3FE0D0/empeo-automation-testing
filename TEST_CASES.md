# empeo Registration — Test Case Design & Coverage Matrix

**System under test:** https://portal.uat.gofive.co.th/Register/empeo  
**Framework:** Playwright + JavaScript  
**Last execution evidence:** 23 October 2026

## Execution summary

| Scope | Executed | Passed | Failed | Status |
| --- | ---: | ---: | ---: | --- |
| Selected UAT suite (`--grep-invert "@e2e"`) | 25 | 25 | 0 | Passed |
| Registration/OTP integration (`@e2e`) | 0 | 0 | 0 | 4 scenarios intentionally skipped / blocked |

The 25 passing cases below are based on the final Playwright HTML Report screenshots supplied by the test author. **Skipped/blocked scenarios are not counted as Passed.** A passed automation assertion establishes only the behavior that the assertion actually checked.

### A. Registration required fields — 8 passed

| ID | Priority | Scenario / test data | Expected behavior / assertion | Result |
| --- | --- | --- | --- | --- |
| REG-001 | P0 | Open registration form | Form fields are visible | Passed |
| REG-002 | P0 | Submit all required fields empty | Six required-field errors are visible | Passed |
| REG-003 | P0 | Company empty, remaining fields populated | Company required error | Passed |
| REG-004 | P0 | Email empty, remaining fields populated | Email required error | Passed |
| REG-005 | P0 | First Name empty | First Name required error | Passed |
| REG-006 | P0 | Last Name empty | Last Name required error | Passed |
| REG-007 | P0 | Phone empty | Phone required error | Passed |
| REG-008 | P0 | Terms unchecked | Acceptance-required error | Passed |

### B. Email and phone validation — 6 passed

| ID | Priority | Scenario / test data | Expected behavior / assertion | Result |
| --- | --- | --- | --- | --- |
| VAL-001 | P0 | Email `invalid-email` | `กรุณาใส่อีเมลที่ถูกต้อง` | Passed |
| VAL-002 | P1 | Email `test@` | Invalid email error | Passed |
| VAL-003 | P1 | Email `@example.com` | Invalid email error | Passed |
| VAL-004 | P0 | Phone `123` | `รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง` | Passed |
| VAL-005 | P1 | Phone `123456789012345` | Invalid phone error | Passed |
| VAL-006 | P1 | Phone `abcdefghij` | Invalid phone error | Passed |

### C. UI interactions — 3 passed

| ID | Priority | Scenario | Expected behavior / assertion | Result |
| --- | --- | --- | --- | --- |
| UI-001 | P1 | Open promo entry and type `FREE15DAY` | Promo input retains value | Passed |
| UI-002 | P1 | Select Technology and user range 1–20 | Selected choices are visible | Passed |
| UI-003 | P1 | Switch Company Type radio options | Chosen radio is checked and the other unchecked | Passed |

### D. Promo code validation — 4 passed

| ID | Priority | Scenario / test data | Expected behavior / assertion | Result |
| --- | --- | --- | --- | --- |
| PROMO-001 | P0 | Apply `FREE15DAY` | Applied-code label `FREE15DAY` visible | Passed |
| PROMO-002 | P0 | Apply `INVALIDCODE999` | `คูปองโค้ดไม่ถูกต้อง` visible | Passed |
| PROMO-003 | P1 | Apply empty promo | Input remains empty and invalid-code message is not visible | Passed (limited assertion) |
| PROMO-004 | P1 | Apply `  FREE15DAY  ` | UAT displays `คูปองโค้ดไม่ถูกต้อง` | Passed (observed UAT behavior) |

**Promo scope qualification:** PROMO-001 confirms the applied-code indicator, not actual promotional entitlement after registration. PROMO-004 records observed behavior; whether whitespace *should* be trimmed requires product specification confirmation.

### E. Edge and boundary scenarios — 4 passed

| ID | Priority | Scenario / test data | Expected behavior / assertion | Result |
| --- | --- | --- | --- | --- |
| EDGE-001 | P1 | First Name lengths 254, 255, 256 | Actual lengths 254, 255, 255 | Passed |
| EDGE-002 | P1 | Last Name lengths 254, 255, 256 | Actual lengths 254, 255, 255 | Passed |
| EDGE-003 | P1 | Phone with special characters | Invalid phone error | Passed |
| EDGE-004 | P1 | Phone with spaces | Input behavior inspected; no backend validation proven | Passed (limited assertion) |

## Blocked E2E and OTP integration — not executed

These correspond to the current `tests/e2e.spec.js` suite, which is intentionally skipped. Its names describe pending work, not verified UAT outcomes.

| Test ID | Priority | Intended scenario | Expected behavior to confirm | Status |
| --- | --- | --- | --- | --- |
| E2E-001 | P0 | Submit valid registration data | Navigate to actual OTP verification | Blocked / skipped |
| E2E-002 | P0 | Verify supplied OTP `123456` | Registration verification succeeds | Blocked / fixme |
| E2E-003 | P0 | Wrong or expired OTP | Appropriate error and no successful verification | Blocked / fixme |
| E2E-004 | P1 | Promo redemption integration and reused/invalid code states | Correct backend outcome and eligibility | Blocked / fixme |

### Additional planned OTP/promo design cases

| Scenario | Test data / precondition | Expected outcome | Status |
| --- | --- | --- | --- |
| Empty OTP | Blank | Required-field validation | Design only |
| Too-short OTP | `12345` | Reject / incomplete input | Design only |
| Too-long OTP | `1234567` | Enforce OTP length / reject | Design only |
| Non-numeric OTP | `ABCDEF` | Reject non-numeric OTP | Design only |
| Expired OTP | Seeded expired OTP | Reject with expiry handling | Needs fixture |
| Reused OTP | Previously consumed OTP | Reject if OTP is single-use | Needs fixture |
| Expired promo | Seeded expired promo | Reject expired promotion | Needs fixture |
| Reused promo | Seeded previously redeemed code | Apply documented single-use policy | Needs fixture |

## Test data, isolation and limitations

- The assessment supplies phone `0967690708`, OTP `123456`, and promo `FREE15DAY`.
- No authorized disposable email/account was available, and personal email use was intentionally avoided. Successful signup and OTP were not executed.
- A timestamp-based email alone is insufficient to guarantee successful signup when UAT checks domains, company identity, or phone reuse.
- Expired/reused OTP and promotional scenarios require controlled backend data or a supported reset process.
- During early test runs, Crisp Chat intercepted the terms checkbox. The setup was adjusted; the final selected 25-case suite passed.
- The primary evidence for execution results is the Playwright HTML Report. Test-case labels and code should be kept synchronized if the scripts change.
