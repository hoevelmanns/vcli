import { Command, IConfig } from '@oclif/config';
import { exists } from 'fs';

export interface IConfiguration extends IConfig {
    workspace: IWorkspaceConfig;
}
export interface IEnvironment {
    machineUp: boolean;
}

export interface IWorkspaceConfig {
    name: string;
    uuid: string;
    root: string;
    configFile?: string;
    vagrant?: IVagrantConfig;
    notifications?: INotificationConfig;
    consoles?: IExternalConsole[];
    topics?: { [key: string]: string };
    customCommands?: ICustomCommand[];
}

export interface ICustomCommand extends Command {
    id: string;
    name: string;
    execute: string;
    description: string;
    context: string;
    hidden: boolean; // todo
    prefix?: string;
    type: CommandType;
    runInVM?: boolean;
    topicName?: string;
}

export interface IExternalConsole {
    parserStartString: string;
    executable: string;
    list: string;
    name?: string;
    topicName?: string;
    regexList: string;
    topicDescription?: string;
}

export interface IVagrantConfig {
    deployDir: string;
}

export interface INotificationConfig {
    disabled: boolean;
    time: number;
}

export enum CommandType {
    external = 'external',
    vc = 'vc',
}
