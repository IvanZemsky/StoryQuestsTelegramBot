export function isValueMatches<T>(object: Record<string, T>, value: T): boolean {
   return Object.values(object).includes(value)
}
