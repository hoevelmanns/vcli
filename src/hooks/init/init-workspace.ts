import { Hook, Plugin, Command } from '@oclif/config';
import { CustomCommand } from '../../shell/models';
import { IConfiguration, ICustomCommand } from '../../shared/types';
import {
    autocompleteSetup,
    generatorSetup,
    vagrantSetup,
    errorTxt,
    vcConfig,
    whiteTxt,
    VConfig
} from "../../shared/models";

global.config = <IConfiguration>{};

const hook: Hook<'init'> = async function (opts): Promise<void> {
    const hasWorkspace = await vcConfig.hasWorkspace(opts.config);

    if (!hasWorkspace) {
        await VConfig.createWorkspace()
          .then(vagrantSetup)
          .then(generatorSetup)
          .then(autocompleteSetup)
          .catch((err: Error) => console.log(errorTxt('Error creating workspace: '), whiteTxt(err.message)));
    }

    const corePlugin = (await opts.config.plugins[0]) as Plugin,
        processed: string[] = [],
        commandName = process.argv[2],
        customCommand = global.config?.workspace?.customCommands?.find((item) => item.name === commandName);

    if (customCommand) global.config.workspace.customCommands = [customCommand];

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
