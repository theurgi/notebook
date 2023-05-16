import { mkdirSync } from 'node:fs'

export const createDirectory = (directoryPath) => {
	mkdirSync(directoryPath, { recursive: true })
}
