import { shell } from './shell';
import { notify } from '../../shared/utils';

export class Vagrant {
    /**
     * Starts the vagrant machine
     */
    up(): void {
        shell
            .exec({
                command: 'vagrant up',
                displayText: 'Starting machine',
            })
            .then((out) =>
                notify({
                    message: 'Vagrant successfully started',
                }),
            );
    }

    /**
     * Halts the vagrant machine
     */
    halt(): void {
        shell
            .exec({
                command: 'vagrant halt',
                displayText: 'Stopping machine',
            })
            .then((out) => notify({ message: 'Vagrant stopped' }));
    }
}
