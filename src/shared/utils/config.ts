import { defaultConfigFile, defaultWorkspace } from '../types/defaults';
import { IConfiguration, IWorkspaceConfig } from '../types';
import { IConfig } from '@oclif/config';
import { v4 as uuidv4 } from 'uuid';
import * as findUp from 'find-up';
import cli from 'cli-ux';
const fs = require('fs-extra');

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
        VConfig.oclifConfig = oclifConfig;
        const workspaceConfigFile = await findUp(defaultConfigFile); // todo remove

        if (!workspaceConfigFile) {
            await this.createWorkspace(true);
            return;
        }

        VConfig.workspaceConfigFile = workspaceConfigFile;

        let workspaceConfig = await fs.readJSON(VConfig.workspaceConfigFile);
        const workspaceDir = VConfig.workspaceConfigFile.replace(defaultConfigFile, '');

        workspaceConfig = {
            ...workspaceConfig,
            ...{ configFile: VConfig.workspaceConfigFile },
            ...{ root: workspaceDir },
        };

        Object.assign(global.config, {
            ...oclifConfig,
            ...{ workspace: { ...workspaceConfig } },
        });
    }

    /**
     *
     * @param force
     */
    async createWorkspace(force: true) {
        const pkgJsonPath = process.cwd() + '/package.json';
        const localPackageJson = (await fs.pathExists(pkgJsonPath)) ? await fs.readJson(pkgJsonPath) : null;
        const name = await cli.prompt('What is the name of the workspace?', { default: localPackageJson?.name ?? '' });
        const root = process.cwd(); // remove
        const uuid = uuidv4(name);

        const config: IWorkspaceConfig = {
            ...defaultWorkspace,
            name,
            uuid,
            root,
        };

        await this.createWorkspaceConfig(config).then(() => {
            console.log('Workspace created!');
            // todo prompting: which consoles? refresh?
            process.exit();
        });
    }

    async updateWorkspaceConfig(): Promise<void> {
        return fs.writeJSON(VConfig.workspaceConfigFile, global.config.workspace, { flag: 'w' });
    }

    createWorkspaceConfig = async (config: IWorkspaceConfig): Promise<void> => {
        const configDir = VConfig.oclifConfig.configDir;
        const targetDir = `${configDir}/${config.uuid}`;
        const targetFile = `${targetDir}/config.json`;

        return fs.mkdir(targetDir).then(async () => {
            await fs.writeFile(targetFile, JSON.stringify(config), { flag: 'w' }).then(async () => {
                await fs.symlink(targetFile, `${process.cwd()}/${defaultConfigFile}`, 'file', (err: any) => {
                    if (err) throw err;
                });
            });
        });
    };
}

export const vcConfig = new VConfig();
