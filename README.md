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
@hoevelmanns/vcli/0.6.5-poc linux-x64 node-v12.13.1
$ vc --help [COMMAND]
USAGE
  $ vc COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`vc autocomplete [SHELL]`](#vc-autocomplete-shell)
* [`vc help [COMMAND]`](#vc-help-command)

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
<!-- commandsstop -->
