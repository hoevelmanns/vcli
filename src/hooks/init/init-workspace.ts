import { Hook, Plugin, Command } from '@oclif/config';
import { CustomCommand } from '../../shell/models';
import { IConfiguration, ICustomCommand } from '../../shared/types';
import { vcConfig } from '../../shared/models';

global.config = <IConfiguration>{};

const hook: Hook<'init'> = async function (opts): Promise<void> {
    await vcConfig.initWorkspace(opts.config);

    const corePlugin = (await opts.config.plugins[0]) as Plugin,
        processed: string[] = [];

    global.config.workspace?.customCommands?.forEach((item: ICustomCommand) => {
        if (processed.includes(item.id)) {
            console.log('duplicate ', item.id);
            return;
        }
        corePlugin.commands.push((<Command.Plugin>(<Command>{
            ...item,
            load(): CustomCommand {
                return new CustomCommand(
                    item.name,
                    item.description,
                    item.execute,
                    item.type,
                    item.context,
                    item.id,
                    item.runInVagrant,
                );
            },
        })) as Command.Plugin);
        processed.push(item.id);
    });
};

export default hook;
