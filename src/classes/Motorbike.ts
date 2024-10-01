// Importing Vehicle and Wheel classes
import Vehicle from './Vehicle.js';
import Wheel from './Wheel.js';

// The Motorbike class extends the Vehicle class
class Motorbike extends Vehicle {
  wheels: Wheel[];

  // Create a constructor that accepts the properties of the Motorbike class
  constructor(
    vin: string,
    color: string,
    make: string,
    model: string,
    year: number,
    weight: number,
    topSpeed: number,
    wheels: Wheel[]
  ) {
    // Call the constructor of the parent class, Vehicle
    super(vin, color, make, model, year, weight, topSpeed);

    // Check if the wheels array has 2 elements, otherwise create 2 new default Wheel objects
    this.wheels = wheels.length === 2 ? wheels : [new Wheel(), new Wheel()];
  }

  // Implement the wheelie method
  wheelie(): void {
    console.log(`Motorbike ${this.make} ${this.model} is doing a wheelie!`);
  }

  // Override the printDetails method from the Vehicle class
  override printDetails(): void {
    // Call the printDetails method of the parent class
    super.printDetails();

    // Log the details of the Motorbike
    console.log(
      `Wheels: ${this.wheels
        .map((wheel, index) => `Wheel ${index + 1}: ${wheel.getTireBrand}, Diameter: ${wheel.getDiameter}`)
        .join("; ")}`
    );
  }
}

export default Motorbike;
