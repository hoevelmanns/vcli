import Command, { flags } from '@oclif/command';
import { Vagrant } from '../shell';

export default class Halt extends Command {
  static hidden = false;

  static description = 'halt the machine';

  static usage = 'halt';

  static flags: flags.Input<any> = {
    ...Command.flags,
    help: flags.help({ char: 'h' }),
  };

  run = async (): Promise<void> => await new Vagrant().haltMachine();
}
