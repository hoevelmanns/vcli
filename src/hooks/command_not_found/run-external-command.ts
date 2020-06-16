import { Hook } from '@oclif/config';

const hook: Hook<'command_not_found'> = async function (opts) {
    //process.stdout.write(`example hook running ${opts.id}\n`);
    // todo remove this hook?

    console.log('todo: run-external-command - Hook must be trigger shell module');
    process.exit();
};

export default hook;
