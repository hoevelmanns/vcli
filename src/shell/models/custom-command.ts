import { shell } from './shell';
import cli from 'cli-ux';

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
        cli.action.start(`Executing: ${this.description} -> ${this.execute}`);

        await shell.exec({
            runInVagrant: this.runInVagrant || vagrant,
            command: this.execute,
        });
    };

    public get vagrant(): CustomCommand {
        this.runInVagrant = true;
        return this;
    }
}
