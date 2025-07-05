
export const delay = (ms:number) => new Promise(resolve => setTimeout(resolve, ms))
export function spawn<T>(promise: () => Promise<T>): void { promise() }

