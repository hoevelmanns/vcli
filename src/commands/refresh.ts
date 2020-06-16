import { flags } from '@oclif/command';
import Command from './base';
import { Generator } from '../libs/generator/models';

export default class Refresh extends Command {
    static hidden = false;

    static description = 'generate commands for external consoles'; // todo description

    static flags = {
        ...Command.flags,
        help: flags.help({ char: 'h' }),
        vagrant: flags.boolean({
            char: 'v',
            type: 'boolean',
            description: 'run generator in vagrant',
        }), // todo description
    };

    async run() {
        const { flags } = this.parse(Refresh);

        new Generator().run(flags.vagrant);
    }
}
