import { flags } from '@oclif/command';
import Command from './base';
import { Generator } from '../libs/generator/models';

export default class Refresh extends Command {
    static hidden = false;

    static description = 'add commands from external consoles defined in .vclirc.json to VCLI';

    static flags = {
        ...Command.flags,
        help: flags.help({ char: 'h' }),
        vagrant: flags.boolean({
            char: 'v',
            type: 'boolean',
            description: 'run generator in vagrant',
        }),
    };

    async run() {
        const { flags } = this.parse(Refresh);

        new Generator().run(flags.vagrant);
    }
}
