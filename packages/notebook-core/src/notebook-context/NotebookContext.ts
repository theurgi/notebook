import { Container } from 'inversify'

import { CommandSystem } from '../command-system'
import {
	ServiceAlreadyRegisteredError,
	ServiceNotRegisteredError,
} from '../error-handling'
import { EventSystem } from '../event-system'
import { HookSystem } from '../hook-system'
import { MiddlewareSystem } from '../middleware-system'
import { ConfigService } from '../notebook-config'

/**
 * The NotebookContext class serves as the central management and access point
 * for the core systems of the notebook application. It uses Inversify's
 * Container to manage the lifecycle and accessibility of these systems,
 * providing a consistent interface for retrieving instances of these systems.
 *
 * The class includes methods for retrieving an instance of a registered system
 * (`get`) and for running the command system with a provided input (`run`).
 *
 * This is a high-level class responsible for initializing and coordinating the
 * core functionality of the notebook application.
 */
export class NotebookContext {
	private container: Container

	constructor() {
		this.container = new Container()
	}

	/**
	 * Registers a service with the NotebookContext container.
	 *
	 * This method binds a service to its own constructor within the context. The
	 * service can then be retrieved or used anywhere within the application that
	 * has access to the context. The scope of the service can be specified, but
	 * defaults to a singleton scope.
	 *
	 * @template T The type of the service being registered.
	 *
	 * @param {new (...args: any[]) => T} service The constructor of the
	 * service. This is used as the unique identifier for the service.
	 *
	 * @param {'Singleton' | 'Transient' | 'Request'} scope The lifecycle scope of the
	 * service. It can be 'Singleton', 'Transient' or 'Request'. Defaults to 'Singleton'.
	 *
	 * @throws {ServiceAlreadyRegisteredError} If a service with the same
	 * identifier is already registered in the context.
	 */
	public register<T>(
		service: new (...args: any[]) => T,
		scope: 'Singleton' | 'Transient' | 'Request' = 'Singleton'
	): void {
		if (this.container.isBound(service)) {
			throw new ServiceAlreadyRegisteredError(service.name)
		}

		const binding = this.container.bind<T>(service).toSelf()

		switch (scope) {
			case 'Singleton': {
				binding.inSingletonScope()
				break
			}
			case 'Transient': {
				binding.inTransientScope()
				break
			}
			case 'Request': {
				binding.inRequestScope()
				break
			}
		}
	}

	/**
	 * Unregisters a service from the NotebookContext container.
	 *
	 * This method unbinds a service from its identifier within the context,
	 * effectively removing it from the context. After this method is called,
	 * attempts to retrieve the service using its identifier will throw an error.
	 *
	 * @param {new (...args: any[]) => T} serviceIdentifier The constructor of the
	 * service. This is used as the unique identifier for the service.
	 *
	 * @throws {ServiceNotRegisteredError} If no service with the provided
	 * identifier is currently registered in the context.
	 *
	 * @returns {void}
	 */
	public unregister(serviceIdentifier: new (...args: any[]) => any): void {
		if (!this.container.isBound(serviceIdentifier)) {
			throw new ServiceNotRegisteredError(serviceIdentifier.name)
		}

		this.container.unbind(serviceIdentifier)
	}

	/**
	 * Retrieves an instance of a registered system.
	 *
	 * This method returns an instance of the system that is registered with the
	 * given service identifier. This could be any type of system that has been
	 * registered with the NotebookContext, such as a command handler, an event
	 * manager, etc.
	 *
	 * If the system is registered as a singleton, the same instance will be
	 * returned every time this method is called with the same identifier.
	 *
	 * @template T The type of the system being retrieved.
	 *
	 * @param {new (...args: any[]) => T} serviceIdentifier The constructor of the
	 * system. This is used as the unique identifier for the system.
	 *
	 * @throws {ServiceNotRegisteredError} If no system with the provided
	 * identifier is currently registered in the context.
	 *
	 * @returns {T} The instance of the system.
	 */
	public get<T>(serviceIdentifier: new (...args: any[]) => T): T {
		const service = this.container.get<T>(serviceIdentifier)
		if (!service) {
			throw new ServiceNotRegisteredError(serviceIdentifier.name)
		}
		return service
	}

	/**
	 * Runs the command system with the provided input.
	 *
	 * This method retrieves an instance of the command system and runs it with
	 * the provided input. It is an asynchronous method that returns a promise,
	 * which resolves when the command system has finished processing the input.
	 *
	 * @param {string[]} input The input to be processed by the command system.
	 *
	 * @throws {ServiceNotRegisteredError} If the command system is not currently
	 * registered in the context.
	 *
	 * @returns {Promise<void>} A promise that resolves when the command system
	 * has finished processing the input.
	 */
	public async run(input: string[]): Promise<void> {
		const commandSystem = this.get<CommandSystem>(CommandSystem)
		if (!commandSystem) {
			throw new ServiceNotRegisteredError('CommandSystem')
		}
		await commandSystem.handle(input)
	}

	/**
	 * Binds the core systems of the notebook application to themselves.
	 *
	 * This method is responsible for initializing the core systems and
	 * registering them in the context. It should be called once during the
	 * application startup process.
	 *
	 * @returns {void}
	 */
	public bindCoreSystems(): void {
		this.register(CommandSystem)
		this.register(EventSystem)
		this.register(HookSystem)
		this.register(MiddlewareSystem)
		this.register(ConfigService)
	}
}
