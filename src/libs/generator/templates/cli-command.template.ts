import { ConsoleCommand } from '../types';
import { makeClassName, makeFunctionName } from '../../shared/utils';

export const cliCommandTemplate = (cmd: ConsoleCommand, shellCommandPath: string) => `
import Command from '@oclif/command';

export abstract class ${makeClassName(cmd.name)} extends Command {
    static description = '${cmd.description}';
    async run() {
        await ${makeFunctionName(cmd.name)}.vagrant.exec();
    }
}
`;
