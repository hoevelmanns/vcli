import * as fs from 'fs';
import * as findUp from 'find-up';
import { Globals } from '../types';
import { IConfig } from '@oclif/config';

export const defaultConfigFile = '.vclirc.json';
export let config = <Globals>{};

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
    config = { ...cliConfig, ...projectConfig, ...{ projectRoot } };
}
