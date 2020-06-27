import { shell } from './shell';
import { infoTxt, notify } from '../../shared/models';
import { asyncExec } from 'async-shelljs';

export class Vagrant {
    /**
     * Starts the vagrant machine
     */

    async up(silent = false): Promise<void> {
        const actionInfo = infoTxt('Starting machine');

        return await shell
            .exec('vagrant up', { silent, actionInfo })
            .then(() => notify('Vagrant successfully started'))
            .catch((err) => notify(`Error starting VM: ${err}`));
    }

    /**
     * Halts the vagrant machine
     */
    halt(silent = false): void {
        const actionInfo = infoTxt('Stopping machine');

        shell
            .exec('vagrant halt', { silent, actionInfo })
            .then(() => notify('Vagrant stopped'))
            .catch((err) => notify(`Error halting VM: ${err}`));
    }

    isMachineUp = async (): Promise<boolean> =>
        await asyncExec('vagrant status', { silent: true }).then((res) => res.includes('The VM is running'));

    startMachineIfNotUp = async (silent = true): Promise<void> => {
        if (!(await this.isMachineUp())) {
            await this.up(silent);
        }
    };
}

export const vagrant = new Vagrant();
