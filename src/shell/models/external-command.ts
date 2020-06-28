import { shell } from './shell';
import { actionTxt, infoTxt, warningTxt } from '../../shared/models';
import { vagrant } from './vagrant';
import VCBase from '../../commands/base';
import { IExternalCommand } from '../../shared/types';
const confirm = require('@inquirer/confirm');

export class ExternalCommand extends VCBase {
    static hidden = true;
    private data = <IExternalCommand>{};

    set(item: IExternalCommand): ExternalCommand {
        this.data = item;
        return this;
    }

    /**
     *
     * @param forceRunInVagrant
     */
    public run = async (forceRunInVagrant = false): Promise<void> => {
        const { runInVagrant, execute } = this.data,
            args = process.argv,
            command = [execute, args.slice(3, args.length).join(' ')].join(' '),
            actionInfo = actionTxt('Executing: ' + infoTxt(command));

        if ((runInVagrant || forceRunInVagrant) && !(await vagrant.machineIsUp())) {
            const startVagrant = await confirm({
                message: 'VM is not running. Start now?', // todo
            });

            if (!startVagrant) {
                console.log(warningTxt('Aborted.'));
                process.exit(0);
            }

            await vagrant.up(true);
        }

        await shell.exec(command, { runInVagrant, actionInfo }).catch((e) => console.log(e.message));
    };

    public get vagrant(): ExternalCommand {
        this.data.runInVagrant = true;
        return this;
    }
}
