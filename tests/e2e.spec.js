const {test,expect}=require('@playwright/test');
const {RegistrationPage}=require('../pages/registration.page');
test.describe('registration integration @e2e',()=>{
 test.skip(
    true,
    'Blocked: Authorized test email is unavailable'
  );
  test('E2E-001 valid registration reaches OTP',async({page})=>{
    const r=new RegistrationPage(page);await r.goto();
    await r.fillValid({email:process.env.TEST_EMAIL||`qa.${Date.now()}@example.com`});
    await r.submit.click();
    await expect(page.getByText(/OTP|รหัสยืนยัน|ยืนยันเบอร์/i).first()).toBeVisible();
  });
  test.fixme('E2E-002 OTP 123456 successful verification',()=>{});
  test.fixme('E2E-003 wrong/expired/reused OTP rejection',()=>{});
  test.fixme('E2E-004 valid/invalid/reused promo redemption',()=>{});
});
