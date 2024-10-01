// Import the Vehicle, Motorbike, Car, Wheel, and AbleToTow classes/interfaces
import Vehicle from './Vehicle.js';
import Motorbike from './Motorbike.js';
import Car from './Car.js';
import Wheel from './Wheel.js';
import AbleToTow from '../interfaces/AbleToTow.js';

// The Truck class should extend the Vehicle class and should implement the AbleToTow interface
class Truck extends Vehicle implements AbleToTow {
  wheels: Wheel[];
  towingCapacity: number;

  // Create a constructor that accepts the properties of the Truck class
  constructor(
    vin: string,
    color: string,
    make: string,
    model: string,
    year: number,
    weight: number,
    topSpeed: number,
    wheels: Wheel[],
    towingCapacity: number
  ) {
    // Call the constructor of the parent class, Vehicle
    super(vin, color, make, model, year, weight, topSpeed);

    // Initialize the wheels
    this.wheels = wheels.length === 4 ? wheels : [new Wheel(), new Wheel(), new Wheel(), new Wheel()];

    // Initialize towing capacity
    this.towingCapacity = towingCapacity;
  }

  // Implement the tow method from the AbleToTow interface
  tow(vehicle: Truck | Motorbike | Car): void {
    const { make, model, weight } = vehicle;

    if (weight <= this.towingCapacity) {
      console.log(`The truck is towing ${make} ${model}.`);
    } else {
      console.log(`${make} ${model} is too heavy to be towed by this truck.`);
    }
  }

  // Override the printDetails method from the Vehicle class
  override printDetails(): void {
    super.printDetails();
    console.log(`Towing Capacity: ${this.towingCapacity} kg`);
    console.log(
      `Wheels: ${this.wheels
        .map((wheel, index) => `Wheel ${index + 1}: ${wheel.getTireBrand}, Diameter: ${wheel.getDiameter}`)
        .join("; ")}`
    );
  }
}

export default Truck;
