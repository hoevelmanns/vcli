/**
 * Triggers the generation of external cli commands
 */
import * as inquirer from "inquirer";
import { Generator } from "../../generator/models";
import { VConfig } from "./config";
import { ISetup } from "../types/setup";

export class GeneratorSetup extends VConfig implements ISetup {
  run = async (): Promise<void> =>
    new Promise(async (resolve, reject) => {
      const questions: { refresh: boolean; refreshVagrant: boolean } = await inquirer.prompt([
        {
          name: "refreshVagrant",
          message: "Generate the commands from vagrant now? (vc refresh -v)",
          type: "confirm",
          when: !!global.config.workspace?.vagrant
        },
        {
          name: "refresh",
          message: "Generate the commands from host now? (vc refresh)",
          type: "confirm",
          when: (answers): boolean => !answers.refreshVagrant
        }
      ]);

      if (questions.refresh || questions.refreshVagrant) {
        return await new Generator()
          .run(questions.refreshVagrant)
          .then((res) => resolve(res))
          .catch((err) => reject(err));
      }

      resolve();
    });
}

export const generatorSetup = async (): Promise<void> => new GeneratorSetup().run();