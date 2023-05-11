#! /usr/bin/env node
/*
*************************************************************************
                            Hasan Mumtaz Mirza
                            Roll # PIAIC206850
*************************************************************************
Vowels:Write a program to check whether a character is a vowel or a consonant.
*/
import inquirer from "inquirer";
let question = {
    name: "isVowel",
    type: "string",
    message: "Enter any character(press * to exit):",
};
while (true) {
    let inputChar = await inquirer.prompt([question]);
    if (inputChar.isVowel === "a" ||
        inputChar.isVowel === "e" ||
        inputChar.isVowel === "i" ||
        inputChar.isVowel === "o" ||
        inputChar.isVowel === "u") {
        console.log(`The charachter '${inputChar.isVowel}' is a vowel.`);
    }
    else {
        if (inputChar.isVowel != "*") {
            console.log(`The charachter '${inputChar.isVowel}' is not a vowel.`);
        }
        else {
            console.log(`Exiting the program.`);
            break;
        }
    }
}
