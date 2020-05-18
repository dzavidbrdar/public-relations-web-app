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
    
    this.timeout(50000);

    it ("Should show success message after reply", async () => {

        let driver = await new Builder().forBrowser("chrome").build();
        await driver.get("https://public-relations-si.herokuapp.com/");
        
        await driver.findElement(By.xpath('/html/body/div/div/div[1]/div[2]/div[2]/a')).click();

        // Login:
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/form/input[1]')).sendKeys("dzavid");
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/form/input[2]')).sendKeys("password");
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/form/button')).click();

        await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/div[2]/section/main/div/div/div/div/div/div/div/div/table/tbody/tr[1]/td[5]/span/button')), 10000);
        await driver.findElement(By.xpath('/html/body/div/div/div[2]/section/main/div/div/div/div/div/div/div/div/table/tbody/tr[1]/td[5]/span/button')).click();
        await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div[2]/section/main/div/div[2]/div[1]/div/div/div/textarea')), 20000);
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/section/main/div/div[2]/div[1]/div/div/div/textarea')).sendKeys('Odgovoreno je!');
        await driver.findElement(By.xpath('//*[@id="answer"]')).click();
      
        await driver.wait(until.elementLocated(By.xpath('/html/body/div[2]/div/span/div/div/div/span[2]')), 20000);
        await driver.findElement(By.xpath('/html/body/div[2]/div/span/div/div/div/span[2]')).getText()
            .then(textValue => { assert.equal('Your reply has been successfully submitted!', textValue); }).then(() => driver.quit());
        
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
describe("Test 4", function() {
    
    this.timeout(50000);

    it ("Should show alert - name is not valid!", async () => {
        let driver = await new Builder().forBrowser("chrome").build();
        await driver.get("https://public-relations-si.herokuapp.com/");
        
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[1]/div[2]/div[1]/a[8]')).click();

        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/form/input[1]')).sendKeys("Ime1");
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/form/input[2]')).sendKeys("Prezime");
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/form/input[3]')).sendKeys("probni@etf.unsa.ba");
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/form/textarea')).sendKeys("Ovo ne treba da radi!");

        await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div[2]/form/span')), 15000);
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/form/span')).getText()
            .then(textValue => { assert.equal('Name is not valid!', textValue); }).then(() => driver.quit());
    });
});
describe("Test 5", function() {
    
    this.timeout(30000);

    it ("Should show alert - lastname is not valid!", async () => {
        let driver = await new Builder().forBrowser("chrome").build();
        await driver.get("https://public-relations-si.herokuapp.com/");
        
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[1]/div[2]/div[1]/a[8]')).click();

        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/form/input[1]')).sendKeys("Ime");
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/form/input[2]')).sendKeys("kpsd98");
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/form/input[3]')).sendKeys("probni@etf.unsa.ba");
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/form/textarea')).sendKeys("Ovo ne treba da radi!");

        await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div[2]/form/span')), 15000);
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/form/span')).getText()
            .then(textValue => { assert.equal('Last name is not valid!', textValue); }).then(() => driver.quit());
    });
});
describe("Test 6", function() {
    
    this.timeout(30000);

    it ("Should show alert - email is not valid!", async () => {
        let driver = await new Builder().forBrowser("chrome").build();
        await driver.get("https://public-relations-si.herokuapp.com/");
        
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[1]/div[2]/div[1]/a[8]')).click();

        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/form/input[1]')).sendKeys("Ime");
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/form/input[2]')).sendKeys("Prezime");
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/form/input[3]')).sendKeys("probni.etf.unsa.ba");
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/form/textarea')).sendKeys("Ovo ne treba da radi!");

        await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div[2]/form/span')), 15000);
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/form/span')).getText()
            .then(textValue => { assert.equal('Email is not valid!', textValue); }).then(() => driver.quit());
    });
});
describe("Test 7", function() {
    
    this.timeout(30000);

    it ("Should show alert - question must be 8 characters long!", async () => {
        let driver = await new Builder().forBrowser("chrome").build();
        await driver.get("https://public-relations-si.herokuapp.com/");
        
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[1]/div[2]/div[1]/a[8]')).click();

        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/form/input[1]')).sendKeys("Ime");
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/form/input[2]')).sendKeys("Prezime");
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/form/input[3]')).sendKeys("probni@etf.unsa.ba");
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/form/textarea')).sendKeys("kratko");

        await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div[2]/form/span')), 15000);
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/form/span')).getText()
            .then(textValue => { assert.equal('Question must be 8 characters long!', textValue); }).then(() => driver.quit());
    });
});
describe("Test 8", function() {
    
    this.timeout(30000);

    it ("Should show the 'Comment Review' in the table for a logged in user and deny access for others", async () => {

        let driver = await new Builder().forBrowser("chrome").build();
        await driver.get("https://public-relations-si.herokuapp.com/commentReview");
        // Trebalo bi prikazati tekst Zabranjen pristup
        await (await driver.findElement(By.xpath('/html/body/div/div/div[2]/p'))).getText()
            .then(textValue => {assert.equal('Zabranjen pristup', textValue)});

        await driver.get("https://public-relations-si.herokuapp.com");
        await driver.findElement(By.xpath('/html/body/div/div/div[1]/div[2]/div[2]/a')).click();

        // Login:
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/form/input[1]')).sendKeys("dzavid");
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/form/input[2]')).sendKeys("password");
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/form/button')).click();

        // Ulogovao se, sad treba provjerit postojanje teksta "Review Comments" za ulogovanog korisnika
        await driver.wait(until.elementLocated(By.className('notification-bell__bow')), 30000);
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[1]/div[2]/div[1]/a[3]')).getText()
        .then(textValue => { assert.equal('Review Comments', textValue); }).then(() => driver.quit());
    });
});
