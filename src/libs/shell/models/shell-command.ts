/* tslint:disable:no-useless-constructor */
import { shell } from './shell';
import { ExecOutput } from 'rxjs-shell/models';
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
    public exec = async (vagrant = false): Promise<void | Error | ExecOutput> => {
        await initProject();

        return shell
            .exec({
                vagrant: this.runInVagrant || vagrant,
                command: this.execute,
                displayText: 'Executing command: ' + this.description,
            })
            .toPromise()
            .then((res) => console.log(res));
    };

    public get vagrant() {
        this.runInVagrant = true;
        return this;
    }
}
