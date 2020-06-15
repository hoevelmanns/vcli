/*
todo: create workspace
 */
/*
Todo: place generators here
 */

import { flags } from '@oclif/command';
import Command from './base';

export default class Create extends Command {
    static hidden = false;

    static description = 'create workspace'; // todo description

    static flags = {
        ...Command.flags,
        help: flags.help({ char: 'h' }),
        create: flags.boolean({ char: 'n', description: 'create workspace' }),
    };

    async run() {
        const { flags } = this.parse(Create);

        !flags.create || this.log('started create workspace task - todo');
    }
}
