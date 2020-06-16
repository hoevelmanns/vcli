import { flags } from '@oclif/command';
import Command from './base';
import { Generator } from '../libs/generator/models';
import { initProject } from "../libs/shared/utils";

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

        initProject()
          .then(() => new Generator(this.config.root).run(flags.vagrant))
          .catch(err => console.log("error"))

    }
}
