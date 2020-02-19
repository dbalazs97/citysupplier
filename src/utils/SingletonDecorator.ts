const INSTANCE = Symbol('singleton-decorator:instance');

/**
 * Returns an instance of the Class
 */
function getInstance(Class: any, args = []): { new(): any } {
	return Class[INSTANCE] = Class[INSTANCE] instanceof Class ? Class[INSTANCE] : new Class(...args);
}

export function Singleton(Class: any): { new(): any } {
	const partiallyGetInstance = getInstance.bind(null, Class);
	// define the getInstance() method on the target
	Object.defineProperty(Class, 'getInstance', {
		value: partiallyGetInstance,
	});
	// @ts-ignore
	return partiallyGetInstance;
}
