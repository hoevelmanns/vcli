import { defaultConfigFile, defaultVagrantConfig, defaultWorkspace } from '../types/defaults';
import { IConfiguration, IWorkspaceConfig } from '../types';
import { IConfig } from '@oclif/config';
import { v4 as uuidv4 } from 'uuid';
import * as findUp from 'find-up';
import cli from 'cli-ux';
import * as inquirer from 'inquirer';
import { Generator } from '../../generator/models';
import { actionTxt, errorTxt, successTxt, whiteTxt } from './logging';
const fs = require('fs-extra'); // todo use @types/fs-extra if fixed
import { shell } from '../../shell/models';

global.config = <IConfiguration>{};

export class VConfig {
    private static oclifConfig: IConfig;
    private static workspaceConfigFile: string;
    private workspaceHasVagrantFile = false;

    /**
     * The entry point of the workspace configuration
     *
     * @param oclifConfig
     * @returns void
     */
    initWorkspace = async (oclifConfig: IConfig): Promise<void> => {
        this.workspaceHasVagrantFile = fs.existsSync('Vagrantfile');

        VConfig.oclifConfig = oclifConfig;

        const workspaceConfigFile = await findUp(defaultConfigFile);

        if (!workspaceConfigFile) {
            await this.createWorkspace()
                .then(async () => await this.setupVagrant())
                .then(async () => await this.setupGenerator())
                .then(async () => await this.setupAutocomplete())
                .catch((err: Error) => console.log(errorTxt('Error creating workspace: '), whiteTxt(err.message)));
        }

        await VConfig.setConfig(workspaceConfigFile);
    };

    async updateWorkspaceConfig(config: Partial<IWorkspaceConfig>): Promise<void> {
        global.config.workspace = { ...global.config.workspace, ...config };
        await fs.writeJSON(VConfig.workspaceConfigFile, global.config.workspace, { flag: 'w' });
    }

    /**
     * @returns void
     */
    setupVagrant = async (): Promise<void> =>
        new Promise(async (resolve, reject) => {
            const questions: { refresh: boolean; useVagrant: boolean; vagrantDir: string } = await inquirer.prompt([
                {
                    name: 'useVagrant',
                    message: 'Do you want to use vagrant?',
                    type: 'confirm',
                    when: this.workspaceHasVagrantFile,
                },
                {
                    name: 'vagrantDir',
                    message: 'Vagrant workspace directory?',
                    default: defaultVagrantConfig.vagrant.deployDir,
                    type: 'input',
                    when: (answers) => answers.useVagrant,
                },
            ]);

            if (questions.useVagrant) {
                defaultVagrantConfig.vagrant.deployDir = questions.vagrantDir;
                return await this.updateWorkspaceConfig(defaultVagrantConfig)
                    .then(() => resolve())
                    .catch((err: Error) => reject(err.message));
            }

            resolve();
        });

    /**
     * Triggers the generation of external cli commands
     */
    setupGenerator = async () =>
        new Promise(async (resolve, reject) => {
            const questions: { refresh: boolean } = await inquirer.prompt([
                {
                    name: 'refresh',
                    message: 'Generate the commands now? (vc refresh)',
                    type: 'confirm',
                },
            ]);

            if (questions.refresh) {
                return await new Generator()
                    .run(true)
                    .then((res) => resolve(res))
                    .catch((err) => reject(err));
            }

            resolve();
        });

    /**
     * Adds the autocomplete env var to the shell profile and source it
     */
    setupAutocomplete = async (): Promise<void> => {
        const shellName = VConfig.oclifConfig.shell;
        const bin = VConfig.oclifConfig.bin;
        const shellCommand = `printf "$(${bin} autocomplete:script ${shellName})" >> ~/.${shellName}rc`;

        if (await this.hasShellProfileAutocompleteEnvVars(bin, shellName)) {
            return;
        }

        cli.action.start(actionTxt('Adding the autocomplete env var to the shell profile and source it'));
        await shell
            .exec(shellCommand)
            .then(() => shell.exec(`/bin/${shellName} -c "source ~/.${shellName}rc"`))
            .then(() => shell.execSync(`exec ${shellName}`))
            .then(() => cli.action.stop())
            .catch((err: Error) => console.error(errorTxt('Error setting up autocomplete: '), err.message));
    };

    /**
     *
     * @param bin
     * @param shellName
     */
    private hasShellProfileAutocompleteEnvVars = async (bin: string, shellName: string): Promise<boolean> => {
        const shellProfile = await fs.readFile(VConfig.oclifConfig.home + `/.${shellName}rc`, 'utf8');
        return shellProfile.match(`${bin.toUpperCase()}_AC_ZSH_SETUP_PATH`);
    };

    /**
     *
     * @param workspaceConfigFile
     * @returns void
     */
    private static async setConfig(workspaceConfigFile?: string): Promise<void> {
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
        const pkgJsonPath = process.cwd() + '/package.json';
        const currentPathHasPkgJson = await fs.pathExists(pkgJsonPath);
        const localPackageJson = currentPathHasPkgJson ? await fs.readJson(pkgJsonPath) : null;
        const workspaceName = await cli.prompt('What is the name of the workspace?', {
            default: localPackageJson?.name ?? '',
        });
        const root = process.cwd();
        const uuid = uuidv4(workspaceName);
        const config: IWorkspaceConfig = { ...defaultWorkspace, name: workspaceName, uuid, root };

        await this.createWorkspaceConfig(config)
            .then(() => console.log(successTxt(`Workspace "${config.name}" created!`), '\n'))
            .catch((err) => console.error(err));
    };

    /**
     *
     * @param config
     */
    private createWorkspaceConfig = (config: IWorkspaceConfig): Promise<void> =>
        new Promise((resolve, reject) => {
            const configDir = VConfig.oclifConfig.configDir;
            const targetDir = `${configDir}/${config.uuid}`;
            const targetFile = `${targetDir}/config.json`;

            VConfig.workspaceConfigFile = `${process.cwd()}/${defaultConfigFile}`;

            try {
                fs.mkdirSync(targetDir, { recursive: true });
                fs.writeFileSync(targetFile, JSON.stringify(config), { flag: 'w' });

                if (fs.existsSync(targetFile)) {
                    fs.renameSync(targetFile, VConfig.workspaceConfigFile);
                } else {
                    fs.symlink(targetFile, VConfig.workspaceConfigFile, 'file');
                }
                resolve(VConfig.setConfig().finally());
            } catch (e) {
                console.log('Error creating the workspace configuration: ', e);
                reject(e);
            }
        });
}

export const vcConfig = new VConfig();
