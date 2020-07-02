/**
 * Triggers the generation of external cli commands
 */
import * as inquirer from 'inquirer';
import { ISetup } from '../shared/types/setup';
import { Generator } from './generator';
import { defaultConsoles } from '../shared/types/defaults';
import { VConfig } from '../config';
import { IExternalConsole } from '../shared/types';

export class Setup implements ISetup {
  run = async (): Promise<void> =>
    new Promise(async (resolve, reject) => {
      const questions: { consoles: string[]; refresh: boolean; refreshVagrant: boolean } = await inquirer.prompt([
        {
          name: 'consoles',
          message: 'Select the project frameworks:',
          type: 'checkbox',
          choices: defaultConsoles.map((console) => console.name),
          when: defaultConsoles.length,
        },
        {
          name: 'refreshVagrant',
          message: 'Apply commands now? (vc refresh -v)',
          type: 'confirm',
          when: (answers): boolean => !!global.config.workspace?.vagrant && answers.consoles.length > 0,
        },
        {
          name: 'refresh',
          message: 'Apply commands now? (vc refresh)',
          type: 'confirm',
          when: (answers): boolean => !answers.refreshVagrant && answers.consoles.length > 0,
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
