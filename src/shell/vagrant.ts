import cli from 'cli-ux';
import { infoTxt, notify, warningTxt } from '../shared';
import { shell } from './shell';

const confirm = require('@inquirer/confirm');

export class Vagrant {
  /**
   * Starts the vagrant machine
   */

  startMachine = async (silent = false): Promise<void> => {
    const actionInfo = infoTxt('Starting machine');

    cli.info(actionInfo);

    shell
      .spawn('vagrant up', { silent })
      .then(() => notify('Vagrant successfully started'))
      .catch((err) => notify(`Error starting VM: ${err}`));
  };

  /**
   * Halts the vagrant machine
   */
  haltMachine = async (silent = false): Promise<void> => {
    const actionInfo = infoTxt('Stopping machine');

    cli.info(actionInfo);

    shell
      .spawn('vagrant halt', { silent })
      .then(() => notify('Vagrant stopped'))
      .catch((err) => notify(`Error halting VM: ${err}`));
  };

  isMachineUp = async (): Promise<boolean> =>
    shell.exec('vagrant status', { silent: true }).then((res) => res.includes('The VM is running'));

  startMachineIfNotUp = async (silent = true): Promise<void> => {
    await cli.action.pauseAsync(async () => {
      const startVM = await confirm({ message: 'VM is not running. Start now and execute command again?' });

      if (startVM) return this.startMachine(true);

      console.log(warningTxt('Aborted.'));
      process.exit();
    });
  };
}

export const vagrant = new Vagrant();
