import { defaultConfigFile, defaultWorkspace } from '../types/defaults';
import { IConfiguration, IWorkspaceConfig } from '../types';
import { IConfig } from '@oclif/config';
import { v4 as uuidv4 } from 'uuid';
import * as findUp from 'find-up';
import cli from 'cli-ux';
import * as inquirer from 'inquirer';
import { Generator } from '../../generator/models';
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

    async createWorkspace(): Promise<void> {
        // todo force
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
            console.log('Workspace created!');

            await this.setupInquirer();

            process.exit();
        });
    }

    async setupInquirer(): Promise<void> {
        const questions: { refresh: boolean } = await inquirer.prompt([
            {
                name: 'refresh',
                message: 'Generate the commands?',
                type: 'confirm',
            },
        ]);

        if (questions.refresh) await new Generator().run();
    }

    async updateWorkspaceConfig(): Promise<void> {
        return fs.writeJSON(VConfig.workspaceConfigFile, global.config.workspace, { flag: 'w' });
    }

    createWorkspaceConfig = async (config: IWorkspaceConfig): Promise<void> => {
        const configDir = VConfig.oclifConfig.configDir;
        const targetDir = `${configDir}/${config.uuid}`;
        const targetFile = `${targetDir}/config.json`;
        const workspaceConfigFile = `${process.cwd()}/${defaultConfigFile}`;

        return fs.mkdir(targetDir, { recursive: true }).then(async () => {
            await fs.writeFile(targetFile, JSON.stringify(config), { flag: 'w' }).then(async () => {
                try { // todo check if symlink exist
                    await fs.symlink(targetFile, workspaceConfigFile, 'file');
                } catch (e) {}
                await VConfig.setConfig(workspaceConfigFile);
            });
        });
    };
}

export const vcConfig = new VConfig();
