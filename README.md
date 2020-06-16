vcli
====

#### An universal and extensible CLI
Wraps your current Command Line Interfaces and allows you to stream the CLI commands in custom commands. 


[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/vcli.svg)](https://npmjs.org/package/@hoevelmanns/vcli)
[![Downloads/week](https://img.shields.io/npm/dw/vcli.svg)](https://npmjs.org/package/@hoevelmanns/vcli)
[![License](https://img.shields.io/npm/l/vcli.svg)](https://github.com/hoevelmanns/vcli/blob/master/package.json)

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
@hoevelmanns/vcli/0.9.2 linux-x64 node-v12.13.1
$ vc --help [COMMAND]
USAGE
  $ vc COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`vc autocomplete [SHELL]`](#vc-autocomplete-shell)
* [`vc build`](#vc-build)
* [`vc conf [KEY] [VALUE]`](#vc-conf-key-value)
* [`vc create`](#vc-create)
* [`vc halt`](#vc-halt)
* [`vc help [COMMAND]`](#vc-help-command)
* [`vc refresh`](#vc-refresh)
* [`vc up`](#vc-up)

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

## `vc build`

build

```
USAGE
  $ vc build

OPTIONS
  -d, --clear=clear        clears the Shopware cache
  -f, --force
  -g, --generate=generate  generates a new template cache
  -h, --help               show CLI help
```

_See code: [src/commands/build.ts](https://github.com/hoevelmanns/vcli/blob/v0.9.2/src/commands/build.ts)_

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

_See code: [src/commands/create.ts](https://github.com/hoevelmanns/vcli/blob/v0.9.2/src/commands/create.ts)_

## `vc halt`

halt the machine

```
USAGE
  $ vc halt

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/halt.ts](https://github.com/hoevelmanns/vcli/blob/v0.9.2/src/commands/halt.ts)_

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

## `vc refresh`

add commands from external consoles defined in .vclirc.json to VCLI

```
USAGE
  $ vc refresh

OPTIONS
  -h, --help     show CLI help
  -v, --vagrant  run generator in vagrant
```

_See code: [src/commands/refresh.ts](https://github.com/hoevelmanns/vcli/blob/v0.9.2/src/commands/refresh.ts)_

## `vc up`

start the machine

```
USAGE
  $ vc up

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/up.ts](https://github.com/hoevelmanns/vcli/blob/v0.9.2/src/commands/up.ts)_
<!-- commandsstop -->
