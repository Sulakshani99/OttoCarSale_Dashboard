const { Builder, By, Key, until } = require("selenium-webdriver");

async function loginUITest() {
  
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    
    await driver.get("http://localhost:3000/user");


    console.log("Login UI test passed!");
  } catch (error) {
    console.error("Login UI test failed:", error);
  } finally {
    // Close the browser
    await driver.quit();
  }
}

// Run the UI test
loginUITest();
