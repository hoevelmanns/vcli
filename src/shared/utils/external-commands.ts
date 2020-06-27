import Index from '@oclif/plugin-autocomplete/lib/commands/autocomplete';
import { IConfig } from '@oclif/config';
import { VConfig } from '../models';
const fs = require('fs-extra'); // todo use @types/fs-extra if fixed

export const refreshAutocompleteCache = async (config: IConfig): Promise<void> => await Index.run(['-r'], config);
export const showAutocompleteSetupInstructions = async (config: IConfig): Promise<void> => await Index.run([], config);
/**
 *
 * @param bin
 * @param shell
 */

export const existAutoCompleteEnvVar = async (bin: string, shell: string): Promise<boolean> => {
    const shellProfile = await fs.readFile(VConfig.oclifConfig.home + `/.${shell}rc`, 'utf8');
    return shellProfile.match(`${bin.toUpperCase()}_AC_ZSH_SETUP_PATH`);
};
