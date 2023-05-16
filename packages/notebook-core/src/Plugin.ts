import { NotebookContext, CommandHandler } from './NotebookContext'

/**
 * The Plugin interface represents the base structure for all plugins in the
 * notebook project.
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
	 * It is responsible for registering the plugin's command handlers with the
	 * notebook context.
	 * @param context The notebook context in which the plugin operates.
	 */
	setup: (context: NotebookContext) => Promise<void> | void
	/**
	 * The commandHandlers object contains the plugin's command handlers.
	 * Each command handler is a function that can be invoked by other plugins or by the core application.
	 */
	commandHandlers: {
		[commandName: string]: CommandHandler
	}
	/**
	 * The beforeCommand hook will be called before each command.
	 * @param context The notebook context in which the plugin operates.
	 * @param commandName The name of the command that is about to be executed.
	 */
	beforeCommand?: (
		context: NotebookContext,
		commandName: string
	) => Promise<void> | void
	/**
	 * The afterCommand hook will be called after each command.
	 * @param context The notebook context in which the plugin operates.
	 * @param commandName The name of the command that has just been executed.
	 */
	afterCommand?: (
		context: NotebookContext,
		commandName: string
	) => Promise<void> | void
}
