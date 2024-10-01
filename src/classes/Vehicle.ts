// Import Driveable interface
import Driveable from '../interfaces/Driveable.js';

// Vehicle class that implements Driveable interface
class Vehicle implements Driveable {
  // Declare properties of the Vehicle class
  vin: string;
  color: string;
  make: string;
  model: string;
  year: number;
  weight: number;
  topSpeed: number;
  started: boolean;
  currentSpeed: number;

  // Updated Constructor for the Vehicle class
  constructor(
    vin: string,
    color: string,
    make: string,
    model: string,
    year: number,
    weight: number,
    topSpeed: number
  ) {
    this.vin = vin;
    this.color = color;
    this.make = make;
    this.model = model;
    this.year = year;
    this.weight = weight;
    this.topSpeed = topSpeed;
    this.started = false;
    this.currentSpeed = 0;
  }

  // Method to print vehicle details
  printDetails(): void {
    console.log(`VIN: ${this.vin}`);
    console.log(`Make: ${this.make}`);
    console.log(`Model: ${this.model}`);
    console.log(`Year: ${this.year}`);
    console.log(`Weight: ${this.weight} kg`);
    console.log(`Top Speed: ${this.topSpeed} km/h`);
    console.log(`Color: ${this.color}`);
    console.log(`Vehicle started: ${this.started}`);
    console.log(`Vehicle current speed: ${this.currentSpeed} mph`);
  }

  // Method to start the vehicle
  start(): void {
    this.started = true;
    console.log('Vehicle started');
  }

  // Method to accelerate the vehicle
  accelerate(change: number): void {
    if (this.started) {
      this.currentSpeed += change;
      if (this.currentSpeed > this.topSpeed) {
        this.currentSpeed = this.topSpeed;
      }
      console.log(`Vehicle accelerated to ${this.currentSpeed} mph`);
    } else {
      console.log('Start the vehicle first');
    }
  }

  // Method to decelerate the vehicle
  decelerate(change: number): void {
    if (this.started) {
      this.currentSpeed -= change;
      if (this.currentSpeed < 0) {
        this.currentSpeed = 0;
      }
      console.log(`Vehicle decelerated to ${this.currentSpeed} mph`);
    } else {
      console.log('Start the vehicle first');
    }
  }

  // Method to stop the vehicle
  stop(): void {
    this.currentSpeed = 0;
    this.started = false;
    console.log('Vehicle stopped');
  }

  // Method to turn the vehicle
  turn(direction: string): void {
    if (this.started) {
      console.log(`Vehicle turned ${direction}`);
    } else {
      console.log('Start the vehicle first');
    }
  }

  // Method to reverse the vehicle
  reverse(): void {
    if (this.started) {
      console.log('Vehicle reversed');
    } else {
      console.log('Start the vehicle first');
    }
  }
}

// Export the Vehicle class
export default Vehicle;
