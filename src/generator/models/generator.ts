import { CommandType, ICustomCommand, IExternalConsole } from '../../shared/types';
import { shell } from '../../shell/models';
import cli from 'cli-ux';
import { vcConfig, errorTxtBold, infoText, successTxt } from '../../shared/utils';

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
    async run(runInVagrant = false): Promise<void> {
        if (!global?.config?.workspace?.consoles) {
            const error = 'No consoles defined in .vclirc.json';
            cli.error(error);
            return new Promise(() => Error(error));
        }

        cli.action.start('Generating cli commands from external consoles');

        const consoles = global.config.workspace?.consoles;

        consoles.map((consoleConfig) => {
            const stdout = shell.execSync(
                `${consoleConfig.executable} ${consoleConfig.list}`,
                runInVagrant,
                true,
                true,
            );

            this.console = consoleConfig;
            this.consoleOutput = stdout.toString('UTF8');
            this.parseConsoleOutput();
            this.storeCommands();

            console.log(successTxt(consoleConfig.name + ' commands successfully added'));
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
            id: this.console.prefix ? this.console.prefix + ':' + command : command, // todo
            name: this.console.prefix ? this.console.prefix + ':' + command : command, // todo
            description,
            execute: `${console.executable} ${command}`,
            type: CommandType.external,
            context: this.console.name ?? 'unknown',
        });

    /**
     *
     */
    private async storeCommands(): Promise<void> {
        return await vcConfig.updateWorkspaceConfig({ customCommands: this.commands });
    }

    get vagrant(): Generator {
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
