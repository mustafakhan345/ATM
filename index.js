import inquirer from 'inquirer';
import { faker } from '@faker-js/faker';
const createUser = () => {
    let users = [];
    for (let i = 0; i < 5; i++) {
        let user = {
            id: i,
            pin: 1000 + i,
            name: faker.person.fullName(),
            accounTNumber: Math.floor(100000000 * Math.random() * 9867894),
            balance: 1000000 * i
        };
        users.push(user);
    }
    return users;
};
//ATM MACHINE 
const atmMachine = async (users) => {
    const res = await inquirer.prompt({
        type: "number",
        message: "write pin code",
        name: "pin"
    });
    const user = users.find((val) => val.pin == res.pin);
    if (user) {
        console.log(`welcome ${user.name}`);
        atmfunc(user);
        return;
    }
    console.log("invalid user pin");
};
//atm function
const atmfunc = async (user) => {
    const ans = await inquirer.prompt({
        type: "list",
        name: "sellect",
        message: "tap to sellect",
        choices: ["withdraw", "balance", "exit", "deposit"]
    });
    if (ans.sellect == "withdraw") {
        const amount = await inquirer.prompt({
            type: "number",
            message: "enter amount",
            name: "rupee"
        });
        if (amount.rupee > user.balance) {
            return console.log("insufishante");
        }
        console.log(`withdraw amount:${amount.rupee}`);
        console.log(`balance:${user.balance - amount.rupee}`);
    }
    if (ans.sellect == "balance ") {
        console.log(`"balance :${user.balance}`);
        return;
    }
    if (ans.sellect == "deposit") {
        const deposit = await inquirer.prompt({
            type: "number",
            message: "deposit amount enter",
            name: "rupee",
        });
        console.log(`deposite amount : ${deposit.rupee}`);
        console.log(`total Balance :${user.balance + deposit.rupee}`);
    }
    if (ans.sellect == "exit") {
        console.log("Thanks to using atm");
    }
};
const users = createUser();
atmMachine(users);
