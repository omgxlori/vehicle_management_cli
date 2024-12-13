// importing classes from other files
import inquirer from "inquirer";
import fs from "fs";
import path from "path";
import Truck from "./Truck.js";
import Car from "./Car.js";
import Motorbike from "./Motorbike.js";
import Wheel from "./Wheel.js";

const asciiArt = `
 __      __    _      _        _                                         
 \\ \\    / /   | |    (_)      | |                                        
  \\ \\  / /___ | |__   _   ___ | |  ___                                   
   \\ \\/ // _ \\| '_ \\ | | / __|| | / _ \\                                  
    \\  /|  __/| | | || || (__ | ||  __/                                  
     \\/  \\___||_| |_||_| \\___||_| \\___|                                  
                                                                         
  __  __                                                            _    
 |  \\/  |                                                          | |   
 | \\  / |  __ _  _ __    __ _   __ _   ___  _ __ ___    ___  _ __  | |_  
 | |\\/| | / _\` || '_ \\  / _\` | / _\` | / _ \\| '_ \` _ \\  / _ \\| '_ \\ | __| 
 | |  | || (_| || | | || (_| || (_| ||  __/| | | | | ||  __/| | | || |_  
 |_|  |_| \\__,_||_| |_| \\__,_| \\__, | \\___||_| |_| |_| \\___||_| |_| \\__| 
                                __/ |                                    
                               |___/                                     
`;

class Cli {
  vehicles: (Car | Truck | Motorbike)[];
  selectedVehicleVin: string | undefined;
  exit: boolean = false;
  private readonly VEHICLES_FILE_PATH = path.resolve("vehicles.json");

  constructor() {
    this.vehicles = this.loadVehicles();
  }

  // Load vehicles from a JSON file
  private loadVehicles(): (Car | Truck | Motorbike)[] {
    if (fs.existsSync(this.VEHICLES_FILE_PATH)) {
      try {
        const data = fs.readFileSync(this.VEHICLES_FILE_PATH, "utf-8");
        const vehiclesData = JSON.parse(data);
        return vehiclesData.map((vehicle: any) => {
          switch (vehicle.type) {
            case "Car":
              return new Car(
                vehicle.vin,
                vehicle.color,
                vehicle.make,
                vehicle.model,
                vehicle.year,
                vehicle.weight,
                vehicle.topSpeed,
                vehicle.wheels.map((w: any) => new Wheel(w.diameterValue, w.tireBrandValue))
              );
            case "Truck":
              return new Truck(
                vehicle.vin,
                vehicle.color,
                vehicle.make,
                vehicle.model,
                vehicle.year,
                vehicle.weight,
                vehicle.topSpeed,
                vehicle.wheels.map((w: any) => new Wheel(w.diameterValue, w.tireBrandValue)),
                vehicle.towingCapacity
              );
            case "Motorbike":
              return new Motorbike(
                vehicle.vin,
                vehicle.color,
                vehicle.make,
                vehicle.model,
                vehicle.year,
                vehicle.weight,
                vehicle.topSpeed,
                vehicle.wheels.map((w: any) => new Wheel(w.diameterValue, w.tireBrandValue))
              );
            default:
              throw new Error(`Unknown vehicle type: ${vehicle.type}`);
          }
        });
      } catch (error) {
        console.error("Error reading vehicles file:", error);
        return [];
      }
    }
    return [];
  }

  // Save vehicles to a JSON file
  private saveVehicles(): void {
    try {
      const vehiclesData = this.vehicles.map((vehicle) => {
        const commonData = {
          vin: vehicle.vin,
          color: vehicle.color,
          make: vehicle.make,
          model: vehicle.model,
          year: vehicle.year,
          weight: vehicle.weight,
          topSpeed: vehicle.topSpeed,
          wheels: vehicle.wheels.map((wheel: Wheel) => ({
            diameterValue: wheel.diameterValue,
            tireBrandValue: wheel.tireBrandValue,
          })),
        };

        if (vehicle instanceof Truck) {
          return { ...commonData, type: "Truck", towingCapacity: vehicle.towingCapacity };
        } else if (vehicle instanceof Car) {
          return { ...commonData, type: "Car" };
        } else if (vehicle instanceof Motorbike) {
          return { ...commonData, type: "Motorbike" };
        }

        throw new Error("Unknown vehicle type");
      });

      fs.writeFileSync(this.VEHICLES_FILE_PATH, JSON.stringify(vehiclesData, null, 2));
    } catch (error) {
      console.error("Error saving vehicles file:", error);
    }
  }

  addVehicle(vehicle: Car | Truck | Motorbike): void {
    const existingVehicle = this.vehicles.find((v) => v.vin === vehicle.vin);
    if (existingVehicle) {
      console.log(`Vehicle with VIN ${vehicle.vin} already exists.`);
      return;
    }
    this.vehicles.push(vehicle);
    this.saveVehicles(); // Save to file
    console.log(
      `Vehicle (${vehicle.constructor.name} - ${vehicle.make} ${vehicle.model}) added successfully.`
    );
  }

  // Method to start the CLI
  startCli(): void {
    console.log(asciiArt);

    inquirer
      .prompt([
        {
          type: "list",
          name: "CreateOrSelect",
          message:
            "Would you like to create a new vehicle or perform an action on an existing vehicle?",
          choices: ["Create a new vehicle", "Select an existing vehicle"],
        },
      ])
      .then((answers) => {
        if (answers.CreateOrSelect === "Create a new vehicle") {
          this.createVehicle();
        } else {
          this.chooseVehicle();
        }
      });
  }

  // Method to create a vehicle
  private createVehicle(): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "vehicleType",
          message: "What type of vehicle would you like to create?",
          choices: ["Car", "Truck", "Motorbike"],
        },
      ])
      .then((answers) => {
        switch (answers.vehicleType) {
          case "Car":
            this.createCar();
            break;
          case "Truck":
            this.createTruck();
            break;
          case "Motorbike":
            this.createMotorbike();
            break;
        }
      });
  }

  // Method to create a car
  private createCar(): void {
    inquirer
      .prompt([
        { type: "input", name: "color", message: "Enter Color" },
        { type: "input", name: "make", message: "Enter Make" },
        { type: "input", name: "model", message: "Enter Model" },
        { type: "input", name: "year", message: "Enter Year" },
        { type: "input", name: "weight", message: "Enter Weight" },
        { type: "input", name: "topSpeed", message: "Enter Top Speed" },
      ])
      .then((answers) => {
        const car = new Car(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          [new Wheel(), new Wheel(), new Wheel(), new Wheel()]
        );
        this.addVehicle(car);
        this.startCli();
      });
  }

  // Method to create a truck
  private createTruck(): void {
    inquirer
      .prompt([
        { type: "input", name: "color", message: "Enter Color" },
        { type: "input", name: "make", message: "Enter Make" },
        { type: "input", name: "model", message: "Enter Model" },
        { type: "input", name: "year", message: "Enter Year" },
        { type: "input", name: "weight", message: "Enter Weight" },
        { type: "input", name: "topSpeed", message: "Enter Top Speed" },
        { type: "input", name: "towingCapacity", message: "Enter Towing Capacity" },
      ])
      .then((answers) => {
        const truck = new Truck(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          [new Wheel(), new Wheel(), new Wheel(), new Wheel()],
          parseInt(answers.towingCapacity)
        );
        this.addVehicle(truck);
        this.startCli();
      });
  }

  // Method to create a motorbike
  private createMotorbike(): void {
    inquirer
      .prompt([
        { type: "input", name: "color", message: "Enter Color" },
        { type: "input", name: "make", message: "Enter Make" },
        { type: "input", name: "model", message: "Enter Model" },
        { type: "input", name: "year", message: "Enter Year" },
        { type: "input", name: "weight", message: "Enter Weight" },
        { type: "input", name: "topSpeed", message: "Enter Top Speed" },
        { type: "input", name: "frontWheelDiameter", message: "Enter Front Wheel Diameter" },
        { type: "input", name: "frontWheelBrand", message: "Enter Front Wheel Brand" },
        { type: "input", name: "rearWheelDiameter", message: "Enter Rear Wheel Diameter" },
        { type: "input", name: "rearWheelBrand", message: "Enter Rear Wheel Brand" },
      ])
      .then((answers) => {
        const motorbike = new Motorbike(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          [
            new Wheel(parseInt(answers.frontWheelDiameter), answers.frontWheelBrand),
            new Wheel(parseInt(answers.rearWheelDiameter), answers.rearWheelBrand),
          ]
        );
        this.addVehicle(motorbike);
        this.startCli();
      });
  }

  // Method to choose a vehicle
  private chooseVehicle(): void {
    if (this.vehicles.length === 0) {
      console.log("No vehicles available. Please create a vehicle first.");
      this.startCli();
      return;
    }

    inquirer
      .prompt([
        {
          type: "list",
          name: "selectedVehicleVin",
          message: "Select a vehicle to perform an action on:",
          choices: this.vehicles.map((vehicle) => ({
            name: `${vehicle.constructor.name} - ${vehicle.make} ${vehicle.model} (VIN: ${vehicle.vin})`,
            value: vehicle.vin,
          })),
        },
      ])
      .then((answers) => {
        this.selectedVehicleVin = answers.selectedVehicleVin;
        this.performActions();
      });
  }

  // Method to perform actions on a vehicle
  private performActions(): void {
    const selectedVehicle = this.vehicles.find(
      (vehicle) => vehicle.vin === this.selectedVehicleVin
    );

    if (!selectedVehicle) {
      console.log("Vehicle not found.");
      this.startCli();
      return;
    }

    inquirer
      .prompt([
        {
          type: "list",
          name: "action",
          message: "Select an action",
          choices: [
            "Print details",
            "Start vehicle",
            "Accelerate 5 MPH",
            "Decelerate 5 MPH",
            "Stop vehicle",
            "Turn right",
            "Turn left",
            "Reverse",
            "Return to main menu",
            "Exit",
          ],
        },
      ])
      .then((answers) => {
        switch (answers.action) {
          case "Print details":
            selectedVehicle.printDetails();
            break;
          case "Start vehicle":
            selectedVehicle.start();
            break;
          case "Accelerate 5 MPH":
            selectedVehicle.accelerate(5);
            break;
          case "Decelerate 5 MPH":
            selectedVehicle.decelerate(5);
            break;
          case "Stop vehicle":
            selectedVehicle.stop();
            break;
          case "Turn right":
            selectedVehicle.turn("right");
            break;
          case "Turn left":
            selectedVehicle.turn("left");
            break;
          case "Reverse":
            selectedVehicle.reverse();
            break;
          case "Return to main menu":
            this.startCli();
            return;
          case "Exit":
            this.exit = true;
            console.log("Goodbye!");
            return;
        }

        if (!this.exit) {
          this.performActions();
        }
      });
  }

// Static method to generate a VIN
public static generateVin(): string {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}
}

// Export the Cli class
export default Cli;
