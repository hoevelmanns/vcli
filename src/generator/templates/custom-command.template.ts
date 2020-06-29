import { ICustomCommand } from '../../shared/types';
import { makeClassName, makeFunctionName } from '../../shared';

export const customCommandTemplate = (cmd: ICustomCommand): string => `
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
