import test, { expect } from "@playwright/test";
import { ApiAuthService } from "../../api_helper/AuthService";
import { createAPIContext } from "../../fixtures/login-fixture";
import { LoginRequest } from "../../models/Loginservice/LoginRequest";

test.describe('Auth Service Test',()=>{
    let authService;
    let apiContext;

    test.beforeAll(async() =>{
        apiContext = await createAPIContext();
        authService = new ApiAuthService(apiContext)
    })

    test.afterAll(async ()=>{
        await apiContext.dispose();
    })

    test.afterEach(async ({}, testInfo) =>{
            console.log(`Test "${testInfo.title}" has completed with status: "${testInfo.status}"`)
        });

    test("Valid and Invalid request test", async() => {
        const loginPayload = LoginRequest.validLogin();
        const validRes = await authService.login(loginPayload)
        console.log(validRes)
        expect(validRes.status).toBe(200)
        expect(validRes.response.isTokenPresent()).toBeTruthy()

        const invalidPayload = LoginRequest.InvalidLogin();
        const Invalidres = await authService.login(invalidPayload);
        console.log(Invalidres)
        expect(Invalidres.status).toBe(200)
        expect(Invalidres.response.isTokenPresent()).toBeFalsy()
    })

    
})