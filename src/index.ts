import Truck from "./classes/Truck.js";
import Car from "./classes/Car.js";
import Motorbike from "./classes/Motorbike.js";
import Wheel from "./classes/Wheel.js";
import Cli from "./classes/Cli.js";

const cli = new Cli();

if (cli.vehicles.length === 0) {
  const car1 = new Car(
    Cli.generateVin(),
    "blue",
    "Toyota",
    "Camry",
    2021,
    3000,
    130,
    [new Wheel(), new Wheel(), new Wheel(), new Wheel()]
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

  const motorbike1 = new Motorbike(
    Cli.generateVin(),
    "black",
    "Harley Davidson",
    "Sportster",
    2021,
    500,
    125,
    [new Wheel(), new Wheel()]
  );

  cli.addVehicle(car1);
  cli.addVehicle(truck1);
  cli.addVehicle(motorbike1);
}

cli.startCli();
