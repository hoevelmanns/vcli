import { Hook, Command } from '@oclif/config';
import { IConfiguration, ICustomCommand, ICustomCommandArg } from '../../shared/types';
import { vcConfig, VConfig } from '../../config';
import { generatorSetup } from '../../generator/setup';
import { errorTxt, whiteTxt } from '../../shared';
import { CustomCommand } from '../../shell';
import { vagrantSetup } from '../../shell/vagrant-setup';
import { flags } from '@oclif/command';

global.config = <IConfiguration>{};

/**
 *
 * @param arg
 */
const getArgumentOptions = (arg: ICustomCommandArg): string[] | undefined => {
  if (typeof arg.options === 'string') {
    return global.config.workspace?.config?.hasOwnProperty(arg.options)
      ? global.config.workspace?.config[arg.options]
      : undefined;
  }
  // todo check if array empty
  return arg.options;
};

const hook: Hook<'init'> = async function(opts): Promise<void> {
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
      item.args.map((arg: ICustomCommandArg) => (arg.options = getArgumentOptions(arg)));

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
