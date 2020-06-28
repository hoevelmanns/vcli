import { makeClassName, makeFunctionName } from '../../shared/models';
import { IExternalCommand } from '../../shared/types';

export const cliCommandTemplate = (cmd: IExternalCommand): string => `
import Command from '@oclif/command';

export abstract class ${makeClassName(cmd.name)} extends Command {
    static description = '${cmd.description}';
    async run() {
        await ${makeFunctionName(cmd.name)}.vagrant.exec();
    }
}
`;
