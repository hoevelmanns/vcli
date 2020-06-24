import { ShellCommandOptions } from '../types';
import { asyncExec } from 'async-shelljs';
import { execSync, spawn } from 'child_process';
import { errorTxt, warningTxt } from '../../shared/models';
import { isVagrantLocked } from '../../shared/models';

/**
 * @see https://www.npmjs.com/package/rxjs-shell?activeTab=readme
 */
class Shell {
    private runInVagrant = false;

    get vagrant(): Shell {
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
     * @param retry
     * @param showVMLockedWarning
     */
    async exec(
        command: ShellCommandOptions | string,
        runInVagrant = false,
        runInProjectRoot = false,
        silent = false,
        retry = 0, // todo config
        showVMLockedWarning = false,
    ): Promise<any> {
        return await asyncExec(this.prepareCommand(command, runInVagrant, runInProjectRoot), { silent }).catch(
            async (err: Error) => {
                if (isVagrantLocked(err) && retry <= 5) {
                    if (showVMLockedWarning) console.info(warningTxt('VM is locked. Retry...'));
                    return this.exec(command, runInVagrant, runInProjectRoot, silent, retry++);
                }

                console.error(errorTxt('Error executing command: '), err.message);
                process.exit();
            },
        );
    }

    spawn(command: ShellCommandOptions | string, runInVagrant = false, runInProjectRoot = false, silent = false) {
        return spawn(this.prepareCommand(command, runInVagrant, runInProjectRoot));
    }

    execSync(command: ShellCommandOptions | string, runInVagrant = false, runInProjectRoot = false, silent = false) {
        return execSync(this.prepareCommand(command, runInVagrant, runInProjectRoot));
    }

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
        runInVagrant = (options.runInVagrant || this.runInVagrant) && 'vagrant' in global.config.workspace;
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
