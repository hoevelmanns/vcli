import { ShellCommandOptions } from '../types';
import { exec } from 'shelljs';

/**
 * @see https://www.npmjs.com/package/rxjs-shell?activeTab=readme
 */
class Shell {
    private runInVagrant = false;

    get vagrant() {
        this.runInVagrant = true;
        return this;
    }

    /**
     * Executes shell commands, also in a vagrant machine
     *
     * @description exec has a maxBuffer and can only transfer a certain amount of data ( default: 200KB )
     * @see https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback
     *
     * @param command
     * @param runInVagrant
     * @param runInProjectRoot
     * @param silent
     */
    exec = async (
        command: ShellCommandOptions | string,
        runInVagrant = false,
        runInProjectRoot = false,
        silent = false,
    ): Promise<string> =>
        new Promise((resolve, reject) =>
            exec(this.prepareCommand(command, runInVagrant, runInProjectRoot), { silent }, (error, stdout, stderr) => {
                if (error) return reject(stderr);
                resolve(stdout.trim());
            }),
        );

    /**
     * Concat given flags stringified to the given command and prepends vagrant command if given
     *
     * @param options
     * @param runInVagrant
     * @param runInProjectRoot
     * @returns string
     */
    private prepareCommand(
        options: ShellCommandOptions | string,
        runInVagrant = false,
        runInProjectRoot = false,
    ): string {
        options = typeof options === 'string' ? ({ runInVagrant, command: options } as ShellCommandOptions) : options;
        runInVagrant = options.runInVagrant || this.runInVagrant;
        runInProjectRoot = options?.runInProjectRoot || runInProjectRoot;

        if (runInVagrant)
            options.command = `vagrant ssh -c "cd ~/${global.config.workspace.vagrant?.deployDir} && ${options.command}"`;
        if (!runInVagrant && runInProjectRoot)
            options.command = `cd ${global.config.workspace.root} && ${options.command}`;
        if (!options.flags) return options.command;

        const flagsStr = Object.entries(options.flags)
            .map((flag) => '-' + flag.join(' '))
            .join(' ')
            .trim();

        return options.command.concat(' ', flagsStr).trim();
    }
}

export const shell = new Shell();