export class ServiceNotRegisteredError extends Error {
	constructor(serviceIdentifier: string) {
		super(`Service ${serviceIdentifier} is not registered.`)
		this.name = 'ServiceNotRegisteredError'
	}
}

export class ServiceAlreadyRegisteredError extends Error {
	constructor(serviceIdentifier: string) {
		super(`Service ${serviceIdentifier} is already registered.`)
		this.name = 'ServiceAlreadyRegisteredError'
	}
}
