const { defineConfig, devices } = require('@playwright/test');
module.exports = defineConfig({testDir:'./tests',workers:1,retries:process.env.CI?1:0,reporter:[['list'],['html',{open:'never'}]],use:{baseURL:'https://portal.uat.gofive.co.th',...devices['Desktop Chrome'],trace:'retain-on-failure',screenshot:'only-on-failure',video:'retain-on-failure'}});
