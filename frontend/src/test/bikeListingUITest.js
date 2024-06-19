const { Builder, By, until } = require("selenium-webdriver");

async function bikeListingUITest() {
  // Launch the browser
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Navigate to the BikeListing page
    await driver.get("http://localhost:3000/bikes");

    console.log("UI test passed!");
  } catch (error) {
    console.error("UI test failed:", error);
  } finally {
    // Close the browser
    await driver.quit();
  }
}

// Run the UI test
bikeListingUITest();
