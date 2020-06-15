export interface CliConfig {
    project?: string;
    vagrant?: VagrantConfig;
    notifications?: NotificationConfig;
    commands: ConsolesCommands;
    consoles: ExternalConsoles;
    generatorOutput: string;
}

export interface ExternalConsoles {
    [key: string]: ExternalConsole;
}

export interface ExternalConsole {
    parserStartString: string;
    executable: string;
    list: string;
    context?: string;
}

export interface VagrantConfig {
    deployDir: string;
}

export interface NotificationConfig {
    disabled: boolean;
    time: number;
}

// todo redundant in lib "shell"
export interface ConsoleCommand {
    name: string;
    execute: string;
    description?: string;
    type: CommandType;
    context: string;
    prefix?: string;
}

export enum CommandType {
    external = 'external',
    vc = 'vc',
}

export interface ConsolesCommands {
    [key: string]: ConsoleCommand;
}
// todo redundant in lib "shell"
