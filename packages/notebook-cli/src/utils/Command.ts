// packages/cli/src/utils/Command.ts
import type { Result, Spec } from 'arg'

/**
 * An abstract class representing a command with a name, description, options, help message, and execution logic.
 * This class should be extended by specific command implementations.
 */
export abstract class Command {
	/**
	 * The name of the command.
	 */
	abstract name: string

	/**
	 * A brief description of the command.
	 */
	abstract description: string

	/**
	 * The options available for the command and their corresponding types.
	 */
	abstract options: Spec

	/**
	 * The help message structure for the command.
	 */
	abstract help: string

	/**
	 * Executes the command with the provided arguments.
	 *
	 * @param args The parsed command options to use during execution.
	 */
	abstract run(args: Result<Spec>): Promise<void> | void

	/**
	 * Displays the help message for the command.
	 */
	displayHelp(): void {
		console.log(this.help)
	}
}
