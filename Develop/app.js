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


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
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
    gethub: {
        type: "input",
        message: "What is the Engineer's github repo?",
        name: "github"
    },
    school: {
        type: "input",
        message: "Where did the intern go to school?",
        name: "school"
    },
    finishedBuilding: {
        type: "input",
        message: "Where did the intern go to school?",
        name: "school"
    },
    employeeType: {
        type: "list",
        message: "What kind of employee should be added to the team?",
        name: "teamMember",
        choices: ["Intern", "Engineer"],
        default: "Engineer"
    },
    addAnotherEmployee: {
        type: "confirm",
        message: "Would you like to add another Employee to the team?",
        name: "addAnother"
    }
}

let team = [];

async function addToTeam(person) {
    //Adds user to team
    console.log(`Adding ${person} to team`)
    let questions = Object.keys(person);
    let answers = await askQuestions(questions);
    team.push(person(answers));
    console.log("From addToTeam:", questions, answers, team);
}

async function askQuestions(questions) {
    
    //Build array of object questions
    let promptArr = [];
    questions.forEach(element => {
        promptArr.push(qLib[element])
    });

    //Ask user questions
    await inquirer.prompt(promptArr)
    .then(answers => {
        console.log("Answers from user:", answer);
        return answers
    })
}

function init() {
    let finished = false;

    // //Base Team has one manager
    addToTeam(new Manager);

    // //Add Team Loop
    // while (!finished) {
    //     console.log("From addToTeam:")
    //     if (askQuestions(["finishedBuilding"])) {
    //         finished = true;
    //         break
    //     };
    //     //Add users to team
    //     inquirer.prompt(qLib.employeeType)
    //     .then(function(response) {
    //         console.log("User has chosen: ", response)
    //         switch (response){
    //             case "Intern":
    //                 console.log("Intern");
    //                 person = new Intern;
    //                 addToTeam(new Intern)
    //                 break;
    //             case "Engineer":
    //                 console.log("Engineer");
    //                 person = new Engineer;
    //                 addToTeam(new Engineer)
    //                 break;              
    //         }
    //     })
    // };
    // // render(team);
    // console.log(team);
};

init();