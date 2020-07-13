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
  initWorkspace = async (oclifConfig: IConfig): Promise<VConfig | undefined> => {
    this.oclifConfig = oclifConfig;

    const workspaceConfigFile = await findUp(defaultConfigFile);

    if (workspaceConfigFile) {
      await this.set(workspaceConfigFile);
      return this;
    }
  };

  /**
   *
   * @param workspaceConfigFile
   * @returns void
   */
  private async set(workspaceConfigFile?: string): Promise<void> {
    const configFile = (VConfig.workspaceConfigFile = workspaceConfigFile ?? VConfig.workspaceConfigFile);
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

  async initPackageManagerConfig(): Promise<void> {
    const pkgJsonPath = process.cwd() + '/package.json',
      composerJsonPath = process.cwd() + '/composer.json',
      currentPathHasPkgJson = await fs.pathExists(pkgJsonPath),
      currentPathHasComposerJson = await fs.pathExists(composerJsonPath),
      workspacePkgJson = currentPathHasPkgJson ? await fs.readJson(pkgJsonPath) : null,
      workspaceComposerJson = currentPathHasComposerJson ? await fs.readJson(composerJsonPath) : null;

    await this.updateWorkspaceConfig({ composerJson: workspaceComposerJson, packageJson: workspacePkgJson }, false);
  }

  /**
   * @returns void
   */
  createWorkspace = async (): Promise<void> => {
    await this.initPackageManagerConfig();
    const workspaceName = await cli.prompt('What is the name of the workspace?', {
        default: global.config.workspace.packageJson?.name ?? '',
      }),
      root = process.cwd(),
      uuid = uuidv4(workspaceName),
      config: IWorkspaceConfig = {
        ...defaultWorkspace,
        name: workspaceName,
        uuid,
        root,
        packageJson: global.config.workspace?.packageJson,
        composerJson: global.config.workspace?.composerJson,
      };

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

  async updateWorkspaceConfig(config: Partial<IWorkspaceConfig>, save = true): Promise<void> {
    global.config.workspace = { ...global.config.workspace, ...config };
    const workspaceFileContent = Object.assign({}, global.config.workspace);
    delete workspaceFileContent.packageJson;
    delete workspaceFileContent.composerJson;
    delete workspaceFileContent.root;

    if (!save) return Promise.resolve();

    await fs.writeJSON(VConfig.workspaceConfigFile, workspaceFileContent, { spaces: 2, flag: 'w' });
  }
}

export const vcConfig = new VConfig();
