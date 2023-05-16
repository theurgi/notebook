const commonPkgJsonTemplate = {
	version: '0.0.0',
	main: 'dist/index.js',
	types: 'dist/index.d.ts',
	scripts: {
		build: 'tsup src/index.ts --format esm --dts',
		dev: 'tsup src/index.ts --format esm --dts --watch',
	},
}

export const packagePkgJsonTemplate = ({ packageName }) => {
	return JSON.stringify({
		name: `@phi.school/${packageName}`,
		...commonPkgJsonTemplate,
	})
}

export const pluginPkgJsonTemplate = ({ pluginName }) => {
	return JSON.stringify({
		name: `@phi.school/${pluginName}`,
		...commonPkgJsonTemplate,
		dependencies: {
			'@phi.school/notebook-core': 'workspace:^',
			'@phi.school/notebook-utils': 'workspace:^',
		},
	})
}
