import { Command, IConfig } from '@oclif/config';

export interface IConfiguration extends IConfig {
    workspace: IWorkspaceConfig;
}

export interface IWorkspaceConfig {
    name?: string;
    root: string;
    configFile: string;
    vagrant?: IVagrantConfig;
    notifications?: INotificationConfig;
    consoles?: IExternalConsole[];
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
}

export interface IExternalConsole {
    parserStartString: string;
    executable: string;
    list: string;
    name?: string;
    prefix?: string;
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