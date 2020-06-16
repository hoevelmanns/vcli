export enum Environment {
    development = 'development',
    production = 'production',
    staging = 'staging',
}
export let environment = Environment.development;

export function setEnvironment(env: Environment) {
    environment = env;
}
