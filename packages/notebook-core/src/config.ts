// packages/notebook-core/src/config.ts
import os from 'node:os'
import path from 'node:path'

import Conf from 'conf'
import type { Options as ConfigOptions } from 'conf'

// A global environment variable that can be used to override the default config
const CONFIG_PATH_ENV_VAR = 'NOTEBOOK_CONFIG_PATH'

// Define the schema for the config. We will use the `as const` assertion to
// narrow the types of the values to their literal values, rather than their
// general types.
const schema = {
	notebookPath: path.join(os.homedir(), 'notebook'),
	// ...any other properties...
} as const

// Define a type to represent the values of the config. This will be used in the
// `NotebookContext` to provide type safety when accessing the config values.
export type ConfigValues = typeof schema

// Configure the `Conf` instance. We use `Object.entries` and `.map` to convert
// the `schema` into the format expected by `Conf`.
//
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const configOptions: ConfigOptions<any> = {
	configName: 'config',
	projectName: 'notebook',
	schema: Object.fromEntries(
		Object.entries(schema).map(([key, value]) => [
			key,
			{
				type: typeof value,
				default: value,
			},
		])
	),
}

// If the config path environment variable is set, use it as the cwd for the
// Conf instance.
if (process.env[CONFIG_PATH_ENV_VAR]) {
	configOptions.cwd = process.env[CONFIG_PATH_ENV_VAR]
}

// Export a function to create a new Conf instance with the configured options.
export const createConfig = () => {
	return new Conf(configOptions)
}
