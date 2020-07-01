import { CommandType, ICustomCommand, IExternalConsole } from '../shared/types'
import { autocompleteSetup } from '../autocomplete'
import { vagrant } from '../shell'
import { VConfig } from '../config'

const Listr = require('listr')

export class Generator {
  private commands: ICustomCommand[] = []
  private runInVagrant = false
  private force = false
  private processedCommands: string[] = []

  get vagrant(): Generator {
    this.runInVagrant = true
    return this
  }

  async run(runInVagrant = false, force = false): Promise<void> {
    this.force = force
    this.runInVagrant = runInVagrant ?? this.runInVagrant

    const { consoles } = global?.config?.workspace;

    if (this.runInVagrant && !await vagrant.isMachineUp()) await vagrant.startMachine(true)

    const tasks = new Listr(
      [
        {
          title: 'Getting available console commands',
          task: (): void =>
            new Listr(
              consoles?.map((consoleConfig) => ({
                title: consoleConfig.name,
                task: (): Promise<void> => this.addCommandsFromConsole(consoleConfig),
              })),
            ),
        },
        {
          title: 'Store Commands',
          task: (): Promise<void> => this.storeCommands(),
          enabled: (): boolean => this.commands.length > 0,
        },
      ],
      { exitOnError: false },
    )

    await tasks
      .run()
      .catch((err: Error) => console.log(err.message))
      .then(() => autocompleteSetup())
  }

  /**
   *
   * Adds a command to the command collection state
   *
   * @param description
   * @param command
   * @param console
   */
  addCommand = (description: string, command: string, console: IExternalConsole): void | number => {
    const { topicName, name, executable } = console

    if (this.processedCommands.includes(command + name)) return

    this.commands.push({
      aliases: [],
      args: [],
      flags: {},
      hidden: false,
      id: topicName ? topicName + ':' + command : command, // todo
      name: topicName ? topicName + ':' + command : command, // todo
      description,
      execute: `${executable} ${command}`,
      type: CommandType.external,
      context: name ?? 'unknown',
      runInVM: this.runInVagrant,
    })

    this.processedCommands.push(command + console.name)
  }

  /**
   * Parses command from console command list by given regex
   *
   */
  private async addCommandsFromConsole(consoleConfig: IExternalConsole): Promise<void> {
    const { executable, list, regexList } = consoleConfig,
      listCommand = `${executable} ${list || ''}`.trim(),
      commandList = await this.fetchConsoleCommandList(listCommand)

    const lines = commandList?.match(new RegExp(regexList, 'gm'))

    lines?.map((line) => {
      const command = line.trim().split(' ')[0],
        description = line.replace(command, '').trim()

      this.addCommand(description, command.trim(), consoleConfig)
    })
  }

  /**
   * Fetches the command list from external console by given list command, e.g. /bin/console -l
   *
   * @param listCommand
   */
  private fetchConsoleCommandList = async (listCommand: string): Promise<string> => {
    return vagrant.exec(listCommand, { runInVM: this.runInVagrant, runInProjectRoot: true, silent: true }) // todo runInVagrant
  }

  /**
   * Stores the parsed commands in the workspace configuration file
   *
   */
  private async storeCommands(): Promise<void> {
    const currentCustomCommands = global.config.workspace?.customCommands ?? [],
      externalCommands = this.force ? this.commands : [...currentCustomCommands, ...this.commands]
    await VConfig.getInstance().updateWorkspaceConfig({ customCommands: externalCommands })
  }
}
