var assert = require('assert');
require('chromedriver');
const {Builder, By, until} = require('selenium-webdriver');
const chai = require("chai");
const expect = chai.expect;

describe("Test 1", function() {
    
    this.timeout(30000);

    it ("Should show the 'Question' in the table for a logged in user", async () => {

        let driver = await new Builder().forBrowser("chrome").build();
        await driver.get("https://public-relations-si.herokuapp.com/");
        // Ovaj xpath elementa se pronadje tako sto se u aplikaciji klikne desni klik na element, Inspect,
        // i onda dole gdje mu pronadje poziciju u html-u, klikne se desni klik na njegov html dio => copy => Copy Xpath, ili Copy full Xpath
        await driver.findElement(By.xpath('/html/body/div/div/div[1]/div[2]/div[2]/a')).click();

        // Login:
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/form/input[1]')).sendKeys("dzavid");
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/form/input[2]')).sendKeys("password");
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/form/button')).click();

        // Ulogovao se, sad treba provjerit postojanje teksta "Question" za ulogovanog korisnika
        await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div[2]/section/main/div/div/div/div/div/div/div/div/table/thead/tr/th[2]')), 15000);
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/section/main/div/div/div/div/div/div/div/div/table/thead/tr/th[2]')).getText()
            .then(textValue => { assert.equal('Question', textValue); }).then(() => driver.quit());
    });

});

describe("Test 2", function() {
    
    this.timeout(30000);

    it ("Should show login error when we input incorrect data", async () => {

        let driver = await new Builder().forBrowser("chrome").build();
        await driver.get("https://public-relations-si.herokuapp.com/");
        
        await driver.findElement(By.xpath('/html/body/div/div/div[1]/div[2]/div[2]/a')).click();

        // Login:
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/form/input[1]')).sendKeys("dza");
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/form/input[2]')).sendKeys("password");
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/form/button')).click();

        // Ulogovao se, sad treba provjerit postojanje teksta "Question" za ulogovanog korisnika
        await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div[2]/form/p')), 15000);
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/form/p')).getText()
            .then(textValue => { assert.equal('The username or password is incorrect', textValue); }).then(() => driver.quit());
    });
});

describe("Test 3", function() {
    
    this.timeout(30000);

    it ("Shouldn't accept submitted question - we didn't confirmed reCAPTCHA", async () => {
        let driver = await new Builder().forBrowser("chrome").build();
        await driver.get("https://public-relations-si.herokuapp.com/");
        
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[1]/div[2]/div[1]/a[8]')).click();

        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/form/input[1]')).sendKeys("Ime");
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/form/input[2]')).sendKeys("Prezime");
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/form/input[3]')).sendKeys("probni@etf.unsa.ba");
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/form/textarea')).sendKeys("Ovo ne treba da radi!");
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/form/button')).click();

        await driver.wait(until.elementLocated(By.xpath('//*[@id="alertmsgNadija"]')), 15000);
        await driver.findElement(By.xpath('//*[@id="alertmsgNadija"]')).getText()
            .then(textValue => { assert.equal('Invalid form!', textValue); }).then(() => driver.quit());
    });
});