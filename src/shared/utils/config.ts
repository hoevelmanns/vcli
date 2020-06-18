import * as fs from 'fs';
import * as findUp from 'find-up';
import { IConfig } from '@oclif/config';
import { IConfiguration } from '../types';

export const defaultConfigFile = '.vclirc.json';

export class VConfig {

    /**
     *
     * @param oclifConfig
     * @returns void
     */
    async initWorkspace(oclifConfig: IConfig): Promise<void> {
        const workspaceConfigFile = await findUp(defaultConfigFile);
        if (!workspaceConfigFile) {
            process.exit(); // todo prompting
            return;
        }
        let workspaceConfig = JSON.parse(fs.readFileSync(workspaceConfigFile).toString());
        const workspaceDir = workspaceConfigFile.replace(defaultConfigFile, '');

        workspaceConfig = {
            ...workspaceConfig,
            ...{configFile: workspaceConfigFile},
            ...{root: workspaceDir}
        };

        global.config = <IConfiguration>{};
        Object.assign(global.config, {
            ...oclifConfig,
            ...{ workspace: { ...workspaceConfig} },
        });
    }

    updateWorkspaceConfig = () =>
      fs.writeFileSync(global.config.workspace.configFile, JSON.stringify(global.config.workspace), { flag: 'w' });

}

export const vcConfig = new VConfig();
