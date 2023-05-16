// packages/cli/src/index.ts
import { exit } from 'node:process'

import { isErrnoException } from '@phi.school/notebook-utils'
import arg from 'arg'

import pkg from '../package.json'

import { CreateCommand, InitCommand } from './commands'
import { Command } from './utils/Command'
import { displayMainHelp } from './utils/mainHelp'

const commands: Record<string, new () => Command> = {
	create: CreateCommand,
	init: InitCommand,
}

const main = async () => {
	const rawArgs = process.argv.slice(2)

	const argumentSpec = {
		'--help': Boolean,
		'-h': '--help',
		'--version': Boolean,
		'-v': '--version',
	}

	// Parse global arguments
	const globalArgs = arg(argumentSpec, {
		argv: rawArgs,
		stopAtPositional: true,
	})

	if (globalArgs['--help']) {
		displayMainHelp()
		exit(0)
	}

	if (globalArgs['--version']) {
		console.log(`notebook-cli v${pkg.version}`)
		return
	}

	const commandName = rawArgs.shift()

	if (!commandName) {
		// No command was provided, display the main help
		displayMainHelp()
		exit(0)
	}

	// Instantiate the appropriate command class
	const CommandConstructor = commands[commandName]

	if (!CommandConstructor) {
		console.error(`unknown command: ${commandName}`)
		displayMainHelp()
		exit(1)
	}

	const command = new CommandConstructor()

	try {
		// Parse command-specific arguments and run the command
		const commandArgs = arg(command.options, {
			argv: rawArgs,
		})

		await command.run(commandArgs)
	} catch (error) {
		if (isErrnoException(error) && error.code === 'ARG_UNKNOWN_OPTION') {
			console.error(error.message)
			command.displayHelp()
		}
	}
}

// eslint-disable-next-line unicorn/prefer-top-level-await
main().catch((error) => {
	console.error(error.message)
	exit(1)
})
