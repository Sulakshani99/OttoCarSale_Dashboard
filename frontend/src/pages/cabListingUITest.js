const { Builder, By, until } = require("selenium-webdriver");

async function cabListingUITest() {
 
  let driver = await new Builder().forBrowser("chrome").build();

  try {
 
    await driver.get("http://localhost:3000/cabs");

    console.log("UI test passed!");
  } catch (error) {
    console.error("UI test failed:", error);
  } finally {
    // Close the browser
    await driver.quit();
  }
}

// Run the UI test
cabListingUITest();
