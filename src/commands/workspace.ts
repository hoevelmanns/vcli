import Command, { flags } from '@oclif/command';
import * as inquirer from 'inquirer';
import { VConfig } from '../config';

export default class WorkspaceCommand extends Command {
  static hidden = false;
  static description = 'manage workspace'; // todo description
  static aliases = ['ws'];

  static flags: flags.Input<any> = {
    ...Command.flags,
    help: flags.help({ char: 'h' }),
    hideCommand: flags.boolean({
      char: 'i',
      description: 'hide commands',
    }),
  };

  run = async (): Promise<void> => {
    const { flags } = this.parse(WorkspaceCommand);

    if (flags.hideCommand) {
      const questions: { displayCommands: string[] } = await inquirer.prompt([
        {
          name: 'displayCommands',
          message: 'Which commands should be displayed?', // todo find a topic
          type: 'checkbox',
          pageSize: 50,
          choices: global.config.workspace.customCommands?.map((item) => ({
            name: item.id,
            checked: !item.hidden,
          })),
          when: (answers): boolean => !!global.config.workspace.customCommands?.length,
        },
      ]);

      if (questions.displayCommands) {
        const { customCommands } = global.config.workspace;

        customCommands?.forEach((item) => {
          if (!questions.displayCommands.includes(item.id)) {
            item.hidden = true;
          }
        });

        await VConfig.getInstance().updateWorkspaceConfig({ customCommands });
      }
    }
  };
}
