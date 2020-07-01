import Index from '@oclif/plugin-autocomplete/lib/commands/autocomplete'
import { IConfig } from '@oclif/config'
import { Shell } from '../shell'
import { infoTxt } from '../shared'

const fs = require('fs-extra') // todo use @types/fs-extra if fixed

export const refreshAutocompleteCache = async (config: IConfig): Promise<void> => {
  const { shell, bin } = config,
    updateCommands = `vc autocomplete -r && source ~/.${config.shell}rc`

  await new Shell().exec(updateCommands, { shell: config.shell })
  console.log(`To use auto-complete, please execute "${bin}" in a new terminal window or execute:` + infoTxt(`\n$ exec ${shell}`))
}
export const showAutocompleteSetupInstructions = async (config: IConfig): Promise<void> => await Index.run([], config)
/**
 *
 * @param bin
 * @param shell
 */

export const existAutoCompleteEnvVar = async (bin: string, shell: string): Promise<boolean> => {
  const shellProfile = await fs.readFile(global.config.home + `/.${shell}rc`, 'utf8')
  return shellProfile.match(`${bin.toUpperCase()}_AC_ZSH_SETUP_PATH`)
}
