import { defaultConfigFile, defaultWorkspace } from '../types/defaults';
import { IConfiguration, IWorkspaceConfig } from '../types';
import { IConfig } from '@oclif/config';
import { v4 as uuidv4 } from 'uuid';
import * as findUp from 'find-up';
import cli from 'cli-ux';
import * as inquirer from 'inquirer';
import { Generator } from '../../generator/models';
import { infoText, successTxtBold } from './logging';
const fs = require('fs-extra'); // todo use @types/fs-extra if fixed

global.config = <IConfiguration>{};

export class VConfig {
    private static oclifConfig: IConfig;
    private static workspaceConfigFile: string;

    /**
     *
     * @param oclifConfig
     * @returns void
     */
    async initWorkspace(oclifConfig: IConfig): Promise<void> {
        const workspaceConfigFile = await findUp(defaultConfigFile);
        VConfig.oclifConfig = oclifConfig;

        if (!workspaceConfigFile) {
            await this.createWorkspace();
            return;
        }

        VConfig.workspaceConfigFile = workspaceConfigFile;

        await VConfig.setConfig();
    }

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
    async createWorkspace(): Promise<void> {
        const pkgJsonPath = process.cwd() + '/package.json';
        const localPackageJson = (await fs.pathExists(pkgJsonPath)) ? await fs.readJson(pkgJsonPath) : null;
        const name = await cli.prompt('What is the name of the workspace?', { default: localPackageJson?.name ?? '' });
        const root = process.cwd();
        const uuid = uuidv4(name);
        const config: IWorkspaceConfig = {
            ...defaultWorkspace,
            name,
            uuid,
            root,
        };

        await this.createWorkspaceConfig(config).then(async () => {
            console.log();
            console.log(successTxtBold(`Workspace "${config.name}" created!`), '\n');
            console.log(infoText('Run "vc refresh" for generating commands.'), '\n');

            await this.setupInquirer();
        });
    }

    /**
     * @returns void
     */
    async setupInquirer(): Promise<void> {
        const questions: { refresh: boolean } = await inquirer.prompt([
            /* todo
            {
                name: 'useVagrant',
                message: 'Do you want to use vagrant?',
                type: "confirm"
            },
            */
            {
                name: 'refresh',
                message: 'Generate the commands (vc refresh) now?',
                type: 'confirm',
            },
        ]);

        if (questions.refresh) await new Generator().run(true);
    }

    async updateWorkspaceConfig(config: Partial<IWorkspaceConfig>): Promise<void> {
        global.config.workspace = { ...global.config.workspace, ...config };
        return fs.writeJSON(VConfig.workspaceConfigFile, global.config.workspace, { flag: 'w' });
    }

    /**
     *
     * @param config
     */
    createWorkspaceConfig = async (config: IWorkspaceConfig): Promise<void> => {
        const configDir = VConfig.oclifConfig.configDir;
        const targetDir = `${configDir}/${config.uuid}`;
        const targetFile = `${targetDir}/config.json`;

        VConfig.workspaceConfigFile = `${process.cwd()}/${defaultConfigFile}`;

        try {
            fs.mkdirSync(targetDir, { recursive: true });
            fs.writeFileSync(targetFile, JSON.stringify(config), { flag: 'w' });

            if (await fs.existsSync(targetFile)) {
                await fs.renameSync(targetFile, VConfig.workspaceConfigFile);
            } else {
                await fs.symlink(targetFile, VConfig.workspaceConfigFile, 'file');
            }
            return await VConfig.setConfig();
        } catch (e) {
            console.log('Error creating the workspace: ', e);
        }
    };
}

export const vcConfig = new VConfig();
