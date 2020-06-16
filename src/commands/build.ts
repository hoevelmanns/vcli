import { flags } from '@oclif/command';
import Command from './base';
import cli from 'cli-ux';

export default class Build extends Command {
    static description = 'build'; // todo description

    static hidden = false;

    static flags = {
        ...Command.flags,
        help: flags.help({ char: 'h' }),
        clear: flags.string({ char: 'd', description: 'clears the Shopware cache' }),
        generate: flags.string({ char: 'g', description: 'generates a new template cache' }),
        force: flags.boolean({ char: 'f' }),
    };

    async run() {
        cli.action.start('Starting build');
    }
}
