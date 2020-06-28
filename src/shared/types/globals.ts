import { Command, IConfig } from '@oclif/config';

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
    externalCommand?: IExternalCommand[];
}

export interface IExternalCommand extends Command {
    id: string;
    name: string;
    execute: string;
    description: string;
    context: string;
    hidden: boolean; // todo
    prefix?: string;
    type: CommandType;
    runInVagrant?: boolean;
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
