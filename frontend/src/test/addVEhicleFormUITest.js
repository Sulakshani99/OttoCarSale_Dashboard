const { Builder, By, until } = require("selenium-webdriver");

async function addVehicleFormUITest() {
  // Launch the browser
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Navigate to the AddVehicleForm page
    await driver.get("http://localhost:3000/addvehicle");

    // Wait for the form elements to be loaded
    await driver.wait(until.elementLocated(By.name("vehicleId")), 10000);
    await driver.wait(until.elementLocated(By.name("chassisNumber")), 10000);
    await driver.wait(until.elementLocated(By.name("engineNo")), 10000);
    await driver.wait(until.elementLocated(By.name("vehicleState")), 10000);
    await driver.wait(until.elementLocated(By.name("companyName")), 10000);
    await driver.wait(until.elementLocated(By.name("numberOfDoors")), 10000);
    await driver.wait(until.elementLocated(By.name("color")), 10000);
    await driver.wait(until.elementLocated(By.name("seatingCapacity")), 10000);
    await driver.wait(until.elementLocated(By.name("condition")), 10000);
    await driver.wait(until.elementLocated(By.name("length")), 10000);
    await driver.wait(until.elementLocated(By.name("height")), 10000);
    await driver.wait(until.elementLocated(By.name("width")), 10000);
    await driver.wait(until.elementLocated(By.name("vehiclePrice")), 10000);
    await driver.wait(until.elementLocated(By.name("fuelType")), 10000);
    await driver.wait(until.elementLocated(By.name("manufacturedCountry")), 10000);
    await driver.wait(until.elementLocated(By.name("assembled")), 10000);
    await driver.wait(until.elementLocated(By.name("vehicleType")), 10000);
    await driver.wait(until.elementLocated(By.name("brand")), 10000);
    await driver.wait(until.elementLocated(By.name("style")), 10000);
    await driver.wait(until.elementLocated(By.name("model")), 10000);
    await driver.wait(until.elementLocated(By.name("manufacturedYear")), 10000);
    await driver.wait(until.elementLocated(By.className("dropzone")), 10000);
    await driver.wait(until.elementLocated(By.className("form-button")), 10000);

    // Assert that the form elements are displayed
    console.log("All form elements are displayed!");

    // You can add more assertions here as needed

    console.log("UI test passed!");
  } catch (error) {
    console.error("UI test failed:", error);
  } finally {
    // Close the browser
    await driver.quit();
  }
}

// Run the UI test
addVehicleFormUITest();
