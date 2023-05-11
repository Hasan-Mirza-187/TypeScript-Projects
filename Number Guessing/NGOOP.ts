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

let guestUser: User = new User("Enter New User", 0);
// console.log(user01);

let userList: User[] = [];
// userList.push(user01);
// let user02: User = new User("hasan Mirza", 2);
// userList.push(user02);
//let userselect = await inquirer.prompt([createUser]);

const jsonString = fs.readFileSync("./userdata.json", "utf8");
userList = JSON.parse(jsonString);
// console.log(userList);
let difficultyLevel: number = 10;

let exitQ = {
  name: "exit",
  type: "confirm",
  default: true,
  message: chalk.cyan("Do you want to play another round?"),
};
userList.push(guestUser);
let selectUserService = {
  name: "selectService",
  type: "list",
  choices: userList.map((it) => it.name),
  message: "Select the user:",
};
let selectLevelService = {
  name: "selectLevel",
  type: "list",
  choices: ["Easy", "Intermediate", "Expert"],
  message: "Select the difficulty level:",
};

let numberOfTries: number = 5;
let numberGuessed: boolean = false;
let gameScore: number = 50;
printLogo();
let playingUser: User;
let SelectService = await inquirer.prompt([selectUserService]);
userList.pop();
if (SelectService.selectService == "Enter New User") {
  let userselect = await inquirer.prompt([createUser]);
  let newUser: User = new User(userselect.userName, 0);
  playingUser = newUser;
  userList.push(newUser);
  //console.log(userList);
} else {
  playingUser =
    userList[
      userList.map((it) => it.name).indexOf(SelectService.selectService)
    ];
}

let SelectLevel = await inquirer.prompt([selectLevelService]);
switch (SelectLevel.selectLevel) {
  case "Easy":
    difficultyLevel = 10;
    break;

  case "Intermediate":
    difficultyLevel = 30;
    break;

  case "Expert":
    difficultyLevel = 60;
    break;

  default:
    difficultyLevel = 15;
    break;
}

let question = {
  name: "userInput",
  type: "input",
  message: `Enter any number between 0 and ${difficultyLevel}: `,
};
// console.log(playingUser);
//while (true);
while (true) {
  let guessNumber: number = Math.ceil(Math.random() * difficultyLevel);
  numberGuessed = false;
  printLogo();
  console.log(
    `${playingUser.name}, Welcome to the game.         Guess right number to earn ${gameScore} points            Highest Score: ${playingUser.score}`
  );
  console.log(" ");
  for (let index = 0; index < numberOfTries; index++) {
    let inputChar = await inquirer.prompt([question]);

    if (inputChar.userInput > guessNumber) {
      gameScore = gameScore - 10;
      printLogo();
      console.log(
        `${playingUser.name}, Welcome to the game.         Guess right number to earn ${gameScore} points            Highest Score: ${playingUser.score}`
      );
      console.log(`You lost a chance. ${numberOfTries - index - 1} tries left`);
      console.log(
        `You guessed ${inputChar.userInput}, which is a larger number.`
      );
    } else if (inputChar.userInput < guessNumber) {
      gameScore = gameScore - 10;
      printLogo();
      console.log(
        `${playingUser.name}, Welcome to the game.         Guess right number to earn ${gameScore} points            Highest Score: ${playingUser.score}`
      );
      console.log(`You lost a chance. ${numberOfTries - index - 1} tries left`);
      console.log(
        `You guessed ${inputChar.userInput}, which is a smaller number.`
      );
    } else if (inputChar.userInput == guessNumber) {
      console.clear();
      console.log(figlet.textSync("\t\tBINGO!!!"));
      console.log(figlet.textSync("You  guessed  it!"));
      console.log(figlet.textSync(`Your SCORE is : ${gameScore}`));
      numberGuessed = true;
      if (gameScore > playingUser.score) {
        playingUser.score = gameScore;
      }

      break;
    }
  }
  if (numberGuessed == false) {
    console.log(`Number you couldnot guess was: ${guessNumber}`);
  }
  console.log(
    `${playingUser.name}, Welcome to the game.        This game's Score was: ${gameScore}               Higherst Score: ${playingUser.score}`
  );
  // guessNumber = Math.ceil(Math.random() * 10);
  let exitYN = await inquirer.prompt([exitQ]);
  if (!exitYN.exit) {
    printLogo();
    console.log(
      `${playingUser.name}, Welcome to the game.        This game's Score was: ${gameScore}               Higherst Score: ${playingUser.score}`
    );
    console.log(chalk.greenBright.bold(`Thanks for playing this game.`));

    if (playingUser.name != "Guest User") {
      writeJsonFile(userList);
    }
    break;
  } else gameScore = 50;
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

// [
//   { "name": "hasan Mirza", "score": 0 },
//   { "name": "hasan Mirza", "score": 1 },
//   { "name": "hasan mirza", "score": 2 }
// ]
