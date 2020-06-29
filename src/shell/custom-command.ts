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
     * @param forceRunInVM
     */
    public run = async (forceRunInVM = false): Promise<void> => {
        const { execute } = this.data,
            args = process.argv,
            command = [execute, args.slice(3, args.length).join(' ')].join(' ').trim(),
            runInVM = this.data.runInVM ?? forceRunInVM,
            actionInfo = actionTxt(`Executing${runInVM ? ' (VM):' : ':' } ${infoTxt(command)}`);

        await this.exec(command, { runInVM: runInVM, actionInfo }).catch(async (err: Error) => {
            if (isMachineNotUp(err)) {
                await this.startMachineIfNotUp();
                return this.run(runInVM);
            }
        });
    };

    public get vagrant(): CustomCommand {
        this.data.runInVM = true;
        return this;
    }
}
