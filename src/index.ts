// Importing necessary classes
import Truck from "./classes/Truck.js";
import Car from "./classes/Car.js";
import Motorbike from "./classes/Motorbike.js";
import Wheel from "./classes/Wheel.js";
import Cli from "./classes/Cli.js";

// Create an instance of Cli
const cli = new Cli();

// Add initial vehicles only if the CLI has no vehicles
if (cli.vehicles.length === 0) {
  try {
    // Create initial vehicles
    const car1 = new Car(
      Cli.generateVin(),
      "blue",
      "Toyota",
      "Camry",
      2021,
      3000,
      130,
      [new Wheel(), new Wheel(), new Wheel(), new Wheel()] // Default wheels
    );

    const truck1 = new Truck(
      Cli.generateVin(),
      "red",
      "Ford",
      "F-150",
      2021,
      5000,
      120,
      [new Wheel(), new Wheel(), new Wheel(), new Wheel()],
      10000 // Towing capacity
    );

    const motorbike1Wheels = [
      new Wheel(17, "Michelin"),
      new Wheel(17, "Michelin"),
    ];
    const motorbike1 = new Motorbike(
      Cli.generateVin(),
      "black",
      "Harley Davidson",
      "Sportster",
      2021,
      500,
      125,
      motorbike1Wheels
    );

    // Add vehicles to the CLI instance
    cli.addVehicle(car1);
    cli.addVehicle(truck1);
    cli.addVehicle(motorbike1);
  } catch (error) {
    console.error("Error initializing vehicles:", error);
  }
}

// Start the CLI
cli.startCli();
