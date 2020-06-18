import { IExternalConsole, IWorkspaceConfig } from './globals';

export const defaultConfigFile = '.vclirc.json'; // todo remove?

export const defaultWorkspace = <IWorkspaceConfig>{
    vagrant: {
        deployDir: 'htdocs',
    },
    notifications: {
        disabled: false,
        time: 2000,
    },
    consoles: <IExternalConsole[]>[
        {
            name: 'phing',
            parserStartString: 'Main targets:',
            executable: 'vendor/bin/phing',
            list: '-l',
            prefix: 'phing',
            topicDescription: 'Phing targets',
        },
        {
            name: 'symfony',
            parserStartString: 'Available commands:',
            executable: 'bin/console',
            list: 'list',
        },
    ],
};
