import { CustomCommand, Vagrant } from '../shell';
import { ICustomCommand } from '../shared/types';
import Command, { flags } from '@oclif/command';

export default class VagrantCommand extends Command {
  static hidden = false;

  static description = 'vagrant wrapper'; // todo description

  static usage = 'vagrant (v) [COMMAND]';

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

    if (flags.up) return new Vagrant().startMachine(false);
    if (flags.halt) return new Vagrant().haltMachine();

    // passing arguments to vagrant
    const commandName = process.argv.slice(3, process.argv.length).join(' ').trim();

    if (!commandName) {
      return VagrantCommand.run(['-h'], this.config);
    }

    await new CustomCommand(<ICustomCommand>{
        runInVM: true,
        name: commandName,
        context: 'custom',
      })
      .run();
  };
}
