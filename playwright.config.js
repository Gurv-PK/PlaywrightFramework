// @ts-check
import { defineConfig, devices } from "@playwright/test";
import dotenv from 'dotenv';
import path from "path";
import ENV_CONFIG from './utils/env-setup.js';

const ENV = process.env.ENV || 'qa';
dotenv.config({ path: path.resolve(__dirname, `.env.${ENV}`) });

module.exports = defineConfig({
    testDir: './tests',
    fullyParallel: true,
        forbidOnly: !!process.env.CI,
        retries: process.env.CI ? 2 : 0,
        workers: process.env.CI ? 1 : undefined,
    reporter: [['html', {open: "never"}]],

    use: {
        baseURL: ENV_CONFIG.url,
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'on-first-retry',
    },
    projects:[
        {
            name: 'chromium',
            use: {...devices['Desktop Chrome']},
        },
        /*{
            name: 'firefox',
            use: {...devices['Desktop Firefox']},
        },
        {
            name: 'webkit',
            use: {...devices['Desktop Safari']},
        },*/
    ]
})
