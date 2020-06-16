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
    consoles?: IExternalConsoles;
    customCommands?: ICustomCommand[];
}

export interface ICustomCommand extends Command {
    id: string;
    name: string;
    execute: string;
    description: string;
    context: string;
    prefix?: string;
    type: CommandType;
}

export interface IExternalConsoles {
    [key: string]: IExternalConsole;
}

export interface IExternalConsole {
    parserStartString: string;
    executable: string;
    list: string;
    context?: string;
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
