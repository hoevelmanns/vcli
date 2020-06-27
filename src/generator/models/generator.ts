import { CommandType, ICustomCommand, IExternalConsole } from '../../shared/types';
import { actionTxt, errorTxt, successTxt, VConfig } from '../../shared/models';
import cli from 'cli-ux';
import { shell, vagrant } from '../../shell/models';

export class Generator {
    private ignoreCommands = ['list', 'help'];
    private commands: ICustomCommand[] = [];
    private runInVagrant = false;
    private processedCommands: string[] = [];

    get vagrant(): Generator {
        this.runInVagrant = true;
        return this;
    }

    /**
     * The entry point of the generator
     *
     */
    async run(runInVagrant = false): Promise<void> {
        const consoles = global?.config?.workspace?.consoles;
        if (!consoles) return cli.error(errorTxt('No consoles defined in .vclirc.json'));

        this.runInVagrant = runInVagrant;

        if (runInVagrant) await vagrant.startMachineIfNotUp();

        cli.action.start(actionTxt('Adding the cli commands from external consoles. Please wait'));

        await Promise.all(
            consoles.map(async (consoleConfig) => {
                const { name } = consoleConfig;

                try {
                    const parsedCommands = await this.parseCommandsFromConsoleList(consoleConfig);
                    parsedCommands?.map((command) => this.addCommand('test', command.trim(), consoleConfig));
                    console.info(successTxt(`Commands from "${name}" successfully added!`));
                } catch (e) {
                    console.log(errorTxt(`Generating commands from "${name}" failed:`), e.message);
                }
            }),
        );
        await this.storeCommands();
    }

    /**
     *
     * Adds a command to the command collection state
     *
     * @param description
     * @param command
     * @param console
     */
    addCommand = (description: string, command: string, console: IExternalConsole): void | number => {
        const { topicName, name, executable } = console;

        if (this.processedCommands.includes(command + name)) return;

        this.commands.push({
            aliases: [],
            args: [],
            flags: {},
            hidden: false,
            id: topicName ? topicName + ':' + command : command, // todo
            name: topicName ? topicName + ':' + command : command, // todo
            description,
            execute: `${executable} ${command}`,
            type: CommandType.external,
            context: name ?? 'unknown',
            runInVagrant: this.runInVagrant,
        });

        this.processedCommands.push(command + console.name);
    };

    /**
     * Parses command from console command list by given regex
     *
     * @param consoleConfig
     */
    private async parseCommandsFromConsoleList(
        consoleConfig: IExternalConsole,
    ): Promise<RegExpMatchArray | null | undefined> {
        const { executable, list, regexList } = consoleConfig,
            listCommand = `${executable} ${list}`,
            commandList = await this.fetchConsoleCommandList(listCommand);

        return commandList?.match(new RegExp(regexList, 'gm'));
    }

    /**
     * Fetches the command list from external console by given list command, e.g. /bin/console -l
     *
     * @param listCommand
     */
    private fetchConsoleCommandList = async (listCommand: string): Promise<string> => {
        return shell.exec(listCommand, { runInVagrant: this.runInVagrant, runInProjectRoot: true, silent: true }); // todo runInVagrant
    };

    /**
     * Stores the parsed commands in the workspace configuration file
     *
     */
    private async storeCommands(): Promise<void> {
        return await VConfig.updateWorkspaceConfig({ customCommands: this.commands });
    }
}
