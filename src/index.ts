// #!/usr/bin/env node
import * as chalk from 'chalk';
import { Command } from 'commander';
import { textSync } from 'figlet';
import * as inquirer from 'inquirer';

import { createProject } from "./create";

const program = new Command();

program
    .command('create')
    .description('Create a new App')
    .action(async () => {
        console.log(
            chalk.blueBright(textSync('Build On Base', { horizontalLayout: 'full' }))
        );

        const { projectName } = await inquirer.prompt([
            {
                type: 'input',
                name: 'projectName',
                message: 'Enter the name of the project',
                validate: (input) => !!input || 'The project name cannot be empty.',
            },
        ]);

        const { template } = await inquirer.prompt([
            {
                type: 'list',
                name: 'template',
                message: 'Select a template:',
                choices: ['Template 1', 'Template 2', 'Template 3'], // Replace with your template choices
            },
        ]);

        createProject(projectName, template);
    });

program.parse(process.argv);
