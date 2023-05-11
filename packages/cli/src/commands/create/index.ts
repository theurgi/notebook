import { existsSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

import { help, heading, paragraph, space, table } from '@theurgi/help'
import type { Result, Spec } from 'arg'

import { Command } from '../../utils/Command'

export class CreateCommand extends Command {
	name = 'create'

	description = 'Create a new note'

	options = {
		'--help': Boolean,
		'--name': String,
		'--path': String,
		'-h': '--help',
		'-n': '--name',
		'-p': '--path',
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
			table([
				['-n, --name', 'Specify a custom name for the new note'],
				['-p, --path', 'Specify a custom directory for the new note'],
				['-h, --help', 'Display this help message'],
			]),
		],
	})

	async run(args: Result<Spec>): Promise<void> {
		if (args['--help']) {
			this.displayHelp()
			return
		}

		const noteName = args['--name'] || `note_${new Date().toISOString()}.md`
		const notePath = args['--path'] || process.cwd()

		const fullPath = join(notePath, noteName)

		if (existsSync(fullPath)) {
			console.error(`Error: File already exists at ${fullPath}`)
			return
		}

		try {
			writeFileSync(fullPath, '')
			console.log(`Created a new note at ${fullPath}`)
		} catch (error) {
			console.error(`Error: Unable to create note at ${fullPath}`, error)
		}
	}
}
