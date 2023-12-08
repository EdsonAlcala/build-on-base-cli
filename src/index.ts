#!/usr/bin/env node

import * as chalk from 'chalk'
import { Command } from 'commander'
import { textSync } from 'figlet'
import * as inquirer from 'inquirer'

import { TEMPLATES_NAMES } from './templates'
import { createProject } from './create'

const program = new Command()

program
  .command('create')
  .description('Create a new App')
  .action(async () => {
    console.log(
      chalk.blueBright(textSync('Build On Base', { horizontalLayout: 'full' })),
    )

    const { projectName } = await inquirer.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: 'Enter the name of the project',
        validate: input => !!input || 'The project name cannot be empty.',
      },
    ])

    const { template } = await inquirer.prompt([
      {
        type: 'list',
        name: 'template',
        message: 'Select a template:',
        choices: Object.keys(TEMPLATES_NAMES).map(key => ({
          name: TEMPLATES_NAMES[key],
          value: key,
        })),
      },
    ])

    createProject(projectName, template)
  })

program.parse(process.argv)
