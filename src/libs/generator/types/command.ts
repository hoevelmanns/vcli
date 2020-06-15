export interface Flags {
    [key: string]: string;
}

export interface ShellCommandOptions {
    command: string;
    flags?: Flags;
    vagrant?: boolean;
    displayText?: string;
}

export interface ConsoleCommand {
    name: string;
    execute: string;
    description?: string;
    type: CommandType;
    context: string;
    prefix?: string;
    className?: string;
    flags?: Flags;
}

export enum CommandType {
    external = 'external',
    vc = 'vc',
}
