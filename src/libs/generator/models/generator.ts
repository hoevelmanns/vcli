import { config, updateWorkspaceConfig } from '../../shared/utils';
import { CommandType, ICustomCommand, IExternalConsole } from '../../shared/types';
import { shell } from '../../shell/models';
import cli from 'cli-ux';
import * as fs from 'fs';

/**
 * todo: refactoring
 */
export class Generator {
    private ignoreCommands = ['list', 'help'];
    private commands: ICustomCommand[] = [];
    private console = <IExternalConsole>{};
    private runInVagrant = false;
    private _consoleOutput = <string>'';
    private workspaceConfig = config.workspace;

    /**
     * todo description
     */
    run = (runInVagrant = false): void =>
        Object.entries(config.workspace?.consoles ?? {}).forEach(async (c) => {
            cli.action.start('Generating shell and cli commands');

            this.console = { ...c[1], ...{ context: c[0] } };

            shell.execSync(`${this.console.executable} ${this.console.list}`, runInVagrant, true).then(
                (content) => {
                    this.consoleOutput = content;
                    this.parseConsoleOutput();
                    this.storeCommands();
                },
                (error) => console.log(error),
            );
        });

    private storeCommands() {
        config.workspace['customCommands'] = this.commands;
        updateWorkspaceConfig();
    }

    /**
     *
     * todo description
     *
     * @param description
     * @param command
     */
    private addCommand = (description: string, command: string): void | number =>
        this.commands.push({
            aliases: [],
            args: [],
            flags: {},
            hidden: false,
            id: command,
            name: command,
            description,
            execute: `${this.console.executable} ${command}`,
            type: CommandType.external,
            context: this.console.context ?? 'unknown',
        });

    /**
     * @returns void
     */
    private parseConsoleOutput = (): void => {
        const lines = this.consoleOutput.split('\n');

        lines.forEach((line) => {
            const command = line.trim().split(' ')[0];
            const description = line.replace(command, '').trim();

            if (this.ignoreCommands.includes(command)) return;
            if (this.workspaceConfig.customCommands?.hasOwnProperty(command)) return; // todo change "force flag" is given
            // todo check if error occurred
            if (command && description) this.addCommand(description, command);
        });
    };

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
