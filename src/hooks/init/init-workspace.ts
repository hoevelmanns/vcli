import { Hook, Plugin, Command } from '@oclif/config';
import { IConfiguration, ICustomCommand } from '../../shared/types';
import { vcConfig, VConfig } from '../../config';
import { vagrantSetup } from '../../shell/vagrant-setup';
import { generatorSetup } from '../../generator/generator-setup';
import { autocompleteSetup } from '../../autocomplete';
import { errorTxt, whiteTxt } from '../../shared';
import { CustomCommand } from '../../shell';

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
