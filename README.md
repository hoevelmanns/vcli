vcli
====

#### An universal and extensible CLI
Wraps your current Command Line Interfaces and allows you to stream the CLI commands in custom commands. 


[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @hoevelmanns/vcli
$ vc COMMAND
running command...
$ vc (-v|--version|version)
@hoevelmanns/vcli/1.3.29 linux-x64 node-v12.13.1
$ vc --help [COMMAND]
USAGE
  $ vc COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`vc autocomplete [SHELL]`](#vc-autocomplete-shell)
* [`vc conf [KEY] [VALUE]`](#vc-conf-key-value)
* [`vc create`](#vc-create)
* [`vc help [COMMAND]`](#vc-help-command)
* [`vc refresh [VM]`](#vc-refresh-vm)
* [`vc search`](#vc-search)
* [`vc vm (v) [COMMAND]`](#vc-vm-v-command)
* [`vc workspace`](#vc-workspace)

## `vc autocomplete [SHELL]`

display autocomplete installation instructions

```
USAGE
  $ vc autocomplete [SHELL]

ARGUMENTS
  SHELL  shell type

OPTIONS
  -r, --refresh-cache  Refresh cache (ignores displaying instructions)

EXAMPLES
  $ vc autocomplete
  $ vc autocomplete bash
  $ vc autocomplete zsh
  $ vc autocomplete --refresh-cache
```

_See code: [@oclif/plugin-autocomplete](https://github.com/oclif/plugin-autocomplete/blob/v0.2.0/src/commands/autocomplete/index.ts)_

## `vc conf [KEY] [VALUE]`

manage configuration

```
USAGE
  $ vc conf [KEY] [VALUE]

ARGUMENTS
  KEY    key of the config
  VALUE  value of the config

OPTIONS
  -d, --cwd=cwd          config file location
  -d, --delete           delete?
  -h, --help             show CLI help
  -k, --key=key          key of the config
  -n, --name=name        config file name
  -p, --project=project  project name
  -v, --value=value      value of the config
```

_See code: [conf-cli](https://github.com/natzcam/conf-cli/blob/v0.1.9/src/commands/conf.ts)_

## `vc create`

create workspace

```
USAGE
  $ vc create

OPTIONS
  -h, --help    show CLI help
  -n, --create  create workspace
```

_See code: [src/commands/create.ts](https://github.com/hoevelmanns/vcli/blob/v1.3.29/src/commands/create.ts)_

## `vc help [COMMAND]`

display help for vc

```
USAGE
  $ vc help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.1.0/src/commands/help.ts)_

## `vc refresh [VM]`

add commands from external consoles defined in .vclirc.json to VCLI

```
USAGE
  $ vc refresh [VM]

OPTIONS
  -h, --help       show CLI help
  -o, --overwrite  delete existing commands
  -v, --vm         (alias: vm) run generator in virtual machine

ALIASES
  $ vc r
```

_See code: [src/commands/refresh.ts](https://github.com/hoevelmanns/vcli/blob/v1.3.29/src/commands/refresh.ts)_

## `vc search`

search for commands, apps, etc.

```
USAGE
  $ vc search

OPTIONS
  -h, --help  show CLI help

ALIASES
  $ vc s
```

_See code: [src/commands/search.ts](https://github.com/hoevelmanns/vcli/blob/v1.3.29/src/commands/search.ts)_

## `vc vm (v) [COMMAND]`

virtual machine

```
USAGE
  $ vc vm (v) [COMMAND]

OPTIONS
  -h, --help  show CLI help
  -s, --halt  stop the VM
  -u, --up    start the VM

ALIASES
  $ vc v
```

_See code: [src/commands/vm.ts](https://github.com/hoevelmanns/vcli/blob/v1.3.29/src/commands/vm.ts)_

## `vc workspace`

manage workspace

```
USAGE
  $ vc workspace

OPTIONS
  -h, --help         show CLI help
  -i, --hideCommand  hide commands

ALIASES
  $ vc ws
```

_See code: [src/commands/workspace.ts](https://github.com/hoevelmanns/vcli/blob/v1.3.29/src/commands/workspace.ts)_
<!-- commandsstop -->
