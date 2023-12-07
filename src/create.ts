import * as chalk from 'chalk';
import * as fs from 'fs';
import * as https from 'https';
import * as http from 'http';
import * as path from 'path';
import { pipeline } from 'stream';
import { promisify } from 'util';
import * as unzipper from 'unzipper';

import { isRootDirWriteable, getProjectDir } from './utils/dir';

const pipelineAsync = promisify(pipeline);

export async function createProject(projectName: string, template: string) {
    // Check if the current directory is writable. If not, exit the process
    if (!(await isRootDirWriteable())) {
        console.error(
            chalk.red(
                'The application path is not writable, please check folder permissions and try again.'
            )
        );
        console.error(
            chalk.white(
                'It is likely you do not have write permissions for this folder.'
            )
        );
        process.exit(1);
    }

    const appDir = getProjectDir(projectName);

    if (fs.existsSync(appDir)) {
        console.error(
            chalk.red('A directory with the app name already exists.')
        );
        process.exit(1);
    }

    console.log(
        `${chalk.cyan(
            `Downloading files for the ${template} template. This might take a moment... \n`
        )}`
    );

    // Download and extract the apps
    await downloadAndExtractApps(projectName, template);

    // Update the package.json with the app name
    const isPackageJsonUpdated = updatePackageJson(appDir, projectName);

    if (isPackageJsonUpdated) {
        displayFinalInstructions(projectName);
    }
}

async function downloadAndExtractApps(projectName: string, template: string): Promise<void> {
    try {
        const githubRepoUrl = 'https://github.com/username/repo/archive/main.zip'; // Replace with your GitHub repository URL

        const response = await new Promise<http.IncomingMessage>((resolve, reject) => {
            https.get(githubRepoUrl, (res) => {
                if (res.statusCode !== 200) {
                    reject(`Failed to fetch GitHub repository. Status code: ${res.statusCode}`);
                }
                resolve(res);
            });
        });

        const outputDir = path.join(process.cwd(), projectName);
        const tempZipFile = path.join(outputDir, 'temp.zip');

        // Create the app directory if it doesn't exist
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        // Download the ZIP file
        await pipelineAsync(response, fs.createWriteStream(tempZipFile));

        // Extract the ZIP file
        await fs.createReadStream(tempZipFile).pipe(unzipper.Extract({ path: outputDir })).on('close', () => {
            // Cleanup: Remove the temporary ZIP file
            fs.unlinkSync(tempZipFile);
        });

        // Customize the app based on the selected template here
        console.log(chalk.green('App downloaded and extracted successfully.'));

    } catch (error) {
        console.error(chalk.red('Error downloading and extracting app:'), error);
        process.exit(1);
    }
}

// Function to copy the package.json and update it
function updatePackageJson(appDir: string, newprojectName: string): boolean {
    try {
        const packageJsonPath = path.join(appDir, 'package.json');
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

        // Modify the package.json as needed
        packageJson.name = newprojectName;

        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

        console.log(chalk.green('package.json updated successfully.'));
        return true;
    } catch (error) {
        console.error(chalk.red('Error updating package.json:'), error);
        return false;
    }
}

// Function to display final instructions
function displayFinalInstructions(newprojectName: string): void {
    console.log(chalk.green(`Your Onchain app "${newprojectName}" has been created successfully!`));
    console.log(chalk.blue('You can now navigate to the app directory and start working on your project.'));
}
