/* tslint:disable:no-useless-constructor */
import { shell } from './shell';
import { initProject } from '../../shared/utils';

export abstract class ShellCommand {
    protected runInVagrant = false;

    protected constructor(
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
    public exec = async (vagrant = false): Promise<void> => {
        await initProject();
        await shell
            .exec({
                runInVagrant: this.runInVagrant || vagrant,
                command: this.execute,
                displayText: 'Executing command: ' + this.description,
            })
            .toPromise()
            .then((output) => console.log(output));
    };

    public get vagrant() {
        this.runInVagrant = true;
        return this;
    }
}
