import Index from '@oclif/plugin-autocomplete/lib/commands/autocomplete';
import { IConfig } from '@oclif/config';
const fs = require('fs-extra'); // todo use @types/fs-extra if fixed

// todo vc autocomplete -r && source ~/.zshrc && exec zsh
export const refreshAutocompleteCache = async (config: IConfig): Promise<void> => await Index.run(['-r'], config);
export const showAutocompleteSetupInstructions = async (config: IConfig): Promise<void> => await Index.run([], config);
/**
 *
 * @param bin
 * @param shell
 */

export const existAutoCompleteEnvVar = async (bin: string, shell: string): Promise<boolean> => {
    const shellProfile = await fs.readFile(global.config.home + `/.${shell}rc`, 'utf8');
    return shellProfile.match(`${bin.toUpperCase()}_AC_ZSH_SETUP_PATH`);
};
