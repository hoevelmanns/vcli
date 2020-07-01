import { IExternalConsole, IWorkspaceConfig } from './globals';

export const defaultConfigFile = '.vclirc.json';

export const defaultWorkspace = <IWorkspaceConfig>{
  notifications: {
    disabled: false,
    time: 2000,
  },
};

export const defaultConsoles = <IExternalConsole[]>[
  {
    name: 'symfony',
    parserStartString: 'Available commands:',
    executable: 'bin/console',
    list: 'list',
    regexList: '^(?!.*--.)^(.*:.).*(\\n)',
  },
  {
    name: 'phing',
    parserStartString: 'Main targets:',
    executable: 'vendor/bin/phing',
    list: '-l',
    topicName: 'build',
    topicDescription: 'Phing targets',
    regexList: '^(?!.*--.)^(.*  .).*(\\n)',
  },
  {
    name: 'laravel',
    executable: 'php artisan',
    regexList: '^(?!.*--.)^(.*:.).*(\\n)',
  },
];

export const defaultVagrantConfig = {
  vagrant: {
    deployDir: 'htdocs',
  },
};
