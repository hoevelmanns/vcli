/**
 * @returns void
 */
import * as inquirer from 'inquirer';
const fs = require('fs-extra'); // todo use @types/fs-extra if fixed
import { defaultVagrantConfig } from '../shared/types/defaults';
import { VConfig } from '../shared';
import { ISetup } from '../shared/types/setup';

export class VagrantSetup extends VConfig implements ISetup {
    constructor() {
        super();
    }

    run = async (): Promise<void> =>
        new Promise(async (resolve, reject) => {
            const workspaceHasVagrantFile = fs.existsSync('Vagrantfile');

            const questions: { refresh: boolean; useVagrant: boolean; vagrantDir: string } = await inquirer.prompt([
                {
                    name: 'useVagrant',
                    message: 'Do you want to use vagrant?',
                    type: 'confirm',
                    when: workspaceHasVagrantFile,
                },
                {
                    name: 'vagrantDir',
                    message: 'Vagrant workspace directory?',
                    default: defaultVagrantConfig.vagrant.deployDir,
                    type: 'input',
                    when: (answers): boolean => answers.useVagrant,
                },
            ]);

            if (questions.useVagrant) {
                defaultVagrantConfig.vagrant.deployDir = questions.vagrantDir;
                return await VConfig.updateWorkspaceConfig(defaultVagrantConfig)
                    .then(resolve)
                    .catch((err: Error) => reject(err.message));
            }

            resolve();
        });
}

export const vagrantSetup = async (): Promise<void> => new VagrantSetup().run();
