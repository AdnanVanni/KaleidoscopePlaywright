import { defineConfig, devices } from 'playwright/test'

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

        browserName: 'chromium',
        headless: true,
    },
});
