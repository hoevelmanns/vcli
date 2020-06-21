import { IExternalConsole, IWorkspaceConfig } from './globals';

export const defaultConfigFile = '.vclirc.json';

export const defaultWorkspace = <IWorkspaceConfig>{
    notifications: {
        disabled: false,
        time: 2000,
    },
    consoles: <IExternalConsole[]>[
        {
            name: 'symfony',
            parserStartString: 'Available commands:',
            executable: 'bin/console',
            list: 'list',
        },
        {
            name: 'phing',
            parserStartString: 'Main targets:',
            executable: 'vendor/bin/phing',
            list: '-l',
            prefix: 'phing',
            topicDescription: 'Phing targets',
        },
    ],
};

export const defaultVagrantConfig = {
    vagrant: {
        deployDir: 'htdocs',
    },
};
