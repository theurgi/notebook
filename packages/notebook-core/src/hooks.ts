// packages/notebook-core/src/hooks.ts
import type { NotebookContext } from './NotebookContext'

export type Hook<T extends unknown[]> = (
	context: NotebookContext,
	...args: T
) => Promise<void> | void

const createHook = <T extends unknown[]>(handler: Hook<T>): Hook<T> => {
	return (context: NotebookContext, ...args: T): Promise<void> | void => {
		return handler(context, ...args)
	}
}

export const beforeCommandHook = createHook(
	(context: NotebookContext, commandName: string) => {
		// TODO: implementation...
	}
)

export const afterCommandHook = createHook(
	(context: NotebookContext, commandName: string) => {
		// TODO: implementation...
	}
)
