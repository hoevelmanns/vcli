import { isMachineLocked } from './errors';
import { IShellOptions } from './types';
import { asyncExec } from 'async-shelljs';
import { spawn } from 'child_process';

export class Shell {
  private _vm = false;

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
  exec = async (command: string, options?: IShellOptions, retry = 0): Promise<string> => {
    return asyncExec(this.prepareCommand(command, options), options).catch(async (err: Error) => {
      if (isMachineLocked(err) && retry <= 5) await this.exec(command, options, retry++);
      throw err;
    });
  };

  spawn = async (command: string, options?: IShellOptions): Promise<void> =>
    new Promise((resolve) => {
      spawn(this.prepareCommand(command, options), { stdio: 'inherit', shell: true }).on(
        'exit',
        (error) => !error || resolve,
      );
    });

  get vagrant(): Shell {
    this._vm = true;
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
      runInVM = (options?.runInVM || this._vm) && 'vagrant' in workspace,
      runInProjectRoot = options?.runInProjectRoot || options?.runInVM;

    if (runInVM) command = `vagrant ssh -c "cd ~/${workspace.vagrant?.deployDir} && ${command}"`;
    if (!runInVM && runInProjectRoot) command = `cd ${workspace.root} && ${command}`;

    return command.trim();
  }
}

export const shell = new Shell();
