## Lori's Vehicle Management CLI

## Description
This project is a Command Line Interface (CLI) application written in TypeScript that allows users to create, save, and manage different types of vehicles. Users can create Cars, Trucks, and Motorbikes, perform actions on them, and save the data to a file for later retrieval.

## Table of Contents
- [Visuals](#visuals)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Support](#support)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [Authors/Acknowledgements](#authors-and-acknowledgment)
- [License](#license)


## Visuals
Please follow this link for a walk-through on how to use the command-line tool: https://drive.google.com/file/d/1EqczQxJsUu1bPsnIIdk77-IebqwZ0sN1/view?usp=sharing

Here's an example of how the interactive prompts look in the terminal:

![alt text](<Screenshot 2024-09-30 231957.png>)

Each option takes the user through additional prompts to manage or perform actions on their vehicles.

## Prerequisites
- Node.js: Make sure you have Node.js installed (version 14 or higher is recommended).
npm:
- Node Package Manager (npm), which comes with Node.js, is required to install project dependencies.

## Installation
1. Clone the Repository:
```md
git clone <repository-url>
cd <repository-directory>
```
2. Install Dependencies:
```md
npm install
or
npm i
```
3. Start the Project:
```md
npm start
```

## Usage
To start the CLI application, run the following command:
```md
npm start
```
Upon running the command, you will be presented with an interactive prompt asking if you want to create a new vehicle or select an existing one. After creating a vehicle, you can perform actions such as starting, accelerating, decelerating, or printing details. All vehicles are saved to a JSON file to persist data between sessions.

<b>Example Usage:</b>
- Create a new vehicle by selecting the appropriate vehicle type.
- Perform actions on an existing vehicle, such as:
    - Print vehicle details
    - Accelerate or decelerate
    - Special actions like performing a wheelie (for Motorbikes) or displaying towing capacity (for Trucks).

## Support
If you need help using this project or encounter issues, please reach out via the following options:

GitHub Issues: Report bugs or request features by opening an issue in the GitHub repository.
Email: Contact me at lbelovin@gmail.com for any inquiries.
You can also find more of my work at [https://github.com/omgxlori](https://github.com/omgxlori)

## Roadmap (no pun intended)
Here are some ideas for future releases:

- Add Support for New Vehicle Types: Adding new vehicle types such as Buses, Electric Vehicles, etc.
- Database Integration: Use a proper database instead of a JSON file for storing vehicle data.
- Improved UI: Create a graphical user interface (GUI) for easier navigation and management.

## Contributing
Contributions are welcome! Here are the steps to get started:

1. Fork the repository on GitHub.
2. Create a new branch:
```md
git checkout -b feature/your-feature
```
3. Make your changes, then commit:
```md
git commit -m 'Add your feature'
```
4. Push to your branch:
```md
git push origin feature/your-feature
```
5. Create a Pull Request on GitHub.

Please make sure to add tests for new functionality and ensure your code is linted and formatted consistently.

## Authors and acknowledgment
This project was created by Lori Morra. Thanks to all contributors and supporters of this project. Special thanks to the developers behind Inquirer.js and Node.js for providing the tools to make this possible.

## License
This project does not have an official license at the moment. If you have questions about using this code, please contact the author.