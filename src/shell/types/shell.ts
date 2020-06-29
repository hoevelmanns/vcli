import { Shell } from '../shell';
import { IShellOptions } from './index';

export interface IShell {
    exec(command: string, options?: IShellOptions, retry?: number): Promise<string>;
    runInVagrant(): Shell;
}
