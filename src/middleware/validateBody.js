// Validates in Controller
const { isEmpty, isLength, isEmail } = require("validator");

exports.validateAllEmployeeData = (data) => {
  let errors = [];
  const {name, department, salary, email, status} = data;


  // Name Validation
  if (name !== undefined) {
    if (typeof name !== 'string') {
      errors.push("Name must be text");
    }
    if (isEmpty(name, {ignore_whitespace: true})) {
      errors.push("Name cannot be empty spaces");
    }
    if (!(isLength(name, {min:3, max: 100}))) {
      errors.push("Name must be between 3-100 characters");
    }
  }

  // Department Validation
  if (department !== undefined) { 
    if (typeof department !== 'string') {
      errors.push("Department must be text")
    }
    if (isEmpty(department, {ignore_whitespace: true})) {
      errors.push("Department cannot be empty spaces");
    }
    if (!(isLength(department, {min:3, max: 100}))) {
      errors.push("Department must be between 3-100 characters");
    }
  }

  // Salary Validation
  if (salary !== undefined) {
    if (isNaN(salary)) { 
      errors.push("Salary must be a number.");
    }
  }

  // Email Validation
  if (email !== undefined) {
    if (!isEmail(email)) { errors.push("Email invalid");}
  }

  // Status Validation
  if (status !== undefined) {
    if (typeof status !== 'string') {
      errors.push("Status must be text")
    }
    if (isEmpty(status, {ignore_whitespace: true})) {
      errors.push("Status cannot be empty spaces");
    }
    if (status !== 'active' && status !== 'inactive') {
      errors.push("Status must be (active) or (inactive).");
    }
    data.status = status.toLowerCase();
  }

  return errors;
};

exports.validateRequiredFields = (requiredFields, data) => {
    let errors = [];

    requiredFields.forEach(field => {
      if (data[field] === undefined || data[field] === null || data[field] === '') {
        errors.push(`${field.charAt(0).toUpperCase() + field.slice(1)} is a required field.`)
      } 
    });

    return errors;
};
