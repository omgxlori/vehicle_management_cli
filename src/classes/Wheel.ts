// Wheel class that defines the properties of a wheel
class Wheel {
  // Declare properties of the Wheel class using private access modifier
  private diameter: number;
  private tireBrand: string;

  // Constructor for the Wheel class
  constructor(diameter: number = 18, tireBrand: string = "GoodYear") {
    this.diameter = diameter;
    this.tireBrand = tireBrand;
  }

  // Getter method for the diameter property
  get diameterValue(): number {
    return this.diameter;
  }

  // Setter method for the diameter property
  set diameterValue(newDiameter: number) {
    if (newDiameter > 0) {
      this.diameter = newDiameter;
    } else {
      console.error("Diameter must be a positive number.");
    }
  }

  // Getter method for the tireBrand property
  get tireBrandValue(): string {
    return this.tireBrand;
  }

  // Setter method for the tireBrand property
  set tireBrandValue(newTireBrand: string) {
    if (newTireBrand.trim().length > 0) {
      this.tireBrand = newTireBrand;
    } else {
      console.error("Tire brand must be a non-empty string.");
    }
  }

  // Method to update both diameter and tire brand
  updateWheel(diameter: number, tireBrand: string): void {
    if (diameter > 0 && tireBrand.trim().length > 0) {
      this.diameter = diameter;
      this.tireBrand = tireBrand;
    } else {
      console.error("Invalid values. Diameter must be positive, and tire brand must be non-empty.");
    }
  }
}

// Export the Wheel class
export default Wheel;
