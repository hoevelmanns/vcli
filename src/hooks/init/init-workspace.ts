import { Hook, Plugin, Command } from '@oclif/config';
import { CustomCommand } from '../../shell/models';
import { ICustomCommand } from '../../shared/types';
import { vcConfig } from "../../shared/utils";

const hook: Hook<'init'> = async function (opts): Promise<void> {
    await vcConfig.initWorkspace(opts.config);

    const corePlugin = opts.config.plugins[0] as Plugin;
    //console.log(global.config.configDir)
    console.log(global.config)

    global.config.workspace.customCommands?.map((item: ICustomCommand) =>
        corePlugin.commands.push((<Command.Plugin>(<unknown>{
            ...item,
            load(): CustomCommand {
                return new CustomCommand(item.name, item.description, item.execute, item.type, item.context, item.id);
            },
        })) as Command.Plugin),
    );
};

export default hook;
