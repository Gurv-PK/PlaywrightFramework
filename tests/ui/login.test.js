import test, { expect } from "@playwright/test";
import LoginPage from "../../pages/LoginPage";
import Logindata from "../../test-data/logindata.json" assert { type: 'json' };

test.describe('login',()=>{
    let login;
    
    test.beforeEach(async ({page})=>{
        login = new LoginPage(page);
        await page.goto('/');
    });

    test.afterEach(async ({}, testInfo) =>{
        console.log(`Test "${testInfo.title}" has completed with status: "${testInfo.status}"`)
    });


    test('Valid Login Process', async ({page}) => {
        await login.enter_username(Logindata.validuser.username);
        await login.enter_password(Logindata.validuser.password);
        await login.click_login_button();
        const logo = page.getByText('Swag Labs');
        await expect(logo).toBeVisible()
        await expect(logo).toHaveText("Swag Labs")
    });

    test('Invalid Login', async({page}) =>{
        await login.enter_username(Logindata.Invaliduser.username);
        await login.enter_password(Logindata.Invaliduser.password);
        await login.click_login_button();
        const error = page.locator('[data-test="error"]')
        await expect(error).toBeVisible()
        await expect(error).toContainText("Username and password do not match any user in this service")
    });



})