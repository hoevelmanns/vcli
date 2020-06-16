import { makeClassName, makeFunctionName } from '../../shared/utils';
import { ICustomCommand } from '../../shared/types';

export const shellCommandTemplate = (cmd: ICustomCommand) => `
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
