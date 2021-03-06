const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { exit } = require("process");
const { resolve } = require("path");

const qLib = {
    name: {
        type: "input",
        message: "What is the person's name?",
        name: "name"
    },
    id: {
        type: "input",
        message: "Please input their id number.",
        name: "id"
    },
    email: {
        type: "input",
        message: "What is their email address?",
        name: "email"
    },
    officeNumber: {
        type: "input",
        message: "What is their office number?",
        name: "officeNumber"
    },
    github: {
        type: "input",
        message: "What is the Engineer's github repo?",
        name: "github"
    },
    school: {
        type: "input",
        message: "Where did the intern go to school?",
        name: "school"
    },
    employeeType: {
        type: "list",
        message: "What kind of employee should be added to the team?",
        name: "teamMember",
        choices: ["Intern", "Engineer", "Manager"],
        default: "Engineer"
    },
    finishedBuildingTeam: {
        type: "confirm",
        message: "Are you done building the team?",
        name: "finished"
    }
}

const personLib = {
    "Manager" : Manager,
    "Intern": Intern,
    "Engineer": Engineer
}

//Global team array of people objects
let team = [];

const outputFolder = "./output";
const outputFile = "team.html";

//Builds string array of questions to ask based on parameter value, adds teammember object to team array
//Params: string of person to be added to team
async function addToTeam(person) {
    let questions = Object.keys(new personLib[person]);
    let constrArr = Object.values(await askQuestions(questions));
    //TODO refactor line below. Fragile, only works with Object params length 4
    team.push(new personLib[person](constrArr[0], constrArr[1], constrArr[2], constrArr[3]));
}

//Builds set of questions objects to ask user, and asks questions, returns values
//Params: string array of questions to be asked
//Returns object array of answers from user.
function askQuestions(questions) {
    let promptArr = [];
    questions.forEach(element => promptArr.push(qLib[element]));
    return inquirer.prompt(promptArr)
}

function writeHTML(htmlData) {
    if (!fs.existsSync(OUTPUT_DIR)){
        fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFile(outputPath, htmlData, function(err) {
        if (err) {
            return console.log(err)
        }
    })
}

//Main loop for adding people to a team
async function init() {
    // //Base Team has only one manager
    console.log("Let's first create the manager...");
    await addToTeam("Manager");

    // //Add Team Loop
    let buildingTeam = true;
    while (buildingTeam) {
        const getBuilding = await inquirer.prompt(qLib["finishedBuildingTeam"]);
        if (!getBuilding.finished) {
            const getNewMember = await inquirer.prompt(qLib["employeeType"]);
            await addToTeam(`${getNewMember.teamMember}`);
        } else {
            buildingTeam = false;
        }
    }
    writeHTML(render(team));
};

init();