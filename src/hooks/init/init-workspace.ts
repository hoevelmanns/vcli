import { Hook, Command } from '@oclif/config';
import { IConfiguration, ICustomCommand } from '../../shared/types';
import { vcConfig, VConfig } from '../../config';
import { generatorSetup } from '../../generator/setup';
import { errorTxt, whiteTxt } from '../../shared';
import { CustomCommand } from '../../shell';
import { vagrantSetup } from '../../shell/vagrant-setup';
import { flags } from '@oclif/command';

global.config = <IConfiguration>{};

const hook: Hook<'init'> = async function (opts): Promise<void> {
  if (!(await vcConfig.initWorkspace(opts.config))) {
    await vcConfig
      .createWorkspace()
      .then(vagrantSetup)
      .then(generatorSetup)
      .catch((err: Error) => console.log(errorTxt('Error creating workspace: '), whiteTxt(err.message)));
  }

  const vConfig = VConfig.getInstance(),
    cliPluginCommands = vConfig.getCliCommands(),
    processed: string[] = [],
    commandName = process.argv[2],
    customCommand = global.config?.workspace?.customCommands?.find((item) => item.id === commandName);

  if (customCommand) global.config.workspace.customCommands = [customCommand];

  global.config.workspace?.customCommands
    ?.filter((item) => !item.hidden)
    .map((item: ICustomCommand) => {
      if (processed.includes(item.id) || item.ignore) return;

      // adds help flag
      if (!item.flags?.help) item.flags = { ...{ help: flags.help({ char: 'h' }) }, ...item.flags };

      cliPluginCommands?.push(<Command.Plugin>(<Command>{
        ...item,
        load(): CustomCommand {
          return new CustomCommand(item);
        },
      }));
      processed.push(item.id);
    });
};

export default hook;
