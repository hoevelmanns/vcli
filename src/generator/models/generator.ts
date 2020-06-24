import { actionTxt, errorTxt, successTxt, vcConfig } from '../../shared/models';
import { CommandType, ICustomCommand, IExternalConsole } from '../../shared/types';
import { shell } from '../../shell/models';
import cli from 'cli-ux';

/**
 * todo: refactoring
 */
export class Generator {
    private ignoreCommands = ['list', 'help'];
    private commands: ICustomCommand[] = [];
    private console = <IExternalConsole>{};
    private runInVagrant = false;
    private processedCommands: string[] = [];

    get vagrant(): Generator {
        this.runInVagrant = true;
        return this;
    }

    /**
     * todo description
     */
    async run(runInVagrant = false): Promise<void> {
        const consoles = global?.config?.workspace?.consoles;
        if (!consoles) return cli.error(errorTxt('No consoles defined in .vclirc.json'));

        this.runInVagrant = runInVagrant;

        cli.action.start(actionTxt('Adding the cli commands from external consoles. Please wait'));

        await Promise.all(
            consoles.map((consoleConfig) =>
                this.parseCommandsFromConsoleList(consoleConfig).then((commands) => {
                    commands?.map((command) => this.addCommand('test', command.trim(), consoleConfig));
                    console.info(successTxt(`Commands from "${consoleConfig.name}" successfully added!`));
                }),
            ),
        );

        await this.storeCommands();

        return cli.action.stop();
    }

    /**
     *
     * @param consoleConfig
     */
    private async parseCommandsFromConsoleList(
        consoleConfig: IExternalConsole,
    ): Promise<RegExpMatchArray | null | undefined> {
        const listCommand = `${consoleConfig.executable} ${consoleConfig.list}`,
            commandList = await this.fetchConsoleCommandList(listCommand);
        return commandList?.match(new RegExp(consoleConfig.regexList, 'gm'));
    }

    /**
     *
     * todo description
     *
     * @param description
     * @param command
     * @param console
     */
    addCommand = (description: string, command: string, console: IExternalConsole): void | number => {
        if (this.processedCommands.includes(command + console.name)) return;

        this.commands.push({
            aliases: [],
            args: [],
            flags: {},
            hidden: false,
            id: console.topicName ? console.topicName + ':' + command : command, // todo
            name: console.topicName ? console.topicName + ':' + command : command, // todo
            description,
            execute: `${console.executable} ${command}`,
            type: CommandType.external,
            context: this.console.name ?? 'unknown',
        });

        this.processedCommands.push(command + console.name);
    };

    private fetchConsoleCommandList = async (command: string): Promise<string> => {
        return shell.exec(command, this.runInVagrant, true, true);
    };

    /**
     *
     */
    private async storeCommands(): Promise<void> {
        return await vcConfig.updateWorkspaceConfig({ customCommands: this.commands });
    }

    /** todo remove
    getOnlyCommandsFromOutput(content: string, consoleConfig: IExternalConsole) {
        console.log('te', content.match(new RegExp('\t([^\t]+)')));
        process.exit();
        return content
            .substr(content.indexOf(consoleConfig.parserStartString) + consoleConfig.parserStartString.length)
            .match(new RegExp('\t([^\t]+)'));
    }

    get consoleOutput(): string {
        return this._consoleOutput;
    }

    private parseConsoleOutput(listContent: string, config: IExternalConsole): void {
        const lines = listContent.split('\n');

        lines.forEach((line) => {
            const command = line.trim().split('\t')[0].trim();
            const description = line.replace(command, '').trim();
            console.log('command', command);

            if (this.ignoreCommands.includes(command)) return;
            if (this.workspaceConfig.customCommands?.hasOwnProperty(command)) return; // todo change "force flag" is given
            if (command && description) this.addCommand(description, command, this.console);
        });
    }
     */
}
