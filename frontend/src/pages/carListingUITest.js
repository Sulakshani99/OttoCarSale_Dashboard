const { Builder, By, until } = require("selenium-webdriver");

async function carListingUITest() {
  // Launch the browser
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Navigate to the CarListing page
    await driver.get("http://localhost:3000/cars");

    // Wait for the car listing section to be loaded
    await driver.wait(until.elementLocated(By.className("selling__car-list")), 10000);

    // Assert that the car listing section is displayed
    // const carListingSection = await driver.findElement(By.className("selling__car-list"));
    // expect(await carListingSection.isDisplayed()).toBeTruthy();

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
carListingUITest();
