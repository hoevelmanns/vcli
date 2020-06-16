/* tslint:disable:no-useless-constructor */
import { shell } from './shell';

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
        await shell
            .execSync({
                runInVagrant: this.runInVagrant || vagrant,
                command: this.execute,
                displayText: 'Executing command: ' + this.description,
            })
            .then((output) => console.log(output));
    };

    public get vagrant() {
        this.runInVagrant = true;
        return this;
    }
}
