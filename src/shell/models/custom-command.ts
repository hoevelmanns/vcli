import { shell } from './shell';
import cli from 'cli-ux';
import { actionTxt, infoTxt } from '../../shared/models';

export class CustomCommand {
    protected runInVagrant = false;

    constructor(
        public name: string,
        public description: string,
        public execute: string,
        public type: string,
        public context: string,
        public id: string,
    ) {}

    /**
     *
     * @param vagrant
     */
    public run = async (vagrant = false): Promise<void> => {
        cli.action.start(actionTxt(`Executing: ${this.description} -> `) + infoTxt(this.execute));

        await shell.exec(this.execute, { runInVagrant: true }).catch((e) => console.log(e.message));
    };

    public get vagrant(): CustomCommand {
        this.runInVagrant = true;
        return this;
    }
}
