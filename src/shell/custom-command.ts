import { ICustomCommand, ICustomCommandArg } from '../shared/types';
import { actionTxt, infoTxt, VConfig } from '../shared';
import { IShellOptions } from './types';
import * as inquirer from 'inquirer';
import { Shell } from './shell';
import cli from 'cli-ux';

/**
 * todo description & tests
 */
export class CustomCommand extends Shell {
  static hidden = true;
  private readonly data = <ICustomCommand>{};
  protected execute = '';
  protected givenArgs: string[] = [];

  constructor(private item: ICustomCommand) {
    super();
    this.data = item;
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
  public run = async (forceRunInVM = false): Promise<void> => {
    const { execute } = this.data,
      processArgs = process.argv,
      command = [execute, processArgs.slice(3, processArgs.length).join(' ')].join(' ').trim(),
      runInVM = this.data.runInVM ?? forceRunInVM,
      runInProjectRoot = this.data.runInProjectRoot,
      options: IShellOptions = { runInVM, runInProjectRoot };

    this.execute = command;
    this.givenArgs = command
      .replace(execute, '')
      .trim()
      .split(' ')
      .filter((arg) => arg !== '');

    await this.prepareGivenArguments();

    cli.info(actionTxt(`Executing${runInVM ? ' (VM):' : ':'} ${infoTxt(this.execute)}`));

    await this.spawn(this.execute, options);
  };

  /**
   * @returns void
   */
  private async prepareGivenArguments(): Promise<void> {
    if (!this.givenArgs.length) return await this.inquireArguments();

    const args: { [key: string]: string } = {};

    this.requiredArgs?.map((reqArg, index) => (args[reqArg.name] = this.givenArgs[index]));

    if (!Object.keys(args).length) return;

    this.givenArgs.forEach((arg) => (this.execute = this.execute.replace(arg, '').trim()));

    this.formatExecuteString(args);
  }

  /**
   * @returns void
   */
  private inquireArguments = async (): Promise<void> => {
    if (!this.requiredArgs) return;

    const answers = await inquirer.prompt(
      this.requiredArgs.map((arg) => ({
        type: 'search-list',
        message: arg.description,
        name: arg.name,
        choices: arg.options,
      })),
    );

    this.formatExecuteString(answers);
  };

  /**
   *
   * @param args
   * @returns void
   */
  private formatExecuteString(args: { [key: string]: {} }): void {
    this.execute = [
      this.execute,
      Object.entries(args)
        .map(([key, val]) => (this.requiredArgs.find((arg) => arg.name === key)?.prefix || '') + val)
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
