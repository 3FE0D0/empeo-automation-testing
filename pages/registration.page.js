const { expect } = require('@playwright/test');
class RegistrationPage {
  constructor(page) {
    this.page=page;
    this.company=page.getByTestId('input_textfield_input_registration_tax_id');
    this.email=page.getByTestId('input_textfield_input_registration_email');
    this.firstName=page.getByTestId('input_textfield_input_register_first_name');
    this.lastName=page.getByTestId('input_textfield_input_register_last_name');
    this.phone=page.getByPlaceholder('เบอร์มือถือ*');
    this.terms=page.getByTestId('input_checkbox_registration_checkbox');
    this.submit=page.getByTestId('button_submit_registration_try_for_free');
    this.promo=page.getByTestId('input_text_registration_coupon_code');
  }
  async goto(){await this.page.goto('/Register/empeo');await expect(this.submit).toBeVisible();}
  async chooseBusiness(value='เทคโนโลยี'){
    await this.page.getByText('ประเภทธุรกิจ*',{exact:true}).click();
    await this.page.getByText(value,{exact:true}).last().click();
  }
  async chooseUsers(value='1-20'){
    await this.page.getByText('ผู้ใช้งาน*',{exact:true}).click();
    await this.page.getByText(value,{exact:true}).last().click();
  }
  async fillValid(overrides={}){
    const data={company:'QA Practice Company',email:`qa.${Date.now()}@example.com`,firstName:'Automation',lastName:'Tester',phone:'0967690708',...overrides};
    await this.company.fill(data.company);
    await this.chooseBusiness();await this.chooseUsers();
    await this.email.fill(data.email);await this.firstName.fill(data.firstName);
    await this.lastName.fill(data.lastName);await this.phone.fill(data.phone);
    if (!(await this.terms.isChecked())) {
      await this.terms.evaluate(element => element.click());
    }

    await expect(this.terms).toBeChecked();return data;
  }
  async error(text){await expect(this.page.getByText(text,{exact:true})).toBeVisible();}
}
module.exports={RegistrationPage};


