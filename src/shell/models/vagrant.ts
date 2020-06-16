import { shell } from './shell';
import { notify } from '../../shared/utils';
import cli from 'cli-ux';

export class Vagrant {
    /**
     * Starts the vagrant machine
     */

    up(): void {
        cli.action.start('Starting machine');

        shell.exec('vagrant up').subscribe(() => notify('Vagrant successfully started'));
    }

    /**
     * Halts the vagrant machine
     */
    halt(): void {
        cli.action.start('Stopping machine');

        shell.exec('vagrant halt').subscribe(() => notify('Vagrant stopped'));
    }
}

export const vagrant = new Vagrant();
