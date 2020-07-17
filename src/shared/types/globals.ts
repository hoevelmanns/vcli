import { Command, IConfig } from '@oclif/config';
import Arg = Command.Arg;

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
  pkgManagers?: IPackageManager[];
  topics?: { [key: string]: string };
  customCommands?: ICustomCommand[];
  packageJson?: { [key: string]: string | undefined };
  composerJson?: { [key: string]: string | undefined };
}

export interface ICustomCommand extends Command {
  id: string;
  //name: string;
  execute: string;
  description: string;
  args: ICustomCommandArg[];
  context: string;
  hidden: boolean; // todo
  prefix?: string;
  type: CommandType;
  runInVM?: boolean;
  runInProjectRoot?: boolean;
  topicName?: string;
  ignore?: boolean;
  checked?: boolean;
}

export interface ICustomCommandArg extends Arg {
  variableConstruct?: string;
  passAsFlag?: boolean;
}

export type IPackageManager = IExternalConsole;

export interface IExternalConsole {
  parserStartString: string;
  executable: string;
  list?: string;
  name: string;
  topicName?: string;
  regexList: string;
  topicDescription?: string;
  context: string;
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
