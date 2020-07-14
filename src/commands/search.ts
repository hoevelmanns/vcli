import Command, { flags } from '@oclif/command';
import * as inquirer from 'inquirer';
import { ICustomCommand, infoTxt, whiteTxt } from '../shared';
import { CustomCommand } from '../shell';

inquirer.registerPrompt('search-list', require('inquirer-search-list'));

export default class SearchCommand extends Command {
  static hidden = false;
  static aliases = ['s'];
  static description = 'search for commands, apps, etc.'; // todo description

  static flags = {
    ...Command.flags,
    help: flags.help({ char: 'h' }),
  };

  run = async (): Promise<void> => {
    const availableCommands = global.config.workspace.customCommands;
    if (!availableCommands?.length) return;

    inquirer
      .prompt([
        {
          type: 'search-list',
          message: 'Search Command',
          name: 'command',
          choices: availableCommands
            .filter((item) => !item.hidden)
            .map((item) => ({
              name: infoTxt(item.name) + ' ' + whiteTxt(item.description),
              value: item.id,
            })),
          pageSize: 20,
        },
      ])
      .then(
        async (answer: { command: string }) =>
          await new CustomCommand(<ICustomCommand>availableCommands.find((item) => item.id === answer.command)).run(),
      )
      .catch((e) => console.log(e));
  };
}
