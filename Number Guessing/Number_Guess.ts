#! /usr/bin/env node
/*
*************************************************************************
                            Hasan Mumtaz Mirza
                            Roll # PIAIC206850
*************************************************************************
Number guessing game.
*/
import inquirer from "inquirer";
import chalk from "chalk";
import figlet from "figlet";
import fs from "fs";

class User {
  name: string;
  score: number;

  constructor(name: string, score: number) {
    this.name = name;
    this.score = score;
  }
}
let createUser = {
  name: "userName",
  type: "input",
  message: "Enter a new username: ",
};
let question = {
  name: "userInput",
  type: "input",
  message: "Enter any number between 0 and 50: ",
};
let exitQ = {
  name: "exit",
  type: "confirm",
  default: true,
  message: chalk.cyan("Do you want to play another round?"),
};

let guessNumber: number = Math.ceil(Math.random() * 10);
let numberOfTries: number = 5;
let numberGuessed: boolean = false;
let gameScore: number = 50;
printLogo();
let userselect = await inquirer.prompt([createUser]);
let user01: User = new User(userselect.userName, 0);
console.log(user01);
let myObj = {
  "0": { user01 },
};
console.log(`${myObj}`);
console.log(`${myObj[0]}`);
writeJsonFile(myObj);
while (true);
while (true) {
  printLogo();
  numberGuessed = false;
  printLogo();
  // console.log(
  //   `${user01.name}, Welcome to the game.         Guess right number to earn ${gameScore} points            Highest Score: ${user01.score}`
  // );
  // console.log(" ");
  for (let index = 0; index < numberOfTries; index++) {
    console.log(
      `${user01.name}, Welcome to the game.         Guess right number to earn ${gameScore} points            Highest Score: ${user01.score}`
    );
    console.log(" ");
    let inputChar = await inquirer.prompt([question]);
    printLogo();

    if (inputChar.userInput > guessNumber) {
      console.log(`You lost a chance. ${numberOfTries - index - 1} tries left`);
      console.log(
        `You guessed ${inputChar.userInput}, which is a larger number.`
      );
      gameScore = gameScore - 10;
    } else if (inputChar.userInput < guessNumber) {
      console.log(`You lost a chance. ${numberOfTries - index - 1} tries left`);
      console.log(
        `You guessed ${inputChar.userInput}, which is a smaller number.`
      );
      gameScore = gameScore - 10;
    } else if (inputChar.userInput == guessNumber) {
      console.clear();
      console.log(figlet.textSync("\t\tBINGO!!!"));
      console.log(figlet.textSync("You  guessed  it!"));
      console.log(figlet.textSync(`Your SCORE is : ${gameScore}`));
      numberGuessed = true;
      if (gameScore > user01.score) {
        user01.score = gameScore;
      }
      //gameScore = 50;
      break;
    }
  }
  if (numberGuessed == false) {
    console.log(`Number you couldnot guess was: ${guessNumber}`);
  }
  console.log(
    `${user01.name}, Welcome to the game.        This game's Score was: ${gameScore}               Higherst Score: ${user01.score}`
  );

  let exitYN = await inquirer.prompt([exitQ]);
  if (!exitYN.exit) {
    printLogo();
    console.log(
      `${user01.name}, Welcome to the game.        This game's Score was: ${gameScore}               Higherst Score: ${user01.score}`
    );
    console.log(chalk.greenBright.bold(`Thanks for playing this game.`));
    break;
  }
  gameScore = 50;
}

function printLogo() {
  console.clear();
  console.log(figlet.textSync("Number Guessing Game!"));
  console.log(`\t\t\t\t<------------------- By ------------------->`);
  console.log(`\t\t\t\t<----------- Hasan Mumtaz Mirza ----------->`);
  console.log(`\t\t\t\t<-------------- PIAIC206850 --------------->`);
  console.log(` `);
}

function writeJsonFile(input: any) {
  const jsonContent = JSON.stringify(input);
  fs.writeFile("userdata.json", jsonContent, "utf8", function (err) {
    if (err) {
      console.log("An error occured while writing tasks to File.");
      return console.log(err);
    }
  });
}
