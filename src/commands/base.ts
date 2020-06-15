import Command, { flags } from '@oclif/command';
import { initProject } from '../libs/shared/utils';

/**
 * todo: credential / auth helper for git:
 *  -> open git token page
 *  -> prompt for credentials (user, password/token)
 *  -> git config credential.helper 'store'
 *
 */
export default class extends Command {
    static hidden = true;

    static flags = {
        loglevel: flags.string({ options: ['error', 'warn', 'info', 'debug'] }),
    };

    async init() {
        await initProject();
    }

    async catch(error: Error) {
        // handle any error from the command
    }

    async finally(error: Error | undefined) {
        // called after run and catch regardless of whether or not the command errored
    }

    async run() {
        console.log(' bla bla');
    }
}
