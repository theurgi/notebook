// packages/notebook-core/src/NotebookContext.ts
import rfdc from 'rfdc'

import type { ConfigValues } from './config'
import type { Hook } from './hooks'
import type { Plugin } from './Plugin'

const clone = rfdc()

/**
 * CommandHandler is a function type that represents the commands a plugin can provide.
 * A command handler can take any number of arguments and return any result.
 */
export type CommandHandler = (
	context: NotebookContext,
	...args: unknown[]
) => unknown

/**
 * The NotebookContext class represents the global context of the notebook.
 * It provides methods for registering and invoking command handlers.
 */
export class NotebookContext {
	private config: ConfigValues

	private commandHandlers: {
		[pluginName: string]: { [commandName: string]: CommandHandler }
	} = {}

	private safeExposedConfig: Partial<ConfigValues> | null = null

	private hooks: {
		[pluginName: string]: {
			beforeCommand?: Hook<[string]>
			afterCommand?: Hook<[string]>
		}
	} = {}

	constructor(config: ConfigValues) {
		this.config = config
	}

	/**
	 * Returns a copy of the configuration data that is safe to expose to plugins.
	 * @returns A copy of the configuration data.
	 */
	getConfig(): Partial<ConfigValues> {
		// Only copy the config the first time getConfig is called
		if (!this.safeExposedConfig) {
			// Create a full deep clone of the config
			const deepClonedConfig = clone(this.config)
			// Only retain properties that are safe to expose to plugins
			this.safeExposedConfig = {
				notebookPath: deepClonedConfig.notebookPath,
				// ...any other properties that should be exposed...
			}
		}

		return this.safeExposedConfig
	}

	/**
	 * Register a plugin.
	 * @param plugin The plugin to register.
	 */
	async registerPlugin(plugin: Plugin) {
		// Register command handlers
		this.commandHandlers[plugin.name] = plugin.commandHandlers

		// Register hooks
		if (plugin.hooks) {
			this.hooks[plugin.name] = plugin.hooks
		}

		// Call the setup function if it exists
		if (plugin.setup) {
			await plugin.setup(this)
		}
	}

	/**
	 * Invoke a command handler.
	 * @param pluginName The name of the plugin.
	 * @param commandName The name of the command.
	 * @param args The arguments to pass to the command handler.
	 * @returns The result of the command handler.
	 */
	async invokeCommandHandler(
		pluginName: string,
		commandName: string,
		...args: unknown[]
	): Promise<unknown> {
		const handler = this.commandHandlers[pluginName]?.[commandName]

		if (!handler) {
			throw new Error(`Command "${commandName}" not found.`)
		}

		return handler(this, ...args)
	}

	/**
	 * Invoke all functions registered for a hook.
	 * @param hookName The name of the hook.
	 * @param args The arguments to pass to the hook functions.
	 * @returns An array of the results of each hook function.
	 */
	async invokeHooks(
		hookName: keyof Plugin['hooks'],
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		...args: [any]
	): Promise<unknown[]> {
		const hookFunctions = this.hooks[hookName]

		if (!hookFunctions) {
			return []
		}

		const hookResults = await Promise.all(
			Object.values(hookFunctions).map((hook) => hook?.(this, ...args))
		)

		return hookResults
	}
}
