// scripts/create-package.js
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { packagePkgJsonTemplate, tsconfigJsonTemplate } from './templates'
import { createDirectory, writeFile } from './utils'

/**
 * Initialize a new package in the packages directory.
 * @param {string} packageName - The name of the package.
 * @returns {void}
 */
const createPackage = (packageName) => {
	const __dirname = dirname(fileURLToPath(import.meta.url))

	// Directory paths
	const packageDirectory = join(__dirname, '..', 'packages', packageName)
	const srcDirectory = join(packageDirectory, 'src')

	// File paths
	const packageJsonPath = join(packageDirectory, 'package.json')
	const tsconfigJsonPath = join(packageDirectory, 'tsconfig.json')
	const indexPath = join(srcDirectory, 'index.ts')

	// File contents
	const packageJson = packagePkgJsonTemplate({ packageName })
	const tsconfigJson = tsconfigJsonTemplate
	const index = 'export const hello = "world"'

	// Create directories
	createDirectory(srcDirectory) // Creates both src and packageDirectory

	// Create files
	writeFile(packageJsonPath, packageJson)
	writeFile(tsconfigJsonPath, tsconfigJson)
	writeFile(indexPath, index)
}

/**
 * The CLI for creating a new package.
 * @returns {void}
 */
const cli = () => {
	const packageName = process.argv[2]

	if (!packageName) {
		console.error('Please provide a package name')
		process.exit(1)
	}

	const regex = /^notebook-[\w-]+$/

	if (!regex.test(packageName)) {
		console.error(
			'Package name must adhere to the notebook-<package> convention'
		)
		process.exit(1)
	}

	createPackage(packageName)
}

cli()
