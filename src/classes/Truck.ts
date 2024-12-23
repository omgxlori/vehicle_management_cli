import Vehicle from "./Vehicle.js";
import Wheel from "./Wheel.js";
import AbleToTow from "../interfaces/AbleToTow.js";

class Truck extends Vehicle implements AbleToTow {
  wheels: Wheel[];
  towingCapacity: number;

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
    super(vin, color, make, model, year, weight, topSpeed);

    // Ensure truck has exactly 4 wheels; otherwise, create defaults
    this.wheels =
      wheels.length === 4
        ? wheels
        : [new Wheel(), new Wheel(), new Wheel(), new Wheel()];

    this.towingCapacity = towingCapacity;
  }

  // Towing logic with improved messaging
  tow(vehicle: Vehicle): void {
    if (vehicle.vin === this.vin) {
      console.log("❌ A truck cannot tow itself.");
      return;
    }

    const { make, model, weight } = vehicle;

    if (weight <= this.towingCapacity) {
      console.log(
        `✅ The ${this.make} ${this.model} is towing the ${make} ${model} successfully!`
      );
    } else {
      console.log(
        `❌ The ${make} ${model} is too heavy to be towed by the ${this.make} ${this.model}.`
      );
    }
  }

  // Overridden printDetails with additional truck info
  override printDetails(): void {
    super.printDetails();
    console.log(`Towing Capacity: ${this.towingCapacity} kg`);
    console.log(
      `Wheels: ${this.wheels
        .map((wheel, i) => `Wheel ${i + 1}: ${wheel.tireBrandValue || "Default"}`)
        .join(", ")}`
    );
  }
}

export default Truck;
