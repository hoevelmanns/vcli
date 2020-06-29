import { flags } from '@oclif/command';
import Command from './base';
import { vagrant } from '../shell';

export default class Up extends Command {
    static hidden = false;

    static description = 'start the machine';

    static usage = 'up';

    static flags = {
        ...Command.flags,
        help: flags.help({ char: 'h' }),
    };

    run = async (): Promise<void> => await vagrant.up(false);
}
