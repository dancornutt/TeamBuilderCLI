// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Engineer extends Employee {
    constructor(name, id, email, github) {
        this.github = github;
        super(name, id, email);
    };
    getRole() {
        return "Engineer"
    };
    getGithub() {
        return this.github
    };
}

export default Engineer