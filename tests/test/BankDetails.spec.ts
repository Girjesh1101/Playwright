import test, { Browser, chromium, Page } from "@playwright/test";
import { BasePage } from "../pages/BasePage";
import { LoginPage } from "../pages/loginPage";


test('Manager Details', async()=>{

    const browser : Browser= await chromium.launch({headless:false});
    const page : Page  = await browser.newPage();   

    const url :string ="https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login";

    const baseObj = new BasePage(page);
    const loginObj = new LoginPage(page);

    // baseObj.navigate(url);
    await page.goto(url);
    loginObj.bankManagerDetails();

})