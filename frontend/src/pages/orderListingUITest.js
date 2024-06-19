const { Builder, By, until } = require("selenium-webdriver");
// const { expect } = require("jest");

async function orderListingUITest() {
  // Launch the browser
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Navigate to the OrderListing page
    await driver.get("http://localhost:3000/orders");

    // Wait for the order listing section to be loaded
    await driver.wait(until.elementLocated(By.className("order-list")), 10000);

    // Assert that the order listing section is displayed
    // const orderListingSection = await driver.findElement(By.className("order-list"));
    // expect(await orderListingSection.isDisplayed()).toBeTruthy();

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
orderListingUITest();
