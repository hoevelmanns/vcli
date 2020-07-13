/**
 * Triggers the generation of external cli commands
 */
import * as inquirer from 'inquirer';
import { ISetup } from '../shared/types/setup';
import { Generator } from './generator';
import { defaultConsoles, defaultPackageManagers } from '../shared/types/defaults';
import { VConfig } from '../config';
import { IExternalConsole, IPackageManager } from '../shared/types';

export class Setup implements ISetup {
  run = async (): Promise<void> =>
    new Promise(async (resolve, reject) => {
      const questions: {
        consoles: string[];
        packageManagers: string[];
        refresh: boolean;
        refreshVagrant: boolean;
      } = await inquirer.prompt([
        {
          name: 'consoles',
          message: 'Select the project frameworks:',
          type: 'checkbox',
          choices: defaultConsoles.map((console) => console.name),
          when: defaultConsoles.length,
        },
        {
          name: 'packageManagers',
          message: 'Select the package managers:',
          type: 'checkbox',
          // todo get choices from founded pkg managers by package-lock.json & yarn.lock
          choices: defaultPackageManagers.map((pkgManager) => pkgManager.name),
          when: defaultPackageManagers.length, // todo
        },
        {
          name: 'refreshVagrant',
          message: 'Apply commands now? (vc refresh -v)',
          type: 'confirm',
          when: (answers): boolean =>
            !!global.config.workspace?.vagrant && (answers.consoles.length > 0 || answers.packageManagers.length > 0),
        },
        {
          name: 'refresh',
          message: 'Apply commands now? (vc refresh)',
          type: 'confirm',
          when: (answers): boolean =>
            !answers.refreshVagrant && (answers.consoles.length > 0 || answers.packageManagers.length > 0),
        },
      ]);

      if (questions.consoles) {
        const consoles: IExternalConsole[] = [];
        questions.consoles.map((name) => {
          const config = defaultConsoles.find((item) => item.name === name);
          if (config) consoles.push(config);
        });

        await VConfig.getInstance().updateWorkspaceConfig({ consoles });
      }

      if (questions.packageManagers) {
        const pkgManagers: IPackageManager[] = [];
        questions.packageManagers.map((name) => {
          const config = defaultPackageManagers.find((item) => item.name === name);
          if (config) pkgManagers.push(config);
        });

        await VConfig.getInstance().updateWorkspaceConfig({ pkgManagers });
      }

      if (questions.refresh || questions.refreshVagrant) {
        return await new Generator()
          .run(questions.refreshVagrant)
          .then((res) => resolve(res))
          .catch((err) => reject(err));
      }

      resolve();
    });
}

export const generatorSetup = async (): Promise<void> => new Setup().run();
