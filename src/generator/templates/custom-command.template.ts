import { makeClassName, makeFunctionName } from '../../shared/models';
import { IExternalCommand } from '../../shared/types';

export const customCommandTemplate = (cmd: IExternalCommand): string => `
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
