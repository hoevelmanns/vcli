import { ICustomCommand, ICustomCommandArg } from '../shared/types';
import { isArgumentMissing } from './errors';
import { Command } from '@oclif/command';
import { IShellOptions } from './types';
import * as inquirer from 'inquirer';
import { shell } from './shell';
import cli from 'cli-ux';

interface IArgFlag {
  [key: string]: unknown;
}

/**
 * todo description & tests
 */
export class CustomCommand extends Command {
  static hidden = true;

  constructor(private data: ICustomCommand) {
    super(process.argv.slice(3, process.argv.length), global.config);
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
   */
  run = async (forceRunInVM = false): Promise<void> => {
    const runInVM = this.data.runInVM ?? forceRunInVM,
      runInProjectRoot = this.data.runInProjectRoot,
      options: IShellOptions = { runInVM, runInProjectRoot };

    try {
      const { args, flags } = this.parse(<any>this.data);
      this.buildExecuteString({ ...args, ...(flags as IArgFlag) });
    } catch (e) {
      if (!isArgumentMissing(e)) return console.log(e.message);
      await this.inquireArguments();
    }

    await shell.spawn(this.data.execute, options);
  };

  /**
   * @returns void
   */
  private inquireArguments = async (): Promise<void> => {
    if (!this.requiredArgs) return;

    const args = await inquirer.prompt(
      this.requiredArgs.map((arg) => ({
        type: 'search-list',
        message: arg.description,
        name: arg.name,
        choices: arg.options,
      })),
    );

    this.buildExecuteString(args);

    await cli.prompt('What is your password?', { prompt: `> ${this.data.execute} `, required: false });
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
