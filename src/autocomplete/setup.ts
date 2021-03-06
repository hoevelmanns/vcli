import { vcConfig } from '../config';
import { ISetup } from '../shared/types/setup';
import { infoTxt } from '../shared';
import { existAutoCompleteEnvVar, refreshAutocompleteCache, showAutocompleteSetupInstructions } from './autocomplete';
import { spawn } from 'child_process';

/**
 * Adds the autocomplete env var to the shell profile and source it
 *
 */
export class Setup implements ISetup {
  run = async (): Promise<void> => {
    const oclifConfig = vcConfig.oclifConfig,
      { shell, bin } = oclifConfig,
      successMsg =
        `3) For using the autocompletion please run "${bin}" in a new terminal window or use:` +
        infoTxt(`\n$ exec ${shell}.`) +
        `\n\n4) Run "${bin}" for display available commands`;

    if (await existAutoCompleteEnvVar(bin, shell)) {
      return await refreshAutocompleteCache(oclifConfig);
    }

    await showAutocompleteSetupInstructions(oclifConfig).then(() => console.log(successMsg));
  };
}

export const autocompleteSetup = async (): Promise<void> => new Setup().run();
