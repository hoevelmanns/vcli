import { shell } from './shell';
import cli from 'cli-ux';
import { errorTxt, infoText } from '../../shared/utils';

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
            .then((res) => console.log(res))
            .catch((err: Error) => console.log(errorTxt('Command failed: ', err)));
    };

    public get vagrant(): CustomCommand {
        this.runInVagrant = true;
        return this;
    }
}
