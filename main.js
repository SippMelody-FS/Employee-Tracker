class Employee {
    constructor(name, age) {
        this.name = name;
        this.age = age;
        this.annualSalary = 0;
    }
}

class PartTime extends Employee {
    constructor(name, age, payRate, hours) {
        super(name, age);
        this.payRate = payRate;
        this.hours = hours;
        this.type = 'Part-Time';
        this.calculatePay();
    }

    calculatePay() {
        this.annualSalary = this.payRate * this.hours * 52;
    }
}

class Manager extends Employee {
    constructor(name, age, payRate) {
        super(name, age);
        this.payRate = payRate;
        this.type = 'Manager';
        this.hours = 40; // Managers always work 40+ hours
        this.calculatePay();
    }

    calculatePay() {
        this.annualSalary = this.payRate * this.hours * 52 - 1000; // $1000 deduction for insurance
    }
}

class Main {
    constructor() {
        this.employees = [
            new PartTime('Elaine', 24, 15, 20),
            new Manager('Bobby', 30, 25),
            new PartTime('Charles', 22, 10, 15),
        ];
        this.displayEmployees();
        this.run();
    }

    run() {
        let choice;
        do {
            choice = Number(
                prompt(
                    "Main Menu\n1. Add Employee\n2. Remove Employee\n3. Edit Employee\n4. Display Employees\n5. Exit\nEnter your choice:"
                )
            );
            switch (choice) {
                case 1:
                    this.addEmployee();
                    break;
                case 2:
                    this.removeEmployee();
                    break;
                case 3:
                    this.editEmployee();
                    break;
                case 4:
                    this.displayEmployees();
                    break;
                case 5:
                    console.log("Exiting...");
                    break;
                default:
                    console.log("Invalid choice, please try again.");
            }
        } while (choice !== 5);
    }

    addEmployee() {
        const input = prompt(
            "Enter employee details (name, age, pay rate, hours per week):"
        ).split(",");
        const [name, age, payRate, hours] = input.map((item) => item.trim());
        let newEmployee = 
            Number(hours) >= 40
                ? new Manager(name, Number(age), Number(payRate))
                : new PartTime(name, Number(age), Number(payRate), Number(hours));

        this.employees.push(newEmployee);
        console.log(`${name} has been added successfully.`);
        this.displayEmployees();
    }

    removeEmployee() {
        const identifier = prompt("Enter employee name or ID number to remove:");

        if (isNaN(identifier)) {
            this.employees = this.employees.filter(
                (emp) => emp.name.toLowerCase() !== identifier.toLowerCase()
            );
        } else {
            const index = Number(identifier) - 1;
            if (index >= 0 && index < this.employees.length) {
                this.employees.splice(index, 1);
            } else {
                console.log("Invalid employee number.");
            }
        }
        console.log("Employee removed successfully.");
        this.displayEmployees();
    }

    editEmployee() {
        const empNumber = Number(prompt("Enter employee number to edit:")) - 1;
        if (empNumber >= 0 && empNumber < this.employees.length) {
            const newPayRate = Number(prompt("Enter new pay rate:"));
            this.employees[empNumber].payRate = newPayRate;
            this.employees[empNumber].calculatePay();
            console.log("Pay rate updated successfully.");
            this.displayEmployees();
        } else {
            console.log("Invalid employee number.");
        }
    }

    displayEmployees() {
        console.clear();
        console.log("ID\tName\tAge\tSalary\tHours\tPay\tType");
        this.employees.forEach((emp, i) =>
            console.log(
                `${i + 1}\t${emp.name}\t${emp.age}\t${emp.annualSalary}\t${emp.hours || 'N/A'}\t${emp.payRate}\t${emp.type}`
            )
        );
    }
}

// IIFE to instantiate the Main class
(() => new Main())();