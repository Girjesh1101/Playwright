import { Locator, Page } from "@playwright/test";

export class LoginPage{

    page : Page;
    bankManagerLoginBtn : Locator;
    customerLogiBtn : Locator

    constructor(page: Page){

        this.page = page ;
        this.bankManagerLoginBtn =page.locator( "button[ng-click='manager()']");
        this.customerLogiBtn = page.locator("button[ng-click='customer()']");
    }

    async bankManagerDetails(){

        await this.bankManagerLoginBtn.click();
    }

    async bankCustomerDetails(){
        await this.customerLogiBtn.click();
    }
}
module.exports ={LoginPage}