import { flags } from '@oclif/command';
import Command from './base';
import { Generator } from '../generator/models';
import Index from '@oclif/plugin-autocomplete/lib/commands/autocomplete';

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

        await new Generator().run(flags.vagrant).then(async () => {
            // Refresh autocomplete
            await Index.run(['-r'], this.config);
        });
    }
}
