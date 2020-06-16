import { IConfiguration } from './shared/types';

declare global {
    namespace NodeJS {
        interface Global {
            config: IConfiguration;
        }
    }
}

export { run } from '@oclif/command';
