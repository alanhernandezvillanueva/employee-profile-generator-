const fs = require('fs');
const inquirer = require('inquirer')
const { generateSite } = require('./lib/generateHTML')

const employees = []
async function generateEmployeeQuestions() {

	const employee = await inquirer.prompt([
		{
			type: 'input',
			name: 'employeeName',
			message: "What is your employee's name? (Required)",
			validate: employeeNameInput => {
				if (employeeNameInput) {
					return true;
				} else {
					console.log("Please enter your employee's name!");
					return false;
				}
			}

		},
		{
			type: 'input',
			name: 'employeeEmail',
			message: "What is the employee's email? (Required)",
			validate: employeeEmail => {
				if (employeeEmail) {
					return true;
				} else {
					console.log("Please enter your manager's email!")
					return false;
				}
			}
		},
		{
			type: 'list',
			name: 'employeeRole',
			message: "What is your employee's role?",
			choices: ['Manager', 'Engineer', 'Intern'],
		}

	])

	let employeeObject = employee



	let manager
	if (employee.employeeRole === 'Manager') {
		manager = await inquirer.prompt([
			{
				type: 'input',
				name: 'managerID',
				message: "What is the manager's ID? (Required)",
				validate: managerID => {
					if (managerID) {
						return true;
					} else {
						console.log("Please enter your manager's ID! ")
						return false;
					}
				}
			},
			{
				type: 'input',
				name: 'managerOffice',
				message: "What is the manager's office number? (Required) ",
				validate: managerOffice => {
					if (managerOffice) {
						return true;
					} else {
						console.log("Please enter your manager's office number!")
					}
				}
			}
		])

		if (manager) {
			employeeObject = { ...employeeObject, manager }
			employees.push(employeeObject);
		}
	}


	let engineer
	if (employee.employeeRole === 'Engineer') {
		engineer = await inquirer.prompt([
			{
				type: 'input',
				name: 'engineerID',
				message: "What is the engineer's ID? (Required)",
				validate: engineerID => {
					if (engineerID) {
						return true;
					} else {
						console.log("Please enter your engineer's ID!")
					}
				}
			},
			{
				type: 'input',
				name: 'engineerGithub',
				message: "What is the engineer's Github? (Required) ",
				validate: engineerGithub => {
					if (engineerGithub) {
						return true;
					} else {
						console.log("Please enter your engineer's Github!")
						return false;
					}
				}
			}
		])
		if (engineer) {
			employeeObject = { ...employeeObject, engineer }
			employees.push(employeeObject);
		}
	}


	let intern
	if (employee.employeeRole === 'Intern') {

		intern = await inquirer.prompt([
			{
				type: 'input',
				name: 'internID',
				message: "What is the intern's ID? (Required)",
				validate: internID => {
					if (internID) {
						return true;
					} else {
						console.log("Please enter your engineer's ID!")
					}
				}
			},
			{
				type: 'input',
				name: 'internSchool',
				message: "What is the intern's school?",
				validate: internSchool => {
					if (internSchool) {
						return true;
					} else {
						console.log("Please enter your intern's school!")
						return false;
					}
				}
			}
		])
		if (intern) {
			employeeObject = { ...employeeObject, intern }
			employees.push(employeeObject);
		}




	}

	const newEmployeeQuestions = await inquirer.prompt([
		{
			type: 'confirm',
			name: 'newEmployee',
			message: "Would you like to add another employee?"
		}
	])

	if (newEmployeeQuestions.newEmployee) {
		
		generateEmployeeQuestions()
	} else {
		
	
		
		
		 let returned = generateSite(employees)
		 if (returned) {
			 writeFile('./src/index.html', returned);
			 console.log('Your file was succesfully created!')
		 } else {
			 console.log("There was an error");
		 }
		
		
		
	}
	

};



const writeFile = (fileName, data) => {
	return new Promise((resolve, reject) => {
		fs.writeFile(fileName, data, err => {
			if (err) {
				reject(err);
				console.log(err)
				return;
			}
			resolve({
				ok: true,
				
			});
		});
	});
};


generateEmployeeQuestions();