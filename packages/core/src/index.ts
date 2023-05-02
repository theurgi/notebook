/**
 * The Plugin interface represents the base structure for all plugins in the notebook project.
 */
export interface Plugin {
	/**
	 * A unique name for the plugin.
	 */
	name: string

	/**
	 * The plugin's version number.
	 */
	version: string

	/**
	 * The setup function is called when the plugin is initialized.
	 * @param context The notebook context in which the plugin operates.
	 */
	setup: (context: NotebookContext) => Promise<void> | void
}

/**
 * The NotebookContext interface provides a way for plugins to communicate with
 * each other and access shared data and functionality.
 */
export interface NotebookContext {
	/**
	 * Registers a new plugin with the notebook context.
	 * @param plugin The plugin to be registered.
	 */
	registerPlugin: (plugin: Plugin) => void

	/**
	 * Retrieves a registered plugin by its name.
	 * @param name The name of the plugin to retrieve.
	 * @returns The plugin with the specified name, or undefined if not found.
	 */
	getPlugin: (name: string) => Plugin | undefined

	/**
	 * Additional data can be stored on the NotebookContext as needed.
	 */
	[key: string]: unknown
}
