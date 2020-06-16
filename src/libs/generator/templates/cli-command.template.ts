import { makeClassName, makeFunctionName } from '../../shared/utils';
import { ICustomCommand } from '../../shared/types';

export const cliCommandTemplate = (cmd: ICustomCommand, shellCommandPath: string) => `
import Command from '@oclif/command';

export abstract class ${makeClassName(cmd.name)} extends Command {
    static description = '${cmd.description}';
    async run() {
        await ${makeFunctionName(cmd.name)}.vagrant.exec();
    }
}
`;
