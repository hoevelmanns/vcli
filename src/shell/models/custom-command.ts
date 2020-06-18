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
        cli.action.start('Processing: ' + this.description);

        await shell.exec({
            runInVagrant: this.runInVagrant || vagrant,
            command: this.execute,
        });
    };

    public get vagrant() {
        this.runInVagrant = true;
        return this;
    }
}
