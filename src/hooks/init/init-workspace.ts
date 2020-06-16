import { Hook, Plugin, Command } from "@oclif/config";
import { CustomCommand } from "../../shell/models";
import { ICustomCommand } from "../../shared/types";
import { initConfig } from "../../shared/utils";

const hook: Hook<"init"> = async function(opts): Promise<void> {
  await initConfig(opts.config);
  const corePlugin = opts.config.plugins[0] as Plugin; // corePlugin

  global.config.workspace.customCommands?.forEach((item: ICustomCommand) => {
    corePlugin.commands.push((<Command.Plugin>(<unknown>{
      ...item,
      load(): CustomCommand {
        return new CustomCommand(item.name, item.description, item.execute, item.type, item.context);
      }
    })) as Command.Plugin);
  });
};

export default hook;
