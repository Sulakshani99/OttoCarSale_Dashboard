const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");

async function truckListingUITest() {
  // Launch the browser
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Navigate to the TruckListing page
    await driver.get("http://localhost:3000/trucks");

    
    // Add more assertions as needed

    console.log("UI test passed!");
  } catch (error) {
    console.error("UI test failed:", error);
  } finally {
    // Close the browser
    await driver.quit();
  }
}

// Run the UI test
truckListingUITest();
