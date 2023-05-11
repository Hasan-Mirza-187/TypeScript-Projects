#! /usr/bin/env node
/*
*************************************************************************
                            Hasan Mumtaz Mirza
                            Roll # PIAIC206850
*************************************************************************
ATM Application
*/

import inquirer from "inquirer";
import chalk from "chalk";
import figlet from "figlet";

let userName: string[] = ["user01", "user02", "user03", "user04", "user05"];
let password: string[] = ["user01", "user02", "user03", "user04", "user05"];

let usernameInput = {
  name: "inputName",
  type: "input",
  message: "Please Enter your username: ",
};
let passwordInput = {
  name: "inputPassword",
  type: "password",
  mask: "*",
  message: "Please Enter your password: ",
};
let WrongPasswordInput = {
  name: "inputPassword",
  type: "password",
  mask: "*",
  message: "Invalid Password. Please re-enter your password: ",
};

let services = {
  name: "service",
  type: "list",
  choices: ["Balance Inquiry", "Funds Transfer", "Withdraw Money", "Exit"],
  message: "Select your desired service:",
};
let fundsTransferAmount = {
  type: "input",
  name: "amount",
  message: chalk.green("Enter the amount to be transfered: "),
  validate: (answer: number) => {
    let tempans: string = answer.toString();
    if (isNaN(answer) || tempans == null || tempans == "") {
      throw Error(chalk.red.bold("Please provide a valid number: "));
    }

    return true;
  },
};
let fundsTransferAccount = {
  name: "account",
  type: "input",
  message: "Enter recipient's account number: ",
  validate: (answer: string) => {
    if (answer == null || answer == "") {
      throw Error(chalk.red.bold("Please provide a valid number: "));
    }

    return true;
  },
};
let cahsWithdraw = {
  name: "withdraw",
  type: "list",
  choices: ["500", "1000", "5000", "10000", "25000", "50000", "Other Amount"],
  message: "Select the amount you wish to withdraw:",
};
let cashWithdwarAmount = {
  type: "input",
  name: "otherAmount",
  message: chalk.green("Enter the amount to withraw (Multiples of Rs. 500): "),
  validate: (answer: number) => {
    let tempans: string = answer.toString();
    if (
      isNaN(answer) ||
      tempans == null ||
      tempans == "" ||
      answer % 500 != 0
    ) {
      throw Error(chalk.red.bold("Please provide a valid number: "));
    }

    return true;
  },
};
let enterToContinue = {
  name: "account",
  type: "input",
  message: "Press enter to continue. ",
};
let fundsTransferPrint = {
  name: "printReceipt",
  type: "confirm",
  default: false,
  message: chalk.cyan("Do you want to print a receipt?"), // +
  //chalk.red.bold('"Y"') +
  //chalk.cyan(" to exit and any key to continue:"),
};
const login = async () => {
  printLogo();
  let inputChar = await inquirer.prompt([usernameInput, passwordInput]);
  for (const key in userName) {
    if (inputChar.inputName == userName[key]) {
      userFound = true;
      loginData = inputChar.inputName;
      if (inputChar.inputPassword == password[key]) {
        passwordMatch = true;
      } else {
        for (let index = 0; index < wrongPasswordTries - 1; index++) {
          printLogo();
          console.log(
            `Invalid Password. ${wrongPasswordTries - 1 - index} tries left.`
          );
          let newPassword = await inquirer.prompt([WrongPasswordInput]);
          if (newPassword.inputPassword == password[key]) {
            passwordMatch = true;
            index = 3;
          }
        }
      }
    }
  }
};
let loginData: string = "";
let userFound: boolean = false;
let passwordMatch: boolean = false;
let servicesUnlocked: boolean = false;
let wrongPasswordTries: number = 3;
let accountBalance: number = Math.floor(Math.random() * 100000001);
let stayinServices = true;
console.clear();
await login();

console.clear();
if (userFound) {
  if (passwordMatch) {
    printLogo();
    console.log(`Dear ${loginData}, welcome to ATM services.`);
    servicesUnlocked = true;
  } else {
    printLogo();
    console.log(`Dear ${loginData}, password re-try limit exceeded.`);
    console.log(`Please take your card`);
  }
} else {
  printLogo();
  console.log(`Username not found.`);
  console.log(`Please take your card`);
}

if (servicesUnlocked) {
  do {
    printLogo();
    let service = await inquirer.prompt([services]);
    switch (service.service) {
      case "Balance Inquiry":
        printLogo();
        console.log(
          `Dear ${loginData}, your current balance is: $${accountBalance}`
        );
        let exitbalance = await inquirer.prompt([enterToContinue]);
        console.clear();
        break;
      case "Funds Transfer":
        printLogo();
        console.log(`Available balance: $${accountBalance}`);
        let fundsTransfer = await inquirer.prompt([
          fundsTransferAccount,
          fundsTransferAmount,
        ]);
        if (fundsTransfer.amount <= accountBalance) {
          accountBalance = accountBalance - +fundsTransfer.amount;
          let timestamp = new Date();
          console.log(
            `$${fundsTransfer.amount} transfered to account number ${fundsTransfer.account}.`
          );
          let fundsTransferPrintreceipt = await inquirer.prompt([
            fundsTransferPrint,
          ]);
          if (fundsTransferPrintreceipt.printReceipt) {
            printLogo();
            console.log(`User ID: ${loginData}`);
            console.log(
              `Reciepient's Account Number: ${fundsTransfer.account}`
            );
            console.log(`Amount Transfered: ${fundsTransfer.amount}`);
            console.log(`Remaiining balance: ${accountBalance}`);
            console.log(`Transaction time: ${timestamp}`);
            let exitfunds = await inquirer.prompt([enterToContinue]);
            console.clear();
          }
        } else {
          printLogo();
          console.log(`Insufficient balance.`);
          let exitfunds = await inquirer.prompt([enterToContinue]);
        }
        break;

      case "Withdraw Money":
        printLogo();
        console.log(`Available balance: $${accountBalance}`);
        let CashWithdraw = await inquirer.prompt([cahsWithdraw]);
        switch (CashWithdraw.withdraw) {
          case "500":
            printLogo();
            accountBalance = accountBalance - +CashWithdraw.withdraw;
            console.log(`Please collect your money and take card.`);
            console.log(`Dear ${loginData}, thanks for using ATM Services.`);
            stayinServices = false;
            break;
          case "1000":
            printLogo();
            accountBalance = accountBalance - +CashWithdraw.withdraw;
            console.log(`Please collect your money and take card.`);
            console.log(`Dear ${loginData}, thanks for using ATM Services.`);
            stayinServices = false;
            break;
          case "5000":
            printLogo();
            accountBalance = accountBalance - +CashWithdraw.withdraw;
            console.log(`Please collect your money and take card.`);
            console.log(`Dear ${loginData}, thanks for using ATM Services.`);
            stayinServices = false;
            break;
          case "10000":
            printLogo();
            accountBalance = accountBalance - +CashWithdraw.withdraw;
            console.log(`Please collect your money and take card.`);
            console.log(`Dear ${loginData}, thanks for using ATM Services.`);
            stayinServices = false;
            break;
          case "25000":
            printLogo();
            accountBalance = accountBalance - +CashWithdraw.withdraw;
            console.log(`Please collect your money and take card.`);
            console.log(`Dear ${loginData}, thanks for using ATM Services.`);
            stayinServices = false;
            break;
          case "50000":
            printLogo();
            accountBalance = accountBalance - +CashWithdraw.withdraw;
            console.log(`Please collect your money and take card.`);
            console.log(`Dear ${loginData}, thanks for using ATM Services.`);
            stayinServices = false;
            break;
          case "Other Amount":
            printLogo();
            console.log(`Available balance: $${accountBalance}`);
            let WithdrawCash = await inquirer.prompt([cashWithdwarAmount]);
            if (WithdrawCash.otherAmount >= accountBalance) {
              printLogo();
              console.log(`Insufficient Balance.`);
              console.log(`Dear ${loginData}, thanks for using ATM Services.`);
            } else if (WithdrawCash.otherAmount <= 100000) {
              printLogo();
              console.log(`Please collect your money and take card.`);
              console.log(`Dear ${loginData}, thanks for using ATM Services.`);
              accountBalance = accountBalance - +WithdrawCash.otherAmount;
            } else {
              printLogo();
              console.log(`Daily limit Exceeded.`);
              console.log(`Dear ${loginData}, thanks for using ATM Services.`);
            }
            stayinServices = false;
            break;

          default:
            stayinServices = false;
            break;
        }
        break;
      case "Exit":
        printLogo();
        console.log(`Dear ${loginData}, thanks for using ATM Services.`);
        stayinServices = false;
        break;

      default:
        stayinServices = false;
        break;
    }
  } while (stayinServices);
}

function printLogo() {
  console.clear();
  console.log(figlet.textSync("ATM Application!"));
  console.log(`\t\t\t<------------- By ------------->`);
  console.log(`\t\t\t<----- Hasan Mumtaz Mirza ----->`);
  console.log(`\t\t\t<-------- PIAIC206850 --------->`);
  console.log(` `);
}
