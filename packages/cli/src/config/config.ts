// packages/cli/src/config/config.ts
import os from 'node:os'
import path from 'node:path'

import Conf from 'conf'
import type { Options as ConfigOptions } from 'conf'

const CONFIG_PATH_ENV_VAR = 'NOTEBOOK_CONFIG_PATH'

const schema = {
	notebookPath: {
		type: 'string',
		default: path.join(os.homedir(), 'notebook'),
	},
}

const configOptions: ConfigOptions<typeof schema> = {
	configName: 'config',
	projectName: 'notebook',
	schema,
}

if (process.env[CONFIG_PATH_ENV_VAR]) {
	configOptions.cwd = process.env[CONFIG_PATH_ENV_VAR]
}

export const config = new Conf(configOptions)
