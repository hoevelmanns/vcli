import { Observable, of, throwError } from 'rxjs';
import { SpawnChunk } from 'rxjs-shell/models';
import { exec, spawn } from 'rxjs-shell';
import { catchError, map } from 'rxjs/operators';
import { ShellCommandOptions } from '../types';

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
     * Spawns given commands
     *
     * @description spawn transfers the data through a stream and is well suited when a lot of data is transferred.
     * @see https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options
     *
     * @param options
     */
    spawn(options: ShellCommandOptions): Observable<SpawnChunk> {
        const command = this.prepareCommand(options);

        return spawn(command).pipe(
            map((output) => output.chunk),
            catchError((err) => of(err)),
        );
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
     */
    exec(command: ShellCommandOptions | string, runInVagrant = false, runInProjectRoot = false): Observable<string> {
        command = this.prepareCommand(command, runInVagrant, runInProjectRoot);

        return exec(command).pipe(
            map((output) => output.stdout.toString('utf8')),
            catchError((err) => throwError(err.stderr)),
        );
    }

    /**
     *
     * @param command
     * @param runInVagrant
     * @param runInProjectRoot
     */
    execSync(command: ShellCommandOptions | string, runInVagrant = false, runInProjectRoot = false) {
        return this.exec(command, runInVagrant, runInProjectRoot).toPromise();
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
        runInVagrant = options.runInVagrant || this.runInVagrant;
        runInProjectRoot = options?.runInProjectRoot || runInProjectRoot;

        if (runInVagrant)
            options.command = `vagrant ssh --no-tty  -c "cd ~/${global.config.workspace.vagrant?.deployDir} && ${options.command}"`;
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
