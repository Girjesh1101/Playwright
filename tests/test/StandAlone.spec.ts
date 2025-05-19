import test, { Browser, chromium, expect, Page } from "@playwright/test";
import {faker} from "@faker-js/faker"


test('standalone project' , async ()=>{

    const browser : Browser = await chromium.launch({headless:false});
    const page : Page  = await browser.newPage();

    const url : string  = "https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login";
    const firstName : string = faker.person.firstName();
    const lastname : string  = faker.person.lastName();
   const postcode : string = faker.location.zipCode();
   const amount : number = faker.number.int({min:100 , max:200});
   const withdrawAmount : number = faker.number.int({min: 10 , max:50});



   console.log(firstName , lastname);

   console.log(amount , withdrawAmount);
   
   

    await page.goto(url);

    //verify all the nagivation button enable

    await page.locator("button[ng-click='manager()']").click();

    const buttons =[
        'Add Customer',
        'Open Account',
        'Customers'
    ]

    for(const buttonText of buttons){

        const button = await page.locator(`button:has-Text("${buttonText}")`);
        await expect(button).toBeVisible();
    }

    await page.locator("button[ng-click='addCust()']").click();

    await page.locator("input[placeholder='First Name']").fill(firstName);

    await page.locator("input[placeholder='Last Name']").fill(lastname);

    await page.locator("input[placeholder='Post Code']").fill(postcode);

    await page.locator("button[type='submit']").click();

    page.on('dialog', async(dialog)=>{
        console.log(`Message :${dialog}`);
        await dialog.accept();
        
    })

    // Open Account 

    await page.locator('button:has-Text("Open Account")').click();

    await page.waitForSelector("#userSelect" , {state:'visible'});
    
    await page.locator("#userSelect").selectOption({label:firstName+" "+lastname});
    await page.selectOption('#currency', {value: 'Dollar'});

    await page.locator('button[type="submit"]').click();


    // search and verify customer 
    await page.locator('button:has-text("Customers")').click();

    await page.locator('input[placeholder="Search Customer"]').fill(firstName);
    // verify customer details 

    const tableData = await page.locator("tbody tr");
    await expect(tableData.locator('td:nth-child(1)')).toHaveText(firstName);
    await expect(tableData.locator("td:nth-child(2)")).toHaveText(lastname);
    await expect(tableData.locator("td:nth-child(3)")).toHaveText(postcode);


    // Customer login 

    await page.locator('button[ng-click="home()"]').click();

    await page.locator('button[ng-click="customer()"]').click();

    await page.locator("#userSelect").selectOption({label:firstName+" "+lastname});

    await page.locator('button:has-Text("Login")').click();

    await page.locator('button[ng-click="deposit()"]').click();

    await page.locator('input[placeholder="amount"]').fill(amount.toString());

    await page.locator("button[type='submit']").click();

    await expect(page.locator('span[ng-show="message"]')).toHaveText('Deposit Successful');

    await expect(page.locator("div[class='center'] strong:nth-child(2)")).toHaveText(amount.toString());

    await page.locator('button[ng-click="withdrawl()"]').click();

    await page.waitForLoadState('networkidle')

    await page.locator('input[placeholder="amount"]').fill(withdrawAmount.toString());

  
    await page.locator('button[type="submit"]').click();

    await expect(page.locator('span[ng-show="message"]')).toHaveText('Transaction successful');

    const remainAmount:number = amount - withdrawAmount;

    await expect(page.locator("div[class='center'] strong:nth-child(2)")).toHaveText(remainAmount.toString());

    // await page.waitForTimeout(50000);
})
