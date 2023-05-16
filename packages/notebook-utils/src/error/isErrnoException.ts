/**
 * Type guard for NodeJS.ErrnoException
 * @param error The error to be checked
 * @returns true if the error is an instance of NodeJS.ErrnoException, false otherwise
 */
export const isErrnoException = (
	error: unknown
): error is NodeJS.ErrnoException => {
	return (error as NodeJS.ErrnoException).code !== undefined
}
