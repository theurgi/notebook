// packages/cli/src/commands/init/index.ts
import { existsSync, mkdirSync } from 'node:fs'

import { help, heading, paragraph, space, table } from '@theurgi/help'
import type { Result, Spec } from 'arg'

import { config } from '../../config/config'
import { Command } from '../../utils/Command'

export class InitCommand extends Command {
	name = 'init'

	description = 'Initialize notebook and generate a configuration file'

	options = {
		'--help': Boolean,
		'-h': '--help',
	}

	help = help({
		display: [
			space(),
			paragraph(this.description),
			space(),
			heading('Usage'),
			space(),
			paragraph(`notebook ${this.name} [options]`, { indentLevel: 1 }),
			space(),
			heading('Options'),
			space(),
			table([['-h, --help', 'Display this help message']]),
		],
	})

	async run(args: Result<Spec>): Promise<void> {
		if (args['--help']) {
			this.displayHelp()
			return
		}

		const notebookPath = config.get('notebookPath') as unknown as string

		if (existsSync(notebookPath)) {
			console.log(`notebook already exists at ${notebookPath}`)
		} else {
			mkdirSync(notebookPath)
			console.log(`notebook created at ${notebookPath}`)
			console.log(`config located at ${config.path}`)
		}
	}
}
