import test, { Browser, chromium, Page } from "@playwright/test";

test('practices', async ()=>{

    const browser : Browser = await chromium.launch({headless:false});
    const page : Page = await browser.newPage();

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    console.log(await page.title());

    // handle checkbox
    await page.locator("#checkBoxOption2").check();

    await page.locator("#checkBoxOption2").uncheck();
    // check and uncheck base on the state
    const checkbox = page.locator("#checkBoxOption2");
    const isChecked : boolean = await checkbox.isChecked();
    if(!isChecked){
        await checkbox.check();
    }else{
        await checkbox.uncheck();
    }

    // handle multiple checkbox 

    const checkboxes = page.locator("input[type='checkbox']");
    const count = await checkboxes.count();

    for(let i = 0 ; i< count ; i++){
        const checkbox = checkboxes.nth(i);
        if(!(await checkbox.isChecked())){
            await checkbox.check();
        }
    }
    
})

test('handle dropdown', async()=>{

    const browser : Browser = await chromium.launch({headless: false});
    const page : Page = await browser.newPage();

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    // select by value , select by label , select by index

    await page.locator("#dropdown-class-example").selectOption("Option2"); // by value
    await page.locator("#dropdown-class-example").selectOption({label:"Option3"}); // by label
    await page.locator("#dropdown-class-example").selectOption({index: 0}); // by index

    //search and 
    
})