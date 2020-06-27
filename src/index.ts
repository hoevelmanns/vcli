import { IConfiguration, IEnvironment } from './shared/types';

declare global {
    namespace NodeJS {
        interface Global {
            config: IConfiguration;
            env: IEnvironment;
        }
    }
}

export { run } from '@oclif/command';
