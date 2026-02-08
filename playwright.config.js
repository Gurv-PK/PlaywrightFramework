// @ts-check
import { defineConfig, devices } from "@playwright/test";
import dotenv from 'dotenv';
import { fileURLToPath } from 'url'
import path from "path";
import ENV_CONFIG from './utils/env-setup.js';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


const ENV = process.env.ENV || 'qa';
dotenv.config({ path: path.resolve(__dirname, `.env.${ENV}`) });

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
        forbidOnly: !!process.env.CI,
        retries: process.env.CI ? 2 : 0,
        workers: process.env.CI ? 1 : undefined,
    reporter: [['html', {open: "never", outputFolder: path.join(__dirname, 'playwright-report') }]],

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
        {
            name: 'firefox',
            use: {...devices['Desktop Firefox']},
        },
        {
            name: 'webkit',
            use: {...devices['Desktop Safari']},
        },
    ]
})
