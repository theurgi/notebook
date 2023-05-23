import { injectable } from 'inversify'
import { beforeEach, describe, expect, it } from 'vitest'

import { NotebookContext } from '../NotebookContext'

@injectable()
class MockService {
	doSomething() {
		return 'I did something'
	}
}

describe('NotebookContext', () => {
	let notebookContext: NotebookContext

	beforeEach(() => {
		notebookContext = new NotebookContext()
	})

	it('should register a service correctly', () => {
		notebookContext.register(MockService)
		const service = notebookContext.get(MockService)
		expect(service).toBeInstanceOf(MockService)
	})

	it('should register a service with a custom scope correctly', () => {
		notebookContext.register(MockService, 'Transient')
		const service = notebookContext.get(MockService)
		expect(service).toBeInstanceOf(MockService)
	})

	it('should unregister a service correctly', () => {
		notebookContext.register(MockService)
		notebookContext.unregister(MockService)
		expect(() => notebookContext.get(MockService)).toThrow()
	})

	it('should throw an error when trying to register a service with the same identifier', () => {
		notebookContext.register(MockService)
		expect(() => notebookContext.register(MockService)).toThrow()
	})
})
