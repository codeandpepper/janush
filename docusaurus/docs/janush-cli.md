---
sidebar_position: 3
title: CLI Options
---

Janush is a command-line tool that you use to initialize, develop, scaffold, and maintain cloud and web applications directly from a command shell.

## CLI command-language syntax

Command syntax is shown as follows:

janush optionNameOrAlias=requiredArg[optionalArg] [options]

- Some of options are obligatory and if not supplied, the appropriate prompt shows on screena after running command.
- Most options have aliases. Aliases are shown in the [Options Overview](#options-overview) for specific.
- Both option names and aliases are prefixed with a double dash (--).

### Boolean options

Boolean options do not take arguments e.g. --skip-install option sets its flag to true. If neither option is supplied, the flag remains in its default state, as listed in the [Options Overview](#options-overview).

## Options Overview 

OPTION | ALIAS | TYPE | DEFAULT VALUE | DESCRIPTION
-------|-------|------|---------------|------------
--name | -n | string | janush-app | Sets application name.
--types | -t | object | {cloud, web} | Sets application types to be installed.
<span style={{ whiteSpace: 'nowrap' }}>--is-auto-generated</span> | | boolean | false | Outputs, if created by deployment bot.
--skip-install | -s | boolean | false | Skip installing dependencies.
--version | -v | boolean | false | Outputs Janush version.
--help | -h | boolean | false | Outputs short Janush help.

