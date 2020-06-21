import { shell } from './shell';
import cli from 'cli-ux';
import { infoText } from '../../shared/utils';

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
        cli.action.start(`Executing: ${this.description} -> ${infoText(this.execute)}`);

        shell
            .exec({
                runInVagrant: this.runInVagrant || vagrant,
                command: this.execute,
            })
            .then((res) => console.log(res));
    };

    public get vagrant(): CustomCommand {
        this.runInVagrant = true;
        return this;
    }
}
