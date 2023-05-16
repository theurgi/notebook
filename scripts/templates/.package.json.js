// utils/templates/package.json.js
export const packageJsonTemplate = ({ packageName }) => `{
  "name": "@phi.school/${packageName}",
  "version": "0.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsup --format esm --dts dist src/index.ts",
  },
  "devDependencies": {},
  "dependencies": {},
}`
