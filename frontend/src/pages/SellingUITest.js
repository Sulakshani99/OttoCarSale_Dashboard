const { Builder, By, Key, until } = require("selenium-webdriver");

async function sellingPageUITest() {
 
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    
    await driver.get("http://localhost:3000/selling");

    
    await driver.wait(until.elementLocated(By.className("main-section")), 10000);

    console.log("UI test for Selling page passed!");
  } catch (error) {
    console.error("UI test for Selling page failed:", error);
  } finally {
    
    await driver.quit();
  }
}


sellingPageUITest();
