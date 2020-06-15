export interface Flags {
    [key: string]: string;
}

export interface ShellCommandOptions {
    command: string;
    flags?: Flags;
    runInVagrant?: boolean;
    displayText?: string;
}

export interface ConsoleCommand {
    name: string;
    execute: string;
    description?: string;
    type: CommandType;
    context: string;
    prefix?: string;
}

export enum CommandType {
    external = 'external',
    vc = 'vc',
}

export type CommandModelTemplate = ConsoleCommand;
