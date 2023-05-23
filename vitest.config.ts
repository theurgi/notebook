import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		include: ['packages/notebook-core/src/**/tests/*.ts'],
	},
})
