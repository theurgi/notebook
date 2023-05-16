import { writeFileSync } from 'node:fs'

export const writeFile = (filePath, content) => {
	writeFileSync(filePath, content)
}
