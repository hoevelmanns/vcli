import Command, { flags } from '@oclif/command';
import { Generator } from '../generator';
import { VConfig } from '../config';

export default class RefreshCommand extends Command {
  static hidden = false;

  static description = 'add commands from external consoles defined in .vclirc.json to VCLI';
  static aliases = ['r'];
  static args = [{ name: 'vm' }];

  static flags: flags.Input<any> = {
    ...Command.flags,
    help: flags.help({ char: 'h' }),
    vm: flags.boolean({
      char: 'v',
      type: 'boolean',
      description: '(alias: vm) run generator in virtual machine',
    }),
    overwrite: flags.boolean({
      char: 'o',
      type: 'boolean',
      description: 'delete existing commands',
    }),
  };

  async run(): Promise<void> {
    const { flags } = this.parse(RefreshCommand);
    const { args } = this.parse(RefreshCommand);

    await VConfig.getInstance().initPackageManagerConfig();
    await new Generator().run(flags.vm || args.vm, flags.force);
  }
}
