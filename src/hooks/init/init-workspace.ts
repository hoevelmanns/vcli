import { Hook, Plugin, Command } from '@oclif/config';
import { CustomCommand } from '../../shell/models';
import { IConfiguration, ICustomCommand } from '../../shared/types';
import { vcConfig, VConfig } from '../../shared/models';

global.config = <IConfiguration>{};

const hook: Hook<'init'> = async function (opts): Promise<void> {
    await vcConfig.initWorkspace(opts.config);

    const corePlugin = (await opts.config.plugins[0]) as Plugin,
        processed: string[] = [];

    if (process.argv.length > 2) {
        // if params length > 2 then push only the current command to the command collection
        const command = global.config?.workspace?.customCommands?.find((item) => item.name === process.argv[2]);
        if (command) {
            global.config.workspace.customCommands = [command];
        }
    }

    global.config.workspace?.customCommands?.forEach((item: ICustomCommand) => {
        if (processed.includes(item.id)) return;

        corePlugin.commands.push((<Command.Plugin>(<Command>{
            ...item,
            load(): CustomCommand {
                return new CustomCommand(process.argv, VConfig.oclifConfig).set(item);
            },
        })) as Command.Plugin);
        processed.push(item.id);
    });
};

export default hook;
