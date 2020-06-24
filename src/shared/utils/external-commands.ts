import Index from '@oclif/plugin-autocomplete/lib/commands/autocomplete';
import { IConfig } from '@oclif/config';

export const refreshAutocompleteCache = async (config: IConfig): Promise<void> => await Index.run(['-r'], config);
export const showAutocompleteSetupInstructions = async (config: IConfig): Promise<void> => await Index.run([], config);
