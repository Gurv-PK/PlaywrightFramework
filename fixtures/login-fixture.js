import { request as playwrightRequest } from '@playwright/test';
import ENV_CONFIG from '../utils/env-setup.js';

export async function createAPIContext(){
    return await playwrightRequest.newContext({
        baseURL: ENV_CONFIG.apiurl,
        extraHTTPHeaders: {
            'Content-Type': 'application/json',
        },
    });
    
}