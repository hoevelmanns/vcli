import { defaultConfigFile, defaultWorkspace } from '../shared/types/defaults';
import { successTxt } from '../shared';
import { IWorkspaceConfig } from '../shared/types';
import { IConfig } from '@oclif/config';
import { v4 as uuidv4 } from 'uuid';
import * as findUp from 'find-up';
import cli from 'cli-ux';
import { createOrRenameSymlink } from '../shared/utils';
const fs = require('fs-extra'); // todo use @types/fs-extra if fixed

export class VConfig {
  public oclifConfig = <IConfig>{};
  private static workspaceConfigFile: string;
  private static instance: VConfig;

  static getInstance(): VConfig {
    this.instance = this.instance ?? new VConfig();
    return VConfig.instance;
  }
  /**
   * The entry point of the workspace configuration
   *
   * @param oclifConfig
   * @returns void
   */
  initWorkspace = async (oclifConfig: IConfig): Promise<boolean> => {
    this.oclifConfig = oclifConfig;

    const workspaceConfigFile = await findUp(defaultConfigFile);

    if (workspaceConfigFile) {
      await this.set(workspaceConfigFile);
      return true;
    }

    return false;
  };

  /**
   *
   * @param workspaceConfigFile
   * @returns void
   */
  private async set(workspaceConfigFile?: string): Promise<void> {
    const configFile = VConfig.workspaceConfigFile = workspaceConfigFile ?? VConfig.workspaceConfigFile;
    const workspaceDir = configFile?.replace(defaultConfigFile, '');
    let workspaceConfig = await fs.readJSON(VConfig.workspaceConfigFile);

    workspaceConfig = {
      ...workspaceConfig,
      ...{ configFile },
      ...{ root: workspaceDir },
    };

    Object.assign(global.config, {
      ...this.oclifConfig,
      ...{ workspace: { ...workspaceConfig } },
    });
  }

  /**
   * @returns void
   */
  createWorkspace = async (): Promise<void> => {
    const pkgJsonPath = process.cwd() + '/package.json',
      currentPathHasPkgJson = await fs.pathExists(pkgJsonPath),
      workspacePkgJson = currentPathHasPkgJson ? await fs.readJson(pkgJsonPath) : null,
      workspaceName = await cli.prompt('What is the name of the workspace?', {
        default: workspacePkgJson?.name ?? '',
      }),
      root = process.cwd(),
      uuid = uuidv4(workspaceName),
      config: IWorkspaceConfig = { ...defaultWorkspace, name: workspaceName, uuid, root };

    await this.createWorkspaceConfigFile(config)
      .then(() => console.log(successTxt(`Workspace "${config.name}" created!`), '\n'))
      .catch((err) => console.error(err));
  };

  /**
   *
   * @param config
   */
  createWorkspaceConfigFile = (config: IWorkspaceConfig): Promise<void> =>
    new Promise((resolve, reject) => {
      const configDir = this.oclifConfig.configDir,
        targetDir = `${configDir}/${config.uuid}`,
        targetFile = `${targetDir}/config.json`;

      VConfig.workspaceConfigFile = `${process.cwd()}/${defaultConfigFile}`;

      fs.mkdir(targetDir, { recursive: true })
        .then(async () => await fs.writeJSON(targetFile, config, { spaces: 2, flag: 'w' }))
        .then(async () => await createOrRenameSymlink(targetFile, VConfig.workspaceConfigFile))
        .then(() => resolve(this.set()))
        .catch((err: Error) => reject(err));
    });

  async updateWorkspaceConfig(config: Partial<IWorkspaceConfig>): Promise<void> {
    global.config.workspace = { ...global.config.workspace, ...config };
    await fs.writeJSON(VConfig.workspaceConfigFile, global.config.workspace, { spaces: 2, flag: 'w' });
  }
}

export const vcConfig = new VConfig();
