import Command from '@oclif/command';
import { vcConfig } from '../shared/utils';

/**
 * todo: credential / auth helper for git:
 *  -> open git token page
 *  -> prompt for credentials (user, password/token)
 *  -> git config credential.helper 'store'
 *
 */
export default class BaseClass extends Command {
    static hidden = true;
    async init() {
        await vcConfig.initWorkspace(this.config);
    }

    async run() {
        // do noting
    }

    async catch(error: Error) {
        // handle any error from the command
    }

    async finally(error: Error | undefined) {
        // called after run and catch regardless of whether or not the command errored
    }
}
