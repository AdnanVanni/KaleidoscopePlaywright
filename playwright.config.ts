import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: 'e2e',
    timeout: 60000,
    expect: {
        timeout: 5000,
    },
    fullyParallel: true,
    workers: 4,
    reporter: 'list',


    use: {
        headless: false,
        trace: 'on-first-retry',
        screenshot: 'on',
        video: 'on',
    },


    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],

            },
        },
        {
            name: 'firefox',
            use: {
                ...devices['Desktop Firefox'],
                launchOptions: {

                    args: ['--start-maximized']
                }
            },
        },


    ],
});