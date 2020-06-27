import { IExecFunctionOptions } from 'async-shelljs';

export interface Flags {
    [key: string]: string;
}

export interface IShellOptions extends IExecFunctionOptions {
    runInVagrant?: boolean;
    runInProjectRoot?: boolean;
    showLockedWarning?: boolean;
    flags?: Flags;
    actionInfo?: string;
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
