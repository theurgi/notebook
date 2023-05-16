// plugins/notebook-plugin-template/src/index.ts
import { access } from 'node:fs/promises'
import { dirname, join } from 'node:path'

import { Plugin } from '@phi.school/notebook-core'
import type { CommandHandler, NotebookContext } from '@phi.school/notebook-core'
import { isErrnoException } from '@phi.school/notebook-utils'

import { version } from '../package.json'

const resolveTemplate: CommandHandler = async (
	context: NotebookContext,
	...args
) => {
	const targetPath = args[0] as string

	const notebookRoot = ''

	let currentPath = targetPath
	let templatePath: string | null = null

	while (currentPath !== notebookRoot) {
		const potentialTemplatePath = join(currentPath, '.template.md')

		try {
			await access(potentialTemplatePath)
			templatePath = potentialTemplatePath
			break
		} catch (error) {
			if (isErrnoException(error) && error.code !== 'ENOENT') {
				throw new Error(`Error while resolving template: ${error.message}`)
			}
		}

		currentPath = dirname(currentPath)
	}

	return templatePath
}

const plugin: Plugin = {
	name: 'notebook-plugin-template',
	version,
	setup: async (context) => {
		// Register the custom logic with the notebook context
		context.registerCommandHandler(
			plugin.name,
			'resolveTemplate',
			resolveTemplate
		)
	},
	commandHandlers: {
		resolveTemplate,
	},
}

export default plugin
