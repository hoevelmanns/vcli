import { ConsoleCommand } from '../types';
import { makeClassName, makeFunctionName } from '../../shared/utils';

export const shellCommandTemplate = (cmd: ConsoleCommand) => `
export class ${makeClassName(cmd.name)} extends ShellCommand {
    constructor() {
        super(
            '${cmd.name}',
            '${cmd.description}',
            '${cmd.execute}',
            '${cmd.type}',
            '${cmd.context}'
        );
    }
}
export const ${makeFunctionName(cmd.name)} = new ${makeClassName(cmd.name)}();\n`;
