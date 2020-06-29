import { isMachineLocked } from './machine-states';
import { IShellOptions } from './types';
import { asyncExec } from 'async-shelljs';
import { errorTxt } from '../shared';
import cli from 'cli-ux';

/**
 * @see https://www.npmjs.com/package/rxjs-shell?activeTab=readme
 */
export class Shell {
    private _runInVagrant = false;

    /**
     * Executes shell commands, also in a vagrant machine
     *
     * @description exec has a maxBuffer and can only transfer a certain amount of data ( default: 200KB )
     * @see https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback
     *
     * @param command
     * @param options
     * @param retry
     */
    exec = async (
        command: string,
        options?: IShellOptions,
        retry = 0, // todo config
    ): Promise<string> => {
        if (options?.actionInfo) cli.action.start(options.actionInfo);
        return asyncExec(this.prepareCommand(command, options), options).catch(async (err: Error) => {
            if (isMachineLocked(err) && retry <= 5) await this.exec(command, options, retry++);

            console.error(errorTxt('Error executing command:'), err.message);

            throw err;
        });
    };

    get runInVagrant(): Shell {
        this._runInVagrant = true;
        return this;
    }

    /**
     * Concat given flags stringified to the given command and prepends vagrant command if given
     *
     * @param command
     * @param options
     * @returns string
     */
    private prepareCommand(command: string, options?: IShellOptions): string {
        const { workspace } = global.config,
            runInVagrant = (options?.runInVagrant || this._runInVagrant) && 'vagrant' in workspace,
            runInProjectRoot = options?.runInProjectRoot || options?.runInVagrant;

        if (runInVagrant) command = `vagrant ssh -c "cd ~/${workspace.vagrant?.deployDir} && ${command}"`;
        if (!runInVagrant && runInProjectRoot) command = `cd ${workspace.root} && ${command}`;
        if (!options?.flags) return command;

        const flagsStr = Object.entries(options.flags)
            .map((flag) => '-' + flag.join(' '))
            .join(' ')
            .trim();

        return command.concat(' ', flagsStr).trim();
    }
}
