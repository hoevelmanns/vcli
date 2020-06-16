import { Hook, Plugin, Command } from '@oclif/config';
import { initConfig } from '../../libs/shared/utils';
import { CustomCommand } from "../../libs/shell/models";
import { CommandType } from "../../libs/shell/types";
import { ICustomCommand } from "../../libs/shared/types";

// todo rename hook
const hook: Hook<'init'> = async function (opts) {
    await initConfig(opts.config);

    const testCommand: ICustomCommand = {
        aliases: [],
        args: [],
        flags: {},
        id: 'test',
        hidden: false,
        name: 'supermax',
        execute: "ls -l",
        context: 'sym',
        description: 'Makes Max happy',
        type: CommandType.external
    };

    const customCommands: ICustomCommand[] = [testCommand]; // get Commands from vclirc.json

    const corePlugin = opts.config.plugins[0] as Plugin; // corePlugin

    customCommands.forEach((item) => {
        corePlugin.commands.push(<Command.Plugin><unknown>{
            ...item,
            load(): CustomCommand {
                return new CustomCommand(item.name, item.description, item.execute, item.type, item.context);
            }
        } as Command.Plugin);
    });

};

export default hook;
