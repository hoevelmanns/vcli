import * as fs from 'fs';
import * as findUp from 'find-up';
import { IConfig } from '@oclif/config';
import { IConfiguration } from '../types';

export const defaultConfigFile = '.vclirc.json';

async function getProjectRoot(): Promise<string | void> {
    const configFilePath = await findUp(defaultConfigFile);

    if (!configFilePath) {
        return console.info(`The configuration file "${defaultConfigFile}" in project root is missing.`);
    }
    return configFilePath.replace(defaultConfigFile, '');
}

export async function initConfig(cliConfig: IConfig): Promise<IConfiguration> {
    const workspaceRoot = await getProjectRoot();
    const workspaceConfig = JSON.parse(fs.readFileSync(`${workspaceRoot}/${defaultConfigFile}`).toString());
    const configFile = workspaceRoot + defaultConfigFile;

    global.config = <IConfiguration>{};
    Object.assign(global.config, {
        ...cliConfig,
        ...{ workspace: { ...workspaceConfig, ...{ root: workspaceRoot, configFile } } },
    });
    return global.config;
}

export const updateWorkspaceConfig = () =>
    fs.writeFileSync(global.config.workspace.configFile, JSON.stringify(global.config.workspace), { flag: 'w' });
