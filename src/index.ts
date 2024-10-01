// Importing necessary classes
import Truck from "./classes/Truck.js";
import Car from "./classes/Car.js";
import Motorbike from "./classes/Motorbike.js";
import Wheel from "./classes/Wheel.js";
import Cli from "./classes/Cli.js";

// Create an instance of Cli, which will load vehicles from the JSON file
const cli = new Cli();

// Add initial vehicles only if the CLI is empty to avoid duplicates
if (cli.vehicles.length === 0) {
  // Create initial vehicles
  const car1 = new Car(
    Cli.generateVin(),
    'blue',
    'Toyota',
    'Camry',
    2021,
    3000,
    130,
    [new Wheel(), new Wheel(), new Wheel(), new Wheel()] // Provide default wheels
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
    10000
  );

  const motorbike1Wheels = [new Wheel(17, "Michelin"), new Wheel(17, "Michelin")];
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

  // Use addVehicle() method to add vehicles without duplicates
  cli.addVehicle(car1);
  cli.addVehicle(truck1);
  cli.addVehicle(motorbike1);
}

// Start the CLI
cli.startCli();
