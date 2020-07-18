import { IExecFunctionOptions } from 'async-shelljs';

export interface Flags {
  [key: string]: string;
}

export interface IArgFlag {
  [key: string]: unknown;
}


export interface IShellOptions extends IExecFunctionOptions {
  runInVM?: boolean;
  runInProjectRoot?: boolean;
  showLockedWarning?: boolean;
  flags?: Flags;
  silent?: boolean;
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
