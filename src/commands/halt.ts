import { flags } from '@oclif/command';
import Command from './base';
import { Vagrant } from '../libs/shell/models';

export default class Halt extends Command {
    static hidden = false;

    static description = 'halt the machine';

    static usage = 'halt';

    static flags = {
        ...Command.flags,
        help: flags.help({ char: 'h' }),
    };

    async run() {
        await new Vagrant().halt();
    }
}
