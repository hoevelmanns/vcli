import Command from '@oclif/command';

/**
 * todo: credential / auth helper for git:
 *  -> open git token page
 *  -> prompt for credentials (user, password/token)
 *  -> git config credential.helper 'store'
 *
 */
export default abstract class VCBase extends Command {
    static hidden = true;
}
