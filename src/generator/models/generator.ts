import { CommandType, ICustomCommand, IExternalConsole } from '../../shared/types';
import { shell } from '../../shell/models';
import cli from 'cli-ux';
import { vcConfig } from '../../shared/utils';

/**
 * todo: refactoring
 */
export class Generator {
    private ignoreCommands = ['list', 'help'];
    private commands: ICustomCommand[] = [];
    private console = <IExternalConsole>{};
    private runInVagrant = false;
    private _consoleOutput = <string>'';
    private workspaceConfig = global.config.workspace;

    /**
     * todo description
     */
    run(runInVagrant = false): void {
        if (!global.config.workspace?.consoles) cli.error('No consoles defined in .vclirc.json');

        global.config.workspace.consoles.map(async (consoleConfig) => {
            cli.action.start('Generating cli commands from external consoles');

            await shell.exec(`${consoleConfig.executable} ${consoleConfig.list}`, runInVagrant, true, true).then(
                (stdout) => {
                    this.console = consoleConfig;
                    this.consoleOutput = stdout;
                    this.parseConsoleOutput();
                    this.storeCommands();
                },
                (error) => console.log('Error generating commands', error),
            );
        });
    }

    /**
     * @returns void
     */
    private parseConsoleOutput(): void {
        const lines = this.consoleOutput.split('\n');

        lines.forEach((line) => {
            const command = line.trim().split(' ')[0];
            const description = line.replace(command, '').trim();

            if (this.ignoreCommands.includes(command)) return;
            if (this.workspaceConfig.customCommands?.hasOwnProperty(command)) return; // todo change "force flag" is given
            if (command && description) this.addCommand(description, command, this.console);
        });
    }

    /**
     *
     * todo description
     *
     * @param description
     * @param command
     * @param console
     */
    addCommand = (description: string, command: string, console: IExternalConsole): void | number =>
        this.commands.push({
            aliases: [],
            args: [],
            flags: {},
            hidden: false,
            id: command,
            name: command,
            description,
            execute: `${console.executable} ${command}`,
            type: CommandType.external,
            context: this.console.name ?? 'unknown',
        });

    /**
     *
     */
    private async storeCommands(): Promise<void> {
        global.config.workspace.customCommands = this.commands;
        await vcConfig.updateWorkspaceConfig();
    }

    get vagrant() {
        this.runInVagrant = true;
        return this;
    }

    set consoleOutput(content: string) {
        this._consoleOutput = content.substr(
            content.indexOf(this.console.parserStartString) + this.console.parserStartString.length,
        );
    }

    get consoleOutput(): string {
        return this._consoleOutput;
    }
}
