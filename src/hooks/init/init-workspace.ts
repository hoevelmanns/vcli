import { Hook, Plugin, Command } from '@oclif/config';
import { ExternalCommand } from '../../shell/models';
import { IConfiguration, IExternalCommand } from '../../shared/types';
import { vcConfig, VConfig } from '../../shared/models';

global.config = <IConfiguration>{};

const hook: Hook<'init'> = async function (opts): Promise<void> {
    await vcConfig.initWorkspace(opts.config);

    const corePlugin = (await opts.config.plugins[0]) as Plugin,
        processed: string[] = [],
        commandName = process.argv[2],
        externalCommand = global.config?.workspace?.externalCommand?.find((item) => item.name === commandName);

    if (externalCommand) global.config.workspace.externalCommand = [externalCommand];

    global.config.workspace?.externalCommand?.forEach((item: IExternalCommand) => {
        if (processed.includes(item.id)) return;

        corePlugin.commands.push((<Command.Plugin>(<Command>{
            ...item,
            load(): ExternalCommand {
                return new ExternalCommand(process.argv, VConfig.oclifConfig).set(item);
            },
        })) as Command.Plugin);
        processed.push(item.id);
    });
};

export default hook;
