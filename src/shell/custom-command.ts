import { Vagrant } from './vagrant';
import { ICustomCommand } from '../shared/types';
import { actionTxt, infoTxt } from '../shared';
import { isMachineNotUp } from './errors';
import cli from 'cli-ux';
import { IShellOptions } from './types';

export class CustomCommand extends Vagrant {
  static hidden = true;
  private readonly data = <ICustomCommand>{};

  constructor(private item: ICustomCommand) {
    super();
    this.data = item;
    return this;
  }

  /**
   *
   * @param forceRunInVM
   */
  public run = async (forceRunInVM = false): Promise<void> => {
    const { execute } = this.data,
      args = process.argv,
      command = [execute, args.slice(3, args.length).join(' ')].join(' ').trim(),
      runInVM = this.data.runInVM ?? forceRunInVM,
      runInProjectRoot = this.data.runInProjectRoot,
      actionInfo = actionTxt(`Executing${runInVM ? ' (VM):' : ':'} ${infoTxt(command)}`),
      options: IShellOptions = { runInVM, runInProjectRoot };

    cli.info(actionInfo);

    await this.spawn(command, options).catch(async (err: Error) => {
      if (isMachineNotUp(err)) {
        await this.startMachineIfNotUp();
        return this.run(runInVM);
      }
    });
  };

  public get vagrant(): CustomCommand {
    this.data.runInVM = true;
    return this;
  }
}
