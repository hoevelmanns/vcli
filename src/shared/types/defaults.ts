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
            regexList: '([^ ]*:\\w*\\S*[\\w])',
            regexCommandHelp: '',
        },
        {
            name: 'phing',
            parserStartString: 'Main targets:',
            executable: 'vendor/bin/phing',
            list: '-l',
            topicName: 'build',
            topicDescription: 'Phing targets',
            regexList: '([ ].+[ ]+[ ])\\b',
        },
    ],
};

export const defaultVagrantConfig = {
    vagrant: {
        deployDir: 'htdocs',
    },
};
