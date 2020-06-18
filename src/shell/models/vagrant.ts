import { shell } from './shell';
import { notify } from '../../shared/utils';
import cli from 'cli-ux';

export class Vagrant {
    /**
     * Starts the vagrant machine
     */

    up(): void {
        cli.action.start('Starting machine');

        shell
            .exec('vagrant up')
            .then(() => notify('Vagrant successfully started'))
            .catch((err) => notify(`Error starting vagrant: ${err}`));
    }

    /**
     * Halts the vagrant machine
     */
    halt(): void {
        cli.action.start('Stopping machine');

        shell
            .exec('vagrant halt')
            .then(() => notify('Vagrant stopped'))
            .catch((err) => notify(`Error halting vagrant: ${err}`));
    }
}

export const vagrant = new Vagrant();
