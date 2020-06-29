import { Vagrant } from './vagrant';
import { ICustomCommand } from '../shared/types';
import { actionTxt, infoTxt } from '../shared';
import { isMachineNotUp } from './machine-states';

export class CustomCommand extends Vagrant {
    static hidden = true;
    private data = <ICustomCommand>{};

    set(item: ICustomCommand): CustomCommand {
        this.data = item;
        return this;
    }

    /**
     *
     * @param forceRunInVagrant
     */
    public run = async (forceRunInVagrant = false): Promise<void> => {
        const { execute } = this.data,
            args = process.argv,
            command = [execute, args.slice(3, args.length).join(' ')].join(' ').trim(),
            actionInfo = actionTxt('Executing: ' + infoTxt(command)),
            runInVagrant = this.data.runInVagrant ?? forceRunInVagrant;

        await this.exec(command, { runInVagrant, actionInfo }).catch(async (err: Error) => {
            if (isMachineNotUp(err)) {
                await this.startMachineIfNotUp();
                return this.run(runInVagrant);
            }
        });
    };

    public get vagrant(): CustomCommand {
        this.data.runInVagrant = true;
        return this;
    }
}
