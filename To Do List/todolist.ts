#! /usr/bin/env node
/*
*************************************************************************
                            Hasan Mumtaz Mirza
                            Roll # PIAIC206850
*************************************************************************
To-DO-List
*/

import chalk from "chalk";
import inquirer from "inquirer";
import figlet from "figlet";
import fs from "fs";

const jsonString = fs.readFileSync("./TaskList.json", "utf8");
let parsedTaskList = JSON.parse(jsonString);
const taskKeys = Object.keys(parsedTaskList);
let taskList: string[] = [];
let statusList: boolean[] = [];
for (const key in taskKeys) {
  taskList[key] = parsedTaskList[taskKeys[key]]["task"];
  statusList[key] = parsedTaskList[taskKeys[key]]["status"];
}

let userMenu = {
  name: "menu",
  type: "list",
  choices: ["User Menu", "Exit"],
  message: "select your option: ",
};
let services = {
  name: "service",
  type: "list",
  choices: [
    "Enter New task",
    "Edit Task",
    "Delete Task",
    "View Tasks",
    "Change Status",
  ],
  message: "Select your desired service:",
};
let EditTaskService = {
  name: "EditTask",
  type: "list",
  choices: taskList,
  message: "Select the task you want to edit:",
};
let ChangeStatusService = {
  name: "changeStatus",
  type: "checkbox",
  choices: taskList,
  message: "Check the task to change status to completed: ",
};
let DeeteTaskService = {
  name: "DeleteTask",
  type: "list",
  choices: taskList,
  message: "Choose the task you want to delete: ",
};
let EditTask = {
  name: "EditTask",
  type: "input",
  message: "Enter edited task: ",
  validate: (answer: string) => {
    if (answer == null || answer == "") {
      throw Error(chalk.red.bold("Please provide a valid task."));
    }

    return true;
  },
};
let newTaskService = {
  name: "NewTask",
  type: "input",
  message: "Enter a new task: ",
  validate: (answer: string) => {
    if (answer == null || answer == "") {
      throw Error(chalk.red.bold("Please provide a valid task."));
    }

    return true;
  },
};
let exitFlag: boolean = false;
do {
  printLogo();

  if (!taskList.length) {
    console.log(`You don't have any tasks to display.`);
  } else {
    console.log(`You have following tasks in your to do list:`);
    for (const key in taskList) {
      if (statusList[key]) {
        console.log(`${+key + 1}. ${taskList[+key]}   [COMPLETED]`);
      } else {
        console.log(`${+key + 1}. ${taskList[+key]}   [PENDING]`);
      }
    }
  }
  console.log(``);

  let inputChar = await inquirer.prompt([userMenu]);
  if (inputChar.menu == "User Menu") {
    printLogo();
    let inputServices = await inquirer.prompt([services]);
    switch (inputServices.service) {
      case "Enter New task":
        printLogo();
        let newTask = await inquirer.prompt([newTaskService]);
        let writeIndex = taskList.length;
        taskList[writeIndex] = newTask.NewTask;
        statusList[writeIndex] = false;
        break;
      case "Edit Task":
        printLogo();
        let EditTaskAns = await inquirer.prompt([EditTaskService]);
        printLogo();
        console.log(`Task to be Edited: ${EditTaskAns.EditTask}`);
        let EditedTask = await inquirer.prompt([EditTask]);
        let editIndex = taskList.indexOf(EditTaskAns.EditTask);
        taskList[editIndex] = EditedTask.EditTask;
        statusList[editIndex] = false;
        break;

      case "Change Status":
        printLogo();
        let ChangeStatus = await inquirer.prompt([ChangeStatusService]);
        for (let index = 0; index < taskList.length; index++) {
          let changeIndex = ChangeStatus.changeStatus.indexOf(taskList[index]);
          if (changeIndex !== -1) {
            statusList[index] = true;
          } else {
            statusList[index] = false;
          }
        }
        break;

      case "Delete Task":
        printLogo();
        if (!taskList.length) {
          console.log(
            `You don't have any tasks to delete.  ${taskList.length}`
          );
        } else {
          let deleteTask = await inquirer.prompt([DeeteTaskService]);
          let deleteIndex = taskList.indexOf(deleteTask.DeleteTask);
          if (deleteIndex !== -1) {
            taskList.splice(deleteIndex, 1);
            statusList.splice(deleteIndex, 1);
          }
        }
        break;
      case "View Tasks":
        break;

      default:
        break;
    }
  }
  if (inputChar.menu == "Exit") {
    if (!taskList.length) {
      for (let key in taskKeys) {
        delete parsedTaskList[taskKeys[key]];
      }
    } else {
      for (let key in taskKeys) {
        delete parsedTaskList[taskKeys[key]];
      }
      for (let index = 0; index < taskList.length; index++) {
        let Obj1 = {
          [index]: {
            task: taskList[index],
            status: statusList[index],
          },
        };
        parsedTaskList = Object.assign(parsedTaskList, Obj1);
      }
    }
    writeJsonFile(parsedTaskList);
    exitFlag = true;
    printLogo();

    console.log(`Thanks for using To do List.`);
  }
} while (!exitFlag);

function printLogo() {
  console.clear();
  console.log(figlet.textSync("To  Do  List"));
  console.log(`\t<------------- By ------------->`);
  console.log(`\t<----- Hasan Mumtaz Mirza ----->`);
  console.log(`\t<-------- PIAIC206850 --------->`);
  console.log(` `);
}

function writeJsonFile(input: any) {
  const jsonContent = JSON.stringify(input);
  fs.writeFile("TaskList.json", jsonContent, "utf8", function (err) {
    if (err) {
      console.log("An error occured while writing tasks to File.");
      return console.log(err);
    }
  });
}
