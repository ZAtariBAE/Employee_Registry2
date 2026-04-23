// Validates in Controller
const { isEmpty, isLength, isEmail } = require("validator");

const validateAllEmployeeData = (name, department, salary, email) => {
    const errors = [];

    // Name Validation
    if (!name) {
      errors.push("Name is a required field.");
    }
     if (typeof name !== 'string') {
      errors.push("Name must be text");
    }
     if (isEmpty(name, {ignore_whitespace: true})) {
      errors.push("Name cannot be empty spaces");
    }
     if (!(isLength(name, {min:3, max: 100}))) {
      errors.push("Name must be between 3-100 characters");
    }

    // Department Validation
    if (!department) {
      errors.push("Department is a required field.");
    } else if (typeof department !== 'string') {
      errors.push("Department must be text")
    } else if (isEmpty(department, {ignore_whitespace: true})) {
      errors.push("Department cannot be empty spaces");
    }

    // Salary Validation
    if (!salary) {
      errors.push("Salary is a required field.");
    } else if (isNaN(salary)) { 
      errors.push("Salary must be a number.");
    }

    // Email Validation
    if (email) {
        if (!isEmail(email)) { errors.push("Email invalid");}
    }

    return errors;

};


module.exports =  {validateAllEmployeeData};