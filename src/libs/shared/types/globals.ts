import { Command, IConfig } from '@oclif/config';

export interface Globals extends IConfig {
    project?: string;
    projectRoot: string;
    vagrant?: VagrantConfig;
    notifications?: NotificationConfig;
    consoles: ExternalConsoles;
    generatorOutput: string;
    customCommands: ICustomCommand[];
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

export interface ExternalConsoles {
    [key: string]: ExternalConsole;
}

export interface ExternalConsole {
    parserStartString: string;
    executable: string;
    list: string;
    context?: string;
}

export interface VagrantConfig {
    deployDir: string;
}

export interface NotificationConfig {
    disabled: boolean;
    time: number;
}

export enum CommandType {
    external = 'external',
    vc = 'vc',
}

export interface ConsolesCommands {
    [key: string]: ICustomCommand;
}
// todo redundant in lib "shell"
