#! /usr/bin/env node
/*
*************************************************************************
                            Hasan Mumtaz Mirza
                            Roll # PIAIC206850
*************************************************************************
CLI based Calculator
*/

import inquirer from "inquirer";
import chalk from "chalk";
import figlet from "figlet";

let inputOne = {
  type: "input",
  name: "firstNumber",
  message: chalk.green("Enter first number:"),
  validate: (answer: number) => {
    let tempans: string = answer.toString();
    if (isNaN(answer) || tempans == null || tempans == "") {
      throw Error(chalk.red.bold("Please provide a valid number."));
    }

    return true;
  },
};
let inputTwo = {
  type: "input",
  name: "secondNumber",
  message: chalk.green("Enter second number:"),
  validate: (answer: number) => {
    let tempans: string = answer.toString();
    if (isNaN(answer) || tempans == null || tempans == "") {
      throw Error(chalk.red.bold("Please provide a valid number."));
    }

    return true;
  },
};
let operation = {
  name: "operator",
  type: "list",
  choices: ["+", "-", "*", "/", "%", "modulo"],
  message: chalk.green("Choose your operator:"),
};
let exitQ = {
  name: "exit",
  type: "confirm",
  default: false,
  message: chalk.cyan("Do you want to exit?"), // +
  //chalk.red.bold('"Y"') +
  //chalk.cyan(" to exit and any key to continue:"),
};

while (true) {
  printLogo();
  let inputChar = await inquirer.prompt([inputOne, inputTwo, operation]);

  let result: number = 0;

  switch (inputChar.operator) {
    case "+": {
      result = +inputChar.firstNumber + +inputChar.secondNumber;
      break;
    }
    case "-": {
      result = inputChar.firstNumber - inputChar.secondNumber;
      break;
    }
    case "*": {
      result = inputChar.firstNumber * inputChar.secondNumber;
      break;
    }
    case "/": {
      result = inputChar.firstNumber / inputChar.secondNumber;
      break;
    }
    case "%": {
      result = (inputChar.firstNumber / inputChar.secondNumber) * 100;
      break;
    }
    case "modulo": {
      result = inputChar.firstNumber % inputChar.secondNumber;
      break;
    }
    default:
      break;
  }
  printLogo();

  console.log(
    chalk.yellow.bold(
      `${inputChar.firstNumber} ${inputChar.operator} ${inputChar.secondNumber} = ${result}`
    )
  );
  let exitYN = await inquirer.prompt([exitQ]);
  if (exitYN.exit) {
    printLogo();
    console.log(chalk.greenBright.bold(`Thanks for using calculator.`));
    break;
  }
}
function printLogo() {
  console.clear();
  console.log(figlet.textSync("Calculator!"));
  console.log(`\t<------------- By ------------->`);
  console.log(`\t<----- Hasan Mumtaz Mirza ----->`);
  console.log(`\t<-------- PIAIC206850 --------->`);
  console.log(` `);
}
