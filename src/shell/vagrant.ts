import { Shell } from './shell';
import cli from 'cli-ux';
import { infoTxt, notify, warningTxt } from '../shared';
const confirm = require('@inquirer/confirm');

export class Vagrant extends Shell {
  /**
   * Starts the vagrant machine
   */

  startMachine = async (silent = false): Promise<void> => {
    const actionInfo = infoTxt('Starting machine');

    await this.exec('vagrant up', { silent, actionInfo })
      .then(() => {
        cli.action.stop();
        notify('Vagrant successfully started');
      })
      .catch((err) => notify(`Error starting VM: ${err}`));
  };

  /**
   * Halts the vagrant machine
   */
  haltMachine(silent = false): void {
    const actionInfo = infoTxt('Stopping machine');

    this.exec('vagrant halt', { silent, actionInfo })
      .then(() => notify('Vagrant stopped'))
      .catch((err) => notify(`Error halting VM: ${err}`));
  }

  isMachineUp = async (): Promise<boolean> =>
    await this.exec('vagrant status', { silent: true }).then((res) => res.includes('The VM is running'));

  startMachineIfNotUp = async (silent = true): Promise<void> => {
    await cli.action.pauseAsync(async () => {
      const startVM = await confirm({ message: 'VM is not running. Start now and execute command again?' });

      if (startVM) return await this.startMachine(true);

      console.log(warningTxt('Aborted.'));
      process.exit();
    });
  };
}

export const vagrant = new Vagrant();
