// packages/cli/src/utils/mainHelp.ts
import { help, heading, paragraph, space, table } from '@theurgi/help'

import * as Commands from '../commands'

const commands: [string, string][] = []

for (const Command of Object.values(Commands)) {
	const command = new Command()
	commands.push([command.name, command.description])
}

const mainHelp = help({
	display: [
		space(),
		paragraph('notebook main help'),
		space(),
		heading('Usage'),
		space(),
		paragraph(`notebook <command> [options]`, { indentLevel: 1 }),
		space(),
		heading('Commands'),
		space(),
		table(commands),
		space(),
		heading('Options'),
		space(),
		table([
			['-h, --help', 'Display this help message'],
			['-v, --version', 'Display the version number'],
		]),
	],
})

export const displayMainHelp = () => {
	console.log(mainHelp)
	return true
}
