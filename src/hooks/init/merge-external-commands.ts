import { Hook, Plugin, Command } from '@oclif/config';
import { config, initConfig } from '../../libs/shared/utils';
import { CustomCommand } from '../../libs/shell/models';

// todo rename hook
const hook: Hook<'init'> = async function (opts) {
    await initConfig(opts.config);

    const corePlugin = opts.config.plugins[0] as Plugin; // corePlugin

    config.workspace.customCommands?.forEach((item) => {
        corePlugin.commands.push((<Command.Plugin>(<unknown>{
            ...item,
            load(): CustomCommand {
                return new CustomCommand(item.name, item.description, item.execute, item.type, item.context);
            },
        })) as Command.Plugin);
    });
};

export default hook;
