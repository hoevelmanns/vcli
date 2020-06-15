import * as fs from 'fs';
import { CliConfig } from '../types';
import * as findUp from 'find-up';

export const defaultConfigFile = '.vclirc.json';
export let projectRoot: string;
export let projectConfig = <CliConfig>{};

export async function setProjectConfig(): Promise<void> {
    const config = fs.readFileSync(`${projectRoot}/${defaultConfigFile}`).toString();
    projectConfig = JSON.parse(config);
}

export async function setProjectRoot() {
    const configFilePath = await findUp(defaultConfigFile);
    if (!configFilePath) {
        return new Error(`The configuration file "${defaultConfigFile}" in project root is missing.`);
    }
    projectRoot = configFilePath.replace(defaultConfigFile, '');
}

// todo find a better name
export async function initProject() {
    if (projectRoot) {
        return;
    }
    await setProjectRoot();
    await setProjectConfig();
}
