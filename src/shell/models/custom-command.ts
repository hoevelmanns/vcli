import { shell } from './shell';
import { actionTxt, infoTxt } from '../../shared/models';
import { vagrant } from './vagrant';

export class CustomCommand {
    constructor(
        public name: string,
        public description: string,
        public execute: string,
        public type: string,
        public context: string,
        public id: string,
        public runInVagrant?: boolean,
    ) {}

    /**
     *
     * @param runInVagrant
     */
    public run = async (runInVagrant = false): Promise<void> => {
        const actionInfo = actionTxt(`Executing: ${this.description} -> `) + infoTxt(this.execute);

        if (runInVagrant || this.runInVagrant) await vagrant.startMachineIfNotUp();

        await shell.exec(this.execute, { runInVagrant: true, actionInfo }).catch((e) => console.log(e.message));
    };

    public get vagrant(): CustomCommand {
        this.runInVagrant = true;
        return this;
    }
}
