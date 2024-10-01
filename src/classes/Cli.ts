// Importing necessary classes
import inquirer from "inquirer";
import fs from "fs";
import path from "path";
import Truck from "./Truck.js";
import Car from "./Car.js";
import Motorbike from "./Motorbike.js";
import Wheel from "./Wheel.js";

// Defining the path to the vehicles.json file
const VEHICLES_FILE_PATH = path.resolve(process.cwd(), 'vehicles.json');

// Define the Cli class
class Cli {
  vehicles: (Car | Truck | Motorbike)[];
  selectedVehicleVin: string | undefined;
  exit: boolean = false;

  constructor() {
    this.vehicles = this.loadVehicles();
  }

  // Static method to generate a VIN
  static generateVin(): string {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  // Method to load vehicles from the JSON file
  private loadVehicles(): (Car | Truck | Motorbike)[] {
    if (fs.existsSync(VEHICLES_FILE_PATH)) {
      try {
        const data = fs.readFileSync(VEHICLES_FILE_PATH, 'utf-8');
        const vehiclesData = JSON.parse(data);

        return vehiclesData.map((vehicle: any) => {
          switch (vehicle.type) {
            case 'Car':
              return new Car(
                vehicle.vin, vehicle.color, vehicle.make, vehicle.model,
                vehicle.year, vehicle.weight, vehicle.topSpeed,
                vehicle.wheels.map((w: any) => new Wheel(w.diameter, w.tireBrand))
              );
            case 'Truck':
              return new Truck(
                vehicle.vin, vehicle.color, vehicle.make, vehicle.model,
                vehicle.year, vehicle.weight, vehicle.topSpeed,
                vehicle.wheels.map((w: any) => new Wheel(w.diameter, w.tireBrand)),
                vehicle.towingCapacity
              );
            case 'Motorbike':
              return new Motorbike(
                vehicle.vin, vehicle.color, vehicle.make, vehicle.model,
                vehicle.year, vehicle.weight, vehicle.topSpeed,
                vehicle.wheels.map((w: any) => new Wheel(w.diameter, w.tireBrand))
              );
            default:
              throw new Error(`Unknown vehicle type: ${vehicle.type}`);
          }
        });
      } catch (error) {
        console.error("Error reading vehicles file:", error);
        return [];
      }
    } else {
      return [];
    }
  }

  // Method to save vehicles to the JSON file
  public saveVehicles(): void {
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
            diameter: wheel.getDiameter,
            tireBrand: wheel.getTireBrand,
          })),
        };

        if (vehicle instanceof Truck) {
          return { ...commonData, type: 'Truck', towingCapacity: vehicle.towingCapacity };
        } else if (vehicle instanceof Car) {
          return { ...commonData, type: 'Car' };
        } else if (vehicle instanceof Motorbike) {
          return { ...commonData, type: 'Motorbike' };
        }

        throw new Error('Unknown vehicle type');
      });

      fs.writeFileSync(VEHICLES_FILE_PATH, JSON.stringify(vehiclesData, null, 2));
    } catch (error) {
      console.error("Error saving vehicles file:", error);
    }
  }

  // Method to add a new vehicle to the list
  public addVehicle(vehicle: Car | Truck | Motorbike): void {
    if (!this.vehicles.find((v) => v.vin === vehicle.vin)) {
      this.vehicles.push(vehicle);
      this.saveVehicles();
    } else {
      console.log("Vehicle already exists and won't be added again.");
    }
  }

  // Method to get common vehicle prompts
  public getCommonVehiclePrompts(): any[] {
    return [
      {
        type: 'input',
        name: 'color',
        message: 'Enter Color',
      },
      {
        type: 'input',
        name: 'make',
        message: 'Enter Make',
      },
      {
        type: 'input',
        name: 'model',
        message: 'Enter Model',
      },
      {
        type: 'input',
        name: 'year',
        message: 'Enter Year',
        validate: (input: string) => !isNaN(Number(input)) || 'Please enter a valid year',
      },
      {
        type: 'input',
        name: 'weight',
        message: 'Enter Weight',
        validate: (input: string) => !isNaN(Number(input)) || 'Please enter a valid weight',
      },
      {
        type: 'input',
        name: 'topSpeed',
        message: 'Enter Top Speed',
        validate: (input: string) => !isNaN(Number(input)) || 'Please enter a valid top speed',
      },
    ];
  }

  // Method to start the CLI
  public startCli(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'CreateOrSelect',
          message:
            'Would you like to create a new vehicle or perform an action on an existing vehicle?',
          choices: ['Create a new vehicle', 'Select an existing vehicle'],
        },
      ])
      .then((answers) => {
        if (answers.CreateOrSelect === 'Create a new vehicle') {
          this.createVehicle();
        } else {
          this.chooseVehicle();
        }
      });
  }

  // Method to choose an existing vehicle
  public chooseVehicle(): void {
    if (this.vehicles.length === 0) {
      console.log("No vehicles available. Please create a vehicle first.");
      this.startCli();
      return;
    }

    inquirer
      .prompt([
        {
          type: 'list',
          name: 'selectedVehicleVin',
          message: 'Select a vehicle to perform an action on:',
          choices: this.vehicles.map((vehicle) => ({
            name: `${vehicle.constructor.name} - ${vehicle.make} ${vehicle.model} (VIN: ${vehicle.vin})`,
            value: vehicle.vin,
          })),
        },
      ])
      .then((answers: { selectedVehicleVin: string }) => {
        this.selectedVehicleVin = answers.selectedVehicleVin;
        this.performActions();
      });
  }

  // Method to create a vehicle
  public createVehicle(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'vehicleType',
          message: 'Select a vehicle type',
          choices: ['Car', 'Truck', 'Motorbike'],
        },
      ])
      .then((answers: { vehicleType: string }) => {
        if (answers.vehicleType === 'Car') {
          return this.createCar();
        } else if (answers.vehicleType === 'Truck') {
          return this.createTruck();
        } else if (answers.vehicleType === 'Motorbike') {
          return this.createMotorbike();
        }
      });
  }

  // Method to create a car
  public createCar(): void {
    inquirer
      .prompt(this.getCommonVehiclePrompts())
      .then((answers: any) => {
        const car = new Car(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          [new Wheel(), new Wheel(), new Wheel(), new Wheel()] // Default 4 wheels
        );
        this.addVehicle(car);
        this.selectedVehicleVin = car.vin;
        return this.performActions();
      });
  }

  // Method to create a truck
  public createTruck(): void {
    inquirer
      .prompt([
        ...this.getCommonVehiclePrompts(),
        {
          type: 'input',
          name: 'towingCapacity',
          message: 'Enter Towing Capacity',
          validate: (input: string) => !isNaN(Number(input)) || 'Please enter a valid towing capacity',
        },
      ])
      .then((answers: any) => {
        const truck = new Truck(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          [new Wheel(), new Wheel(), new Wheel(), new Wheel()], // Default 4 wheels
          parseInt(answers.towingCapacity)
        );
        this.addVehicle(truck);
        this.selectedVehicleVin = truck.vin;
        return this.performActions();
      });
  }

  // Method to create a motorbike
  public createMotorbike(): void {
    inquirer
      .prompt([
        ...this.getCommonVehiclePrompts(),
        {
          type: 'input',
          name: 'frontWheelDiameter',
          message: 'Enter Front Wheel Diameter',
          validate: (input: string) => !isNaN(Number(input)) || 'Please enter a valid wheel diameter',
        },
        {
          type: 'input',
          name: 'frontWheelBrand',
          message: 'Enter Front Wheel Brand',
        },
        {
          type: 'input',
          name: 'rearWheelDiameter',
          message: 'Enter Rear Wheel Diameter',
          validate: (input: string) => !isNaN(Number(input)) || 'Please enter a valid wheel diameter',
        },
        {
          type: 'input',
          name: 'rearWheelBrand',
          message: 'Enter Rear Wheel Brand',
        },
      ])
      .then((answers: any) => {
        const frontWheel = new Wheel(parseInt(answers.frontWheelDiameter), answers.frontWheelBrand);
        const rearWheel = new Wheel(parseInt(answers.rearWheelDiameter), answers.rearWheelBrand);
        const motorbike = new Motorbike(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          [frontWheel, rearWheel]
        );
        this.addVehicle(motorbike);
        this.selectedVehicleVin = motorbike.vin;
        return this.performActions();
      });
  }

  // Method to perform actions on a vehicle
  public performActions(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'action',
          message: 'Select an action',
          choices: [
            'Print details',
            'Start vehicle',
            'Accelerate 5 MPH',
            'Decelerate 5 MPH',
            'Stop vehicle',
            'Turn right',
            'Turn left',
            'Reverse',
            'Towing Capacity',
            'Wheelie',
            'Select or create another vehicle',
            'Exit',
          ],
        },
      ])
      .then((answers) => {
        const selectedVehicle = this.vehicles.find(
          (vehicle) => vehicle.vin === this.selectedVehicleVin
        );

        if (!selectedVehicle) {
          console.log("Vehicle not found.");
          return;
        }

        switch (answers.action) {
          case 'Print details':
            selectedVehicle.printDetails();
            break;
          case 'Start vehicle':
            selectedVehicle.start();
            break;
          case 'Accelerate 5 MPH':
            selectedVehicle.accelerate(5);
            break;
          case 'Decelerate 5 MPH':
            selectedVehicle.decelerate(5);
            break;
          case 'Stop vehicle':
            selectedVehicle.stop();
            break;
          case 'Turn right':
            selectedVehicle.turn('right');
            break;
          case 'Turn left':
            selectedVehicle.turn('left');
            break;
          case 'Reverse':
            selectedVehicle.reverse();
            break;
          case 'Towing Capacity':
            if (selectedVehicle instanceof Truck) {
              console.log(`Towing Capacity: ${selectedVehicle.towingCapacity} lbs`);
            } else {
              console.log("This action is only available for trucks.");
            }
            break;
          case 'Wheelie':
            if (selectedVehicle instanceof Motorbike) {
              selectedVehicle.wheelie();
            } else {
              console.log("This action is only available for motorbikes.");
            }
            break;
          case 'Select or create another vehicle':
            this.startCli();
            return;
          case 'Exit':
            this.exit = true;
            break;
        }

        if (!this.exit) {
          this.performActions();
        }
      });
  }
}

// Export the Cli class
export default Cli;
