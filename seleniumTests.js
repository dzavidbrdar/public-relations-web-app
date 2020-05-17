var assert = require('assert');
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

    it ("Opis drugog testa", async () => {
        
    });
});