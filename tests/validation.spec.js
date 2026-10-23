const {test,expect}=require('@playwright/test');
const {RegistrationPage}=require('../pages/registration.page');
// The exact invalid-value rules must be verified by running against UAT.
for(const [id,email] of [['VAL-001','invalid-email'],['VAL-002','test@'],['VAL-003','@example.com']]){
  test(`${id} invalid email ${email}`,async({page})=>{
    const r=new RegistrationPage(page);await r.goto();await r.fillValid({email});
    await r.submit.click();
    await expect(page.getByText('กรุณาใส่อีเมลที่ถูกต้อง', {
      exact: true
    })
    ).toBeVisible();
  });
}
for(const [id,phone] of [['VAL-004','123'],['VAL-005','123456789012345'],['VAL-006','abcdefghij']]){
  test(`${id} invalid phone ${phone}`,async({page})=>{
    const r=new RegistrationPage(page);await r.goto();await r.fillValid({phone});
    await r.submit.click();
    await expect(
      page.getByText('รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง', {
        exact: true
      })
    ).toBeVisible();  
  });
}
