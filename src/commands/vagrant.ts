import { flags } from '@oclif/command';
import Command from './base';
import { CustomCommand, vagrant } from '../shell';
import { VConfig } from '../config';
import { ICustomCommand } from '../shared/types';
import Index from '@oclif/plugin-autocomplete/lib/commands/autocomplete';

export default class VagrantCommand extends Command {
    static hidden = false;

    static description = 'vagrant wrapper'; // todo description

    static usage = 'vc vagrant [COMMAND]';

    static aliases = ['v'];

    static strict = false;

    static args = [{ name: 'composer' }, { name: 'npm' }, { name: 'yarn' }];

    static flags = {
        ...Command.flags,
        help: flags.help({ char: 'h' }),
        up: flags.boolean({
            char: 'u',
            description: 'start the VM',
        }),
        halt: flags.boolean({
            char: 's',
            description: 'stop the VM',
        }),
    };

    run = async (): Promise<void> => {
        const { flags } = this.parse(VagrantCommand);

        if (flags.up) return vagrant.startMachine(false);
        if (flags.halt) return vagrant.haltMachine();

        // passing arguments to vagrant
        const commandName = process.argv.slice(3, process.argv.length).join(' ').trim();

        if (!commandName) {
            return VagrantCommand.run(['-h'], this.config);
        }

        await new CustomCommand(process.argv, VConfig.oclifConfig)
            .set(<ICustomCommand>{
                runInVagrant: true,
                name: commandName,
                context: 'custom',
            })
            .run();
    };
}
