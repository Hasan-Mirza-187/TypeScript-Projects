#! /usr/bin/env node
/*
*************************************************************************
                            Hasan Mumtaz Mirza
                            Roll # PIAIC206850
*************************************************************************
Currnecy Converter
*/
import inquirer from "inquirer";
import chalk from "chalk";
import figlet from "figlet";
import fs from "fs";

class Currency {
  name: string;
  symbol: string;
  conversionRate: number;
  constructor(name: string, symbol: string, conversionRate: number) {
    this.name = name;
    this.symbol = symbol;
    this.conversionRate = conversionRate;
  }
}

const currencies = [
  {
    name: "British Pound",
    symbol: "GBP",
    conversionRate: 1.25, // 1 GBP = 1.25 USD
  },
  {
    name: "Pakistani Rupee",
    symbol: "PKR",
    conversionRate: 0.0035, // 1 PKR = 0.0035 USD
  },
  {
    name: "United Arab Emirates Dirham",
    symbol: "AED",
    conversionRate: 0.27, // 1 AED = 0.27 USD
  },
  {
    name: "Saudi Riyal",
    symbol: "SAR",
    conversionRate: 0.27, // 1 SAR = 0.27 USD
  },
  {
    name: "Indian Rupee",
    symbol: "INR",
    conversionRate: 0.012, // 1 INR = 0.012 USD
  },
  {
    name: "Euro",
    symbol: "EUR",
    conversionRate: 1.1, // 1 EUR = 1.10 USD
  },
  {
    name: "United States Dollar",
    symbol: "USD",
    conversionRate: 1.0, // 1 USD = 1.00 USD
  },
];

let selectFirstCurrency = {
  name: "selectFirstC",
  type: "list",
  choices: currencies.map((it) => it.name + "(" + it.symbol + ")"),
  message: "Select first currency:",
};
let selectSecondCurrency = {
  name: "selectSecondC",
  type: "list",
  choices: currencies.map((it) => it.name + "(" + it.symbol + ")"),
  message: "Select second currency:",
};
let inputValue = {
  type: "input",
  name: "inputV",
  message: chalk.green("Enter conversion amount:"),
  validate: (answer: number) => {
    let tempans: string = answer.toString();
    if (isNaN(answer) || answer < 0 || tempans == null || tempans == "") {
      throw Error(chalk.red.bold("Please provide a valid number."));
    }

    return true;
  },
};
printLogo();
let SelectFirstC = await inquirer.prompt([selectFirstCurrency]);
printLogo();
let SelectSecondC = await inquirer.prompt([selectSecondCurrency]);
printLogo();
let InputV = await inquirer.prompt([inputValue]);
printLogo();
let firstCurrencyIndex = currencies
  .map((it) => it.name + "(" + it.symbol + ")")
  .indexOf(SelectFirstC.selectFirstC);
let secondCurrencyIndex = currencies
  .map((it) => it.name + "(" + it.symbol + ")")
  .indexOf(SelectSecondC.selectSecondC);

console.log(
  `${InputV.inputV} ${SelectFirstC.selectFirstC} ----> ${(
    (InputV.inputV * currencies[firstCurrencyIndex].conversionRate) /
    currencies[secondCurrencyIndex].conversionRate
  ).toFixed(2)} ${SelectSecondC.selectSecondC}  `
);

function printLogo() {
  console.clear();
  console.log(figlet.textSync("Currency Converter!"));
  console.log(`\t\t\t\t<------------------- By ------------------->`);
  console.log(`\t\t\t\t<----------- Hasan Mumtaz Mirza ----------->`);
  console.log(`\t\t\t\t<-------------- PIAIC206850 --------------->`);
  console.log(` `);
}
