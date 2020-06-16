/* tslint:disable:no-useless-constructor */
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
    ) {}

    /**
     *
     * @param vagrant
     */
    public run = async (vagrant = false): Promise<void> => {
        cli.action.start(this.description);

        await shell
            .execSync({
                runInVagrant: this.runInVagrant || vagrant,
                command: this.execute,
            })
            .then((output) => console.log(output));
    };

    public get vagrant() {
        this.runInVagrant = true;
        return this;
    }
}
