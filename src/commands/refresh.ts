import Command, { flags } from '@oclif/command';
import { Generator } from '../generator';
import { VConfig } from '../config';

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
    force: flags.boolean({
      char: 'f',
      type: 'boolean',
      description: 'delete existing external commands',
    }),
  };

  async run(): Promise<void> {
    const { flags } = this.parse(Refresh);

    await VConfig.getInstance().initPackageManagerConfig();
    await new Generator().run(flags.vagrant, flags.force);
  }
}
