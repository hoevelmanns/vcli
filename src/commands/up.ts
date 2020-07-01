import Command, { flags } from '@oclif/command';
import { Vagrant } from '../shell';

export default class Up extends Command {
  static hidden = false;

  static description = 'start the machine';

  static usage = 'up';

  static flags = {
    ...Command.flags,
    help: flags.help({ char: 'h' }),
  };

  run = async (): Promise<void> => await new Vagrant().startMachine(false);
}
