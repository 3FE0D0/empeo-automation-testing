const {test,expect}=require('@playwright/test');
const {RegistrationPage}=require('../pages/registration.page');
test.beforeEach(async({page})=>{await new RegistrationPage(page).goto();});
test('REG-001 form loads',async({page})=>{
  const r=new RegistrationPage(page);
  await expect(r.email).toBeVisible();await expect(r.phone).toBeVisible();
});
test('REG-002 all required errors',async({page})=>{
  const r=new RegistrationPage(page);await r.submit.click();
  for(const msg of ['กรุณากรอกเลขประจำตัวผู้เสียภาษีหรือชื่อบริษัท','กรุณากรอกอีเมล','กรุณากรอกชื่อ','กรุณากรอกนามสกุล','กรุณากรอกเบอร์โทรศัพท์มือถือ','กรุณารับทราบนโยบายความเป็นส่วนตัว และข้อกำหนดและเงื่อนไขการใช้งาน'])await r.error(msg);
});
for(const [id,field,message] of [
  ['REG-003','company','กรุณากรอกเลขประจำตัวผู้เสียภาษีหรือชื่อบริษัท'],
  ['REG-004','email','กรุณากรอกอีเมล'],
  ['REG-005','firstName','กรุณากรอกชื่อ'],
  ['REG-006','lastName','กรุณากรอกนามสกุล'],
  ['REG-007','phone','กรุณากรอกเบอร์โทรศัพท์มือถือ']]){
  test(`${id} missing ${field}`,async({page})=>{
    const r=new RegistrationPage(page);await r.fillValid({[field]:''});
    await r.submit.click();await r.error(message);
  });
}
test('REG-008 terms unchecked',async({page})=>{
  const r=new RegistrationPage(page);await r.fillValid();await r.terms.uncheck();await r.submit.click();
  await r.error('กรุณารับทราบนโยบายความเป็นส่วนตัว และข้อกำหนดและเงื่อนไขการใช้งาน');
});

test('UI-001 promo entry accepts fixture',async({page})=>{
  const r=new RegistrationPage(page);
  await page.getByText('ใช้โค้ดส่วนลด',{exact:true}).click();
  await r.promo.fill('FREE15DAY');await expect(r.promo).toHaveValue('FREE15DAY');
  // This checks entry only; it does not prove the code was redeemed.
});
test('UI-002 dropdowns can be selected',async({page})=>{
  const r=new RegistrationPage(page);await r.chooseBusiness();await r.chooseUsers();
  await expect(page.getByText('เทคโนโลยี',{exact:true}).first()).toBeVisible();
  await expect(page.getByText('1-20',{exact:true}).first()).toBeVisible();
});
test('UI-003: Company Type Selection', async ({ page }) => {

  // Step 1: Select Other Company Type
  const otherCompany = page.getByRole('radio').nth(1);
  await otherCompany.check();

  // Step 2: Verify Other is selected
  await expect(otherCompany).toBeChecked();

  // Step 3: Select Thai Registered Company
  const thaiCompany = page.getByRole('radio').nth(0);
  await thaiCompany.check();

  // Step 4: Verify Thai Company is selected
  await expect(thaiCompany).toBeChecked();

  // Step 5: Verify Other is unchecked
  await expect(otherCompany).not.toBeChecked();
});

test('PROMO-001: Valid Promo Code', async ({ page }) => {
  const r = new RegistrationPage(page);

  // Step 1: Open Promo Code field
  await page.getByText('ใช้โค้ดส่วนลด', {
    exact: true
  }).click();

  // Step 2: Enter Promo Code
  await r.promo.fill('FREE15DAY');

  // Step 3: Apply Promo Code
  await page.getByText('ใช้โค้ด', {
    exact: true
  }).click();

  // Step 4: Verify applied code is displayed
  await expect(
    page.getByText('FREE15DAY', {
      exact: true
    })
  ).toBeVisible();
});
test('PROMO-002: Invalid Promo Code', async ({ page }) => {
  const r = new RegistrationPage(page);

  // Step 1: Open Promo Code field
  await page.getByText('ใช้โค้ดส่วนลด', {
    exact: true
  }).click();

  // Step 2: Enter invalid Promo Code
  await r.promo.fill('INVALIDCODE999');

  // Step 3: Apply Promo Code
  await page.getByText('ใช้โค้ด', {
    exact: true
  }).click();

  // Step 4: Verify applied code is displayed
  await expect(
    page.getByText('คูปองโค้ดไม่ถูกต้อง', {
      exact: true
    })
  ).toBeVisible();
});
test('PROMO-003: Empty Promo Code', async ({ page }) => {
  const r = new RegistrationPage(page);

  // Step 1: Open Promo Code field
  await page.getByText('ใช้โค้ดส่วนลด', {
    exact: true
  }).click();

  // Step 2: Keep Promo Code empty
  await r.promo.fill('');

  // Step 3: Click Apply Code
  await page.getByText('ใช้โค้ด', {
    exact: true
  }).click();

  // Step 4: Verify displayed
  await expect(r.promo).toBeVisible();
  await expect(r.promo).toHaveValue('');
  await expect(
    page.getByText('คูปองโค้ดไม่ถูกต้อง', {
      exact: true
    })
  ).not.toBeVisible();
});
test('PROMO-004: Promo Code With Spaces', async ({ page }) => {
  const r = new RegistrationPage(page);

  // Step 1: Open Promo Code field
  await page.getByText('ใช้โค้ดส่วนลด', {
    exact: true
  }).click();

  // Step 2: Enter Promo Code with spaces
  await r.promo.fill('  FREE15DAY  ');

  // Step 3: Apply Promo Code
  await page.getByText('ใช้โค้ด', {
    exact: true
  }).click();

  // Step 4: Verify displayed
  await expect(
    page.getByText('คูปองโค้ดไม่ถูกต้อง', {
      exact: true
    })
  ).toBeVisible();
});

test('EDGE-001: First Name Boundary Value Analysis', async ({ page }) => {
  const r = new RegistrationPage(page);

  const testData = [
    { inputLength: 254, expectedLength: 254 },
    { inputLength: 255, expectedLength: 255 },
    { inputLength: 256, expectedLength: 255 }
  ];

  for (const data of testData) {
    const name = 'A'.repeat(data.inputLength);

    await r.firstName.fill(name);

    const actualValue = await r.firstName.inputValue();

    expect(actualValue.length).toBe(data.expectedLength);

    console.log(
      `Input: ${data.inputLength}, Actual: ${actualValue.length}`
    );
  }
});
test('EDGE-002: Last Name Boundary Value Analysis', async ({ page }) => {
  const r = new RegistrationPage(page);

  const testData = [
    { inputLength: 254, expectedLength: 254 },
    { inputLength: 255, expectedLength: 255 },
    { inputLength: 256, expectedLength: 255 }
  ];

  for (const data of testData) {
    const lastName = 'A'.repeat(data.inputLength);

    await r.lastName.fill(lastName);

    const actualValue = await r.lastName.inputValue();

    expect(actualValue.length).toBe(data.expectedLength);

    console.log(
      `Input: ${data.inputLength}, Actual: ${actualValue.length}`
    );
  }
});

test('EDGE-003: Phone With Special Characters', async ({ page }) => {
  const r = new RegistrationPage(page);

  await r.goto();

  await r.fillValid({
    phone: '096@690708'
  });

  await r.submit.click();

  await expect(
    page.getByText('รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง', {
      exact: true
    })
  ).toBeVisible();
});

test('EDGE-004: Phone With Spaces', async ({ page }) => {
  const r = new RegistrationPage(page);

  await r.goto();

  // Test phone number containing spaces
  await r.phone.fill('096 769 0708');

  // Inspect how the input handles spaces
  const actualValue = await r.phone.inputValue();

  console.log('Phone Input:', JSON.stringify(actualValue));
  console.log('Input Length:', actualValue.length);

  // Confirm phone input remains accessible
  await expect(r.phone).toBeVisible();
});
