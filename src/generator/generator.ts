import { CommandType, ICustomCommand, IExternalConsole, IPackageManager } from '../shared/types';
import { autocompleteSetup } from '../autocomplete';
import { Shell, vagrant } from '../shell';
import { VConfig } from '../config';

const Listr = require('listr');

export class Generator {
  private commands: ICustomCommand[] = [];
  private runInVagrant = false;
  private force = false;
  private processedCommands: string[] = [];

  get vagrant(): Generator {
    this.runInVagrant = true;
    return this;
  }

  async run(runInVagrant = false, force = false): Promise<void> {
    const { consoles, pkgManagers } = global?.config?.workspace;

    this.force = force;
    this.runInVagrant = runInVagrant ?? this.runInVagrant;

    if (!(consoles && pkgManagers)) return;

    if (this.runInVagrant && !(await vagrant.isMachineUp())) await vagrant.startMachine(true);

    const tasks = new Listr(
      [
        {
          title: 'Parsing commands',
          task: (): void =>
            new Listr(
              consoles?.map((consoleConfig) => ({
                title: consoleConfig.name,
                task: (): Promise<void> => this.parseConsoleCommands(consoleConfig),
              })),
            ),
          enabled: (): boolean => !!consoles?.length,
        },
        {
          title: 'Collecting commands from package managers',
          task: (): void =>
            new Listr(
              pkgManagers?.map((pgkManager) => ({
                title: pgkManager.name,
                task: (): void => this.addPackageManagerCommands(pgkManager),
              })),
            ),
          enabled: (): boolean => !!pkgManagers?.length,
        },
        {
          title: 'Store Commands',
          task: (): Promise<void> => this.storeCommands(),
          enabled: (): boolean => this.commands.length > 0,
        },
      ],
      { exitOnError: false },
    );

    await tasks
      .run()
      .catch((err: Error) => console.log(err.message))
      .then(() => autocompleteSetup());
  }

  /**
   *
   * @param pkgManager
   */
  private addPackageManagerCommands(pkgManager: IPackageManager): void {
    let config: { [key: string]: string | undefined } | undefined;
    if (['npm', 'yarn', 'pnpm'].includes(pkgManager.name)) config = global.config?.workspace?.packageJson;
    if (pkgManager.name === 'composer') config = global.config?.workspace?.composerJson;

    if (!config?.scripts) return;

    Object.entries(config.scripts).forEach(([commandName]) =>
      this.addCommand('', commandName.trim(), pkgManager, { runInProjectRoot: true }),
    );
  }

  /**
   *
   * Adds a command to the command collection state
   *
   * @param description
   * @param command
   * @param consoleConfig
   * @param options
   */
  addCommand = (
    description: string,
    command: string,
    consoleConfig: IExternalConsole | IPackageManager,
    options?: { execute?: string; runInProjectRoot: boolean },
  ): void | number => {
    const { topicName, name, executable } = consoleConfig;

    if (this.processedCommands.includes(command + name)) return;
    if (command.includes('//')) return; // ignore commented line

    this.commands.push({
      aliases: [],
      args: [],
      flags: {},
      hidden: false,
      id: topicName ? topicName + ':' + command : command, // todo
      name: topicName ? topicName + ':' + command : command, // todo
      description,
      execute: options?.execute || `${executable} ${command}`,
      type: CommandType.external,
      context: name ?? 'unknown',
      runInVM: this.runInVagrant,
      runInProjectRoot: options?.runInProjectRoot,
    });

    this.processedCommands.push(command + consoleConfig.name);
  };

  /**
   * Parses command from console command list by given regex
   *
   */
  private async parseConsoleCommands(consoleConfig: IExternalConsole): Promise<void> {
    const { executable, list, regexList } = consoleConfig,
      listCommand = `${executable} ${list || ''}`.trim(),
      commandList = await this.fetchConsoleCommandList(listCommand),
      lines = commandList?.match(new RegExp(regexList, 'gm'));

    lines?.map((line) => {
      const command = line.trim().split(' ')[0],
        description = line.replace(command, '').trim();

      this.addCommand(description, command.trim(), consoleConfig);
    });
  }

  /**
   * Fetches the command list from external console by given list command, e.g. /bin/console -l
   *
   * @param listCommand
   */
  private fetchConsoleCommandList = async (listCommand: string): Promise<string> => {
    return new Shell().exec(listCommand, { runInVM: this.runInVagrant, runInProjectRoot: true, silent: true });
  };

  /**
   * Stores the parsed commands in the workspace configuration file
   *
   */
  private async storeCommands(): Promise<void> {
    const currentCustomCommands = global.config.workspace?.customCommands ?? [],
      externalCommands = this.force ? this.commands : [...currentCustomCommands, ...this.commands]; // todo use merge
    await VConfig.getInstance().updateWorkspaceConfig({ customCommands: externalCommands });
  }
}
