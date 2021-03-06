import { ICustomCommand, ICustomCommandArg } from '../shared/types';
import { IArgFlag, IShellOptions } from './types';
import { isArgumentMissing } from './errors';
import { Command } from '@oclif/command';
import * as inquirer from 'inquirer';
import { shell } from './shell';
import { cli } from 'cli-ux';
import { IConfig } from '@oclif/config';

export class CustomCommand extends Command {
  static hidden = true;

  constructor(private data: ICustomCommand) {
    super(process.argv.slice(3, process.argv.length), global.config);
    inquirer.registerPrompt('search-list', require('inquirer-search-list'));
  }

  /**
   * @returns ICustomCommandArg[]
   */
  get requiredArgs(): ICustomCommandArg[] {
    return this.data.args?.filter((arg) => arg.required);
  }

  /**
   *
   * @param forceRunInVM
   * @param oclifConfig
   * @param displayPrompt
   */
  run = async (forceRunInVM = false, oclifConfig?: IConfig, displayPrompt = false): Promise<void> => {

    const runInVM = this.data.runInVM ?? forceRunInVM,
      runInProjectRoot = this.data.runInProjectRoot,
      options: IShellOptions = { runInVM, runInProjectRoot };

    if (['v', 'vm'].indexOf(process.argv[2]) > -1) {
      const execute = process.argv.slice(3, process.argv.length).join(' ');
      return await shell.spawn(execute, options);
    }

    try {
      const { args, flags } = this.parse(<any>this.data);
      this.buildExecuteString({ ...args, ...(flags as IArgFlag) });
    } catch (e) {
      if (!isArgumentMissing(e)) return console.log(e.message);
      await this.inquireArguments();
      displayPrompt = true;
    }

    if (displayPrompt) {
      this.data.execute = (
        this.data.execute + (await cli.prompt('', { prompt: `> ${this.data.execute.trim()}`, required: false }))
      ).trim();
    }

    await shell.spawn(this.data.execute, options);
  };

  /**
   * @returns void
   */
  private inquireArguments = async (): Promise<void> => {
    const args = await inquirer.prompt(
      this.requiredArgs.map((arg) => ({
        type: Array.isArray(arg?.options) ? 'search-list': 'input',
        message: arg.description,
        name: arg.name,
        choices: Array.isArray(arg?.options) ? arg?.options?.map((option) => ({ name: option })) : arg?.options,
      })),
    );

    this.buildExecuteString(args);
  };

  /**
   *
   * @param args
   * @returns void
   */
  private buildExecuteString(args: IArgFlag): void {
    this.data.execute = [
      this.data.execute,
      Object.entries(args)
        .map(([key, val]) => (this.data.args.find((arg) => arg.name === key)?.passAsFlag ? `--${key}=${val}` : val))
        .join(' '),
    ].join(' ');
  }

  /**
   * @returns CustomCommand
   */
  public get vagrant(): CustomCommand {
    this.data.runInVM = true;
    return this;
  }
}
