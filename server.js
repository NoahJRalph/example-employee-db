require('dotenv').config();
const mysql = require(`mysql2`);
const inquirer = require(`inquirer`);
const fs = require(`fs`);
const db = mysql.createConnection({
    host: `localhost`,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: `employee_db`
});
const viewAllDepartments = () => {
    db.query(`SELECT * FROM departments ORDER BY name_id ASC;`, function (err, results) {
        console.log(`\n`);
        console.table(results);
})};
const viewAllRoles = () => {
    db.query(`SELECT * FROM roles ORDER BY title ASC;`, function (err, results) {
        console.log(`\n`);
        console.table(results);
})};
const viewAllEmployees = () => {
    db.query(`SELECT * FROM employees ORDER BY last_name ASC;`, function (err, results) {
        console.log(`\n`);
        console.table(results);
})};
const init = async () => {
    console.clear();
    console.log(`Connected! Welcome to the:
    ███████╗███╗   ███╗██████╗ ██╗      ██████╗ ██╗   ██╗███████╗███████╗
    ██╔════╝████╗ ████║██╔══██╗██║     ██╔═══██╗╚██╗ ██╔╝██╔════╝██╔════╝
    █████╗  ██╔████╔██║██████╔╝██║     ██║   ██║ ╚████╔╝ █████╗  █████╗  
    ██╔══╝  ██║╚██╔╝██║██╔═══╝ ██║     ██║   ██║  ╚██╔╝  ██╔══╝  ██╔══╝  
    ███████╗██║ ╚═╝ ██║██║     ███████╗╚██████╔╝   ██║   ███████╗███████╗
    ╚══════╝╚═╝     ╚═╝╚═╝     ╚══════╝ ╚═════╝    ╚═╝   ╚══════╝╚══════╝
                                                                         
    ██████╗  █████╗ ████████╗ █████╗ ██████╗  █████╗ ███████╗███████╗    
    ██╔══██╗██╔══██╗╚══██╔══╝██╔══██╗██╔══██╗██╔══██╗██╔════╝██╔════╝    
    ██║  ██║███████║   ██║   ███████║██████╔╝███████║███████╗█████╗      
    ██║  ██║██╔══██║   ██║   ██╔══██║██╔══██╗██╔══██║╚════██║██╔══╝      
    ██████╔╝██║  ██║   ██║   ██║  ██║██████╔╝██║  ██║███████║███████╗    
    ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝    
    `);
    await inquirer.prompt({
            type: `list`,
            name: `choice`,
            message: `What would you like to do?`,
            choices: [`View All Departments`, `View All Roles`, `View All Employees`, `Add A Department`, `Add A Role`, `Add An Employee`, `Update An Employee Role`, `Quit`],
        })
    .then((promptInput) => {
        switch (promptInput.choice) {
            case `View All Departments`:
                viewAllDepartments();
                break;
            case `View All Roles`:
                viewAllRoles();
                break;
            case `View All Employees`:
                viewAllEmployees();
                break;
            case `Add A Department`:
                inquirer.prompt([
                    {
                        type: `input`,
                        name: `name`,
                        message: `What is the name of the department you'd like to add?`,
                    }
                ])
                .then((secondaryInput) => {
                    db.query(`INSERT INTO departments (name_id) VALUES ('` + secondaryInput.name + `');`);
                    viewAllDepartments();
                });
                break;
            case `Add A Role`:
                inquirer.prompt([
                    {
                        type: `input`,
                        name: `title`,
                        message: `What is the name of the role?`,
                    },
                    {
                        type: `input`,
                        name: `salary`,
                        message: `What is the salary of the role?`,
                    },
                    {
                        type: `input`,
                        name: `department`,
                        message: `What is the department ID of the role?`,
                    }
                ])
                .then((secondaryInput) => {
                    db.query(`INSERT INTO roles (title, salary, department_id) VALUES ('` + secondaryInput.title +`', '` + secondaryInput.salary + `', '` + secondaryInput.department + `');`);
                    viewAllRoles();
                });
                break;
            case `Add An Employee`:
                inquirer.prompt([
                    {
                        type: `input`,
                        name: `first_name`,
                        message: `What is the first name of the employee?`,
                    },
                    {
                        type: `input`,
                        name: `last_name`,
                        message: `What is the last name of the employee?`,
                    },
                    {
                        type: `input`,
                        name: `role_id`,
                        message: `What is the role ID of the employee?`,
                    },
                    {
                        type: `input`,
                        name: `manager_id`,
                        message: `What is the manager ID of the employee?`,
                    },
                ])
                .then((secondaryInput) => {
                    db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('` + secondaryInput.first_name +`', '` + secondaryInput.last_name + `', '` + secondaryInput.role_id + `', '` + secondaryInput.manager_id + `');`);
                    viewAllEmployees();
                });
                break;
            case `Update An Employee Role`:
                inquirer.prompt([
                    {
                        type: `input`,
                        name: `id`,
                        message: `What is the ID of the employee?`,
                    },
                    {
                        type: `input`,
                        name: `role_id`,
                        message: `What is the new role ID of the employee?`,
                    }
                ])
                .then((secondaryInput) => {
                    db.query(`UPDATE employees SET role_id = '` + secondaryInput.role_id + `' WHERE id = '` + secondaryInput.id + `';`);
                    viewAllEmployees();
                });
                break;
            default:
                process.exit();
        };
    });
};
init();