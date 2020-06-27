import { Generator } from '../generator/models';
import { flags } from '@oclif/command';
import Command from './base';

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

    async run(): Promise<void> {
        const { flags } = this.parse(Refresh);

        await new Generator().run(flags.vagrant);
    }
}
