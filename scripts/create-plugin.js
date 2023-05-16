import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { pluginPkgJsonTemplate, tsconfigJsonTemplate } from './templates'
import { createDirectory, writeFile } from './utils'

/**
 * Initialize a new plugin in the plugins directory.
 * @param {string} pluginName - The name of the plugin.
 * @returns {void}
 */
const createPlugin = (pluginName) => {
	const __dirname = dirname(fileURLToPath(import.meta.url))

	// Directory paths
	const pluginDirectory = join(__dirname, '..', 'plugins', pluginName)
	const srcDirectory = join(pluginDirectory, 'src')

	// File paths
	const packageJsonPath = join(pluginDirectory, 'package.json')
	const tsconfigJsonPath = join(pluginDirectory, 'tsconfig.json')
	const indexPath = join(srcDirectory, 'index.ts')

	// File contents
	const packageJson = pluginPkgJsonTemplate({ pluginName })
	const tsconfigJson = tsconfigJsonTemplate
	const index = 'export const hello = "world"'

	// Create directories
	createDirectory(srcDirectory) // Creates both src and pluginDirectory

	// Create files
	writeFile(packageJsonPath, packageJson)
	writeFile(tsconfigJsonPath, tsconfigJson)
	writeFile(indexPath, index)
}

/**
 * The CLI for creating a new plugin.
 * @returns {void}
 */
const cli = () => {
	const pluginName = process.argv[2]

	if (!pluginName) {
		console.error('Please provide a plugin name')
		process.exit(1)
	}

	const regex = /^notebook-plugin-[\w-]+$/

	if (!regex.test(pluginName)) {
		console.error(
			'Plugin name must adhere to the notebook-plugin-<plugin> convention'
		)
		process.exit(1)
	}

	createPlugin(pluginName)
}

cli()
