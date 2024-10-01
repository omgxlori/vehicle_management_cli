// Importing Vehicle and Wheel classes
import Vehicle from './Vehicle.js';
import Wheel from './Wheel.js';

// Car class that extends Vehicle class
class Car extends Vehicle {
  wheels: Wheel[];

  // Constructor for the Car class
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

    // Check if the wheels array has 4 elements
    // If not, create 4 new Wheel objects
    // Otherwise, use the provided wheels array
    this.wheels = wheels.length === 4 ? wheels : [new Wheel(), new Wheel(), new Wheel(), new Wheel()];
  }

  // Override the printDetails method from the Vehicle class
  override printDetails(): void {
    // Call the printDetails method of the parent class, Vehicle
    super.printDetails();

    // Print details of the wheels
    this.wheels.forEach((wheel, index) => {
      console.log(`Wheel ${index + 1}: ${wheel.getDiameter} inch with a ${wheel.getTireBrand} tire`);
    });
  }
}

// Export the Car class as the default export
export default Car;
