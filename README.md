# example-employee-db

![This project's protection license.](https://img.shields.io/badge/license-MIT-blue)

## Table of Contents

- [Description](#Description)
- [Installation](#Installation)
- [Usage](#Usage)
- [Test Instructions](#Test_Instructions)
- [License](#License)
- [Questions?](#Questions?)

## Description

My very own demonstrative example employee database terminal application. Made using the criteria from Module 12 of my edX Web Development bootcamp. I made it as compact as possible within my tight time limit I had.
The application allows users to build, access, and modify an example database of employees and their associated data.

Credit goes to fellow student ![Mo](https://github.com/bootcamp-Mo) for allowing me to use and modify their seeds file.

## Installation

Download the project via your preferred means, then drag it into it's own directory on your machine.

## Usage

0. Have a working instance of MySQL on your local machine, specifically that uses "root" permissions and username.
1. Create your own .env file using .env.example as an example, but inputting your own password inside the necessary fields inside your .env.
2. Boot your bash terminal from the project's installed directory.
3. Log into your mySQL via inputting the command "mysql -u root -p".
4. Input and enter the command "source ./db/schema.sql", then input and enter the command "source ./db/seeds.sql", then exit mySQL by inputting and entering "\q".
5. Input and enter the command "npm i", then input and enter the command "node server.js" to run the program.
6. Follow the onscreen prompts to interact with the program.

## Demonstration

![A gif demonstrating the unmatched power of Noah's Example Employee Database.](./demonstration.gif)

## License

This project is protected under the MIT License.

## Questions?

Reach out to me either on [GitHub](https://github.com/NoahJRalph) or by [Email](mailto:NoahJRalph@gmail.com).
