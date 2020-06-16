import * as fs from 'fs';
import * as findUp from 'find-up';
import { IConfiguration } from '../types';
import { IConfig } from '@oclif/config';

export const defaultConfigFile = '.vclirc.json';
export let config = <IConfiguration>{};

async function getProjectRoot() {
    const configFilePath = await findUp(defaultConfigFile);
    if (!configFilePath) {
        throw Error(`The configuration file "${defaultConfigFile}" in project root is missing.`);
    }
    return configFilePath.replace(defaultConfigFile, '');
}

export async function initConfig(cliConfig: IConfig): Promise<void> {
    const projectRoot = await getProjectRoot();
    const projectConfig = JSON.parse(fs.readFileSync(`${projectRoot}/${defaultConfigFile}`).toString());
    const configFile = projectRoot + defaultConfigFile;
    config = { ...cliConfig, ...{ workspace: { ...projectConfig, ...{ projectRoot }, ...{ configFile } } } };
}

export const updateWorkspaceConfig = () =>
    fs.writeFileSync(config.workspace.configFile, JSON.stringify(config.workspace), { flag: 'w' });
