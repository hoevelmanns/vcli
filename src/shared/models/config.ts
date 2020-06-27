import {
    createOrRenameSymlink,
    existAutoCompleteEnvVar,
    refreshAutocompleteCache,
    showAutocompleteSetupInstructions,
} from '../utils';
import { defaultConfigFile, defaultVagrantConfig, defaultWorkspace } from '../types/defaults';
import { errorTxt, infoTxt, successTxt, whiteTxt } from './logging';
import { IWorkspaceConfig } from '../types';
import { Generator } from '../../generator/models';
import { IConfig } from '@oclif/config';
import * as inquirer from 'inquirer';
import { v4 as uuidv4 } from 'uuid';
import * as findUp from 'find-up';
import cli from 'cli-ux';
const fs = require('fs-extra'); // todo use @types/fs-extra if fixed

export class VConfig {
    public static oclifConfig: IConfig;
    private static workspaceConfigFile: string;

    /**
     * The entry point of the workspace configuration
     *
     * @param oclifConfig
     * @returns void
     */
    initWorkspace = async (oclifConfig: IConfig): Promise<void> => {
        VConfig.oclifConfig = oclifConfig;

        const workspaceConfigFile = await findUp(defaultConfigFile);

        if (workspaceConfigFile) {
            return await VConfig.set(workspaceConfigFile);
        }

        return await this.createWorkspace()
            .then(VConfig.setupVagrant)
            .then(VConfig.setupGenerator)
            .then(VConfig.setupAutocomplete)
            .catch((err: Error) => console.log(errorTxt('Error creating workspace: '), whiteTxt(err.message)));
    };

    static async updateWorkspaceConfig(config: Partial<IWorkspaceConfig>): Promise<void> {
        global.config.workspace = { ...global.config.workspace, ...config };
        await fs.writeJSON(VConfig.workspaceConfigFile, global.config.workspace, { spaces: 2, flag: 'w' });
    }

    /**
     * @returns void
     */
    static setupVagrant = async (): Promise<void> =>
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

    /**
     * Triggers the generation of external cli commands
     */
    static setupGenerator = async (): Promise<void> =>
        new Promise(async (resolve, reject) => {
            const questions: { refresh: boolean; refreshVagrant: boolean } = await inquirer.prompt([
                {
                    name: 'refreshVagrant',
                    message: 'Generate the commands from vagrant now? (vc refresh -v)',
                    type: 'confirm',
                    when: !!global.config.workspace?.vagrant,
                },
                {
                    name: 'refresh',
                    message: 'Generate the commands from host now? (vc refresh)',
                    type: 'confirm',
                    when: (answers): boolean => !answers.refreshVagrant,
                },
            ]);

            if (questions.refresh || questions.refreshVagrant) {
                return await new Generator()
                    .run(questions.refreshVagrant)
                    .then((res) => resolve(res))
                    .catch((err) => reject(err));
            }

            resolve();
        });

    /**
     * Adds the autocomplete env var to the shell profile and source it
     */
    static setupAutocomplete = async (): Promise<void> => {
        const oclifConfig = VConfig.oclifConfig,
            { shell, bin } = oclifConfig,
            successMsg =
                `3) For using the autocompletion please run "${bin}" in a new terminal window or use:` +
                infoTxt(`\n$ exec ${shell}.`) +
                `\n\n4) Run "${bin}" for display available commands`;

        if (await existAutoCompleteEnvVar(bin, shell)) {
            return await refreshAutocompleteCache(oclifConfig);
        }

        return await showAutocompleteSetupInstructions(oclifConfig).then(() => console.log(successMsg));
    };

    /**
     *
     * @param workspaceConfigFile
     * @returns void
     */
    private static async set(workspaceConfigFile?: string): Promise<void> {
        VConfig.workspaceConfigFile = workspaceConfigFile ?? VConfig.workspaceConfigFile;

        let workspaceConfig = await fs.readJSON(VConfig.workspaceConfigFile);
        const workspaceDir = VConfig.workspaceConfigFile?.replace(defaultConfigFile, '');

        workspaceConfig = {
            ...workspaceConfig,
            ...{ configFile: VConfig.workspaceConfigFile },
            ...{ root: workspaceDir },
        };

        Object.assign(global.config, {
            ...VConfig.oclifConfig,
            ...{ workspace: { ...workspaceConfig } },
        });
    }

    /**
     * @returns void
     */
    private createWorkspace = async (): Promise<void> => {
        const pkgJsonPath = process.cwd() + '/package.json',
            currentPathHasPkgJson = await fs.pathExists(pkgJsonPath),
            workspacePkgJson = currentPathHasPkgJson ? await fs.readJson(pkgJsonPath) : null,
            workspaceName = await cli.prompt('What is the name of the workspace?', {
                default: workspacePkgJson?.name ?? '',
            }),
            root = process.cwd(),
            uuid = uuidv4(workspaceName),
            config: IWorkspaceConfig = { ...defaultWorkspace, name: workspaceName, uuid, root };

        await this.createWorkspaceConfigFile(config)
            .then(() => console.log(successTxt(`Workspace "${config.name}" created!`), '\n'))
            .catch((err) => console.error(err));
    };

    /**
     *
     * @param config
     */
    private createWorkspaceConfigFile = (config: IWorkspaceConfig): Promise<void> =>
        new Promise((resolve, reject) => {
            const configDir = VConfig.oclifConfig.configDir,
                targetDir = `${configDir}/${config.uuid}`,
                targetFile = `${targetDir}/config.json`;

            VConfig.workspaceConfigFile = `${process.cwd()}/${defaultConfigFile}`;

            fs.mkdir(targetDir, { recursive: true })
                .then(async () => await fs.writeFile(targetFile, JSON.stringify(config), { flag: 'w' }))
                .then(async () => await createOrRenameSymlink(targetFile, VConfig.workspaceConfigFile))
                .then(() => resolve(VConfig.set()))
                .catch((err: Error) => reject(err));
        });
}

export const vcConfig = new VConfig();
