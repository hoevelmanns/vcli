import Command from '@oclif/command';
import { flags } from '@oclif/command';

/**
 * todo: credential / auth helper for git:
 *  -> open git token page
 *  -> prompt for credentials (user, password/token)
 *  -> git config credential.helper 'store'
 *
 */
export default class VCBase extends Command {
    static hidden = true;
    static flags = {
        ...Command.flags,
        vagrant: flags.help({ char: 'v' }),
    };

    async init(): Promise<void> {}

    async run(): Promise<void> {}
}
