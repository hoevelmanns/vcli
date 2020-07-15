import Command, { flags } from '@oclif/command';

export default class Create extends Command {
  static hidden = false;

  static description = 'create workspace'; // todo description

  static flags: flags.Input<any> = {
    ...Command.flags,
    help: flags.help({ char: 'h' }),
    create: flags.boolean({ char: 'n', description: 'create workspace' }),
  };

  async run(): Promise<void> {
    const { flags } = this.parse(Create);

    !flags.create || this.log('started create workspace task - todo');
  }
}
