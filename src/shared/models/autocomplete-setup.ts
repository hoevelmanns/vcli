import { VConfig } from "./config";
import { ISetup } from "../types/setup";
import { infoTxt } from "./logging";
import { existAutoCompleteEnvVar, refreshAutocompleteCache, showAutocompleteSetupInstructions } from "../utils";

export class AutocompleteSetup extends VConfig implements ISetup {

  /**
   * Adds the autocomplete env var to the shell profile and source it
   */
  run = async (): Promise<void> => {
    const oclifConfig = VConfig.oclifConfig,
      { shell, bin } = oclifConfig,
      successMsg =
        `3) For using the autocompletion please run "${bin}" in a new terminal window or use:` +
        infoTxt(`\n$ exec ${shell}.`) +
        `\n\n4) Run "${bin}" for display available commands`;

    if (await existAutoCompleteEnvVar(bin, shell)) {
      return await refreshAutocompleteCache(oclifConfig); // todo  source ~/.zshrc
    }

    return await showAutocompleteSetupInstructions(oclifConfig).then(() => console.log(successMsg));
  };

}

export const autocompleteSetup = async (): Promise<void> => new AutocompleteSetup().run();