import { Observable, of } from 'rxjs';
import { ExecOutput, SpawnChunk } from 'rxjs-shell/models';
import cli from 'cli-ux';
import { exec, spawn } from 'rxjs-shell';
import { catchError, map } from 'rxjs/operators';
import { ShellCommandOptions } from '../types';
import { projectConfig, projectRoot } from '../../shared/utils';
import { option } from '@oclif/command/lib/flags';

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
     */
    exec(command: ShellCommandOptions | string, runInVagrant = false): Promise<ExecOutput | any> {
        command = this.prepareCommand(command, runInVagrant);

        return exec(command)
            .pipe(
                map((output) => output.stdout.toString('utf8')),
                catchError((err) => Shell.convertOutput(err.stderr)),
            )
            .toPromise();
    }

    /**
     * Concat given flags stringified to the given command and prepends vagrant command if given
     *
     * @param options
     * @param runInVagrant
     * @returns string
     */
    private prepareCommand(options: ShellCommandOptions | string, runInVagrant = false): string {
        options = typeof options === 'string' ? ({ runInVagrant, command: options } as ShellCommandOptions) : options;

        options.command =
            options.runInVagrant || this.runInVagrant
                ? `vagrant ssh --no-tty  -c "cd ~/${projectConfig.vagrant?.deployDir} && ${options.command}"`
                : `cd ${projectRoot} && ${options.command}`;

        if (!options.flags) return options.command;

        const flagsStr = Object.entries(options.flags)
            .map((flag) => '-' + flag.join(' '))
            .join(' ')
            .trim();

        return options.command.concat(' ', flagsStr).trim();
    }

    /**
     * Displays message
     * @param message
     */
    private static displayText(message?: string) {
        cli.action.start(message ?? 'Please wait');
    }

    /**
     *
     * @param buffer
     */
    private static convertOutput(buffer: string | Buffer): Observable<string> {
        const str = buffer.toString('utf8');
        console.info(str);
        return of(str);
    }
}

export const shell = new Shell();
