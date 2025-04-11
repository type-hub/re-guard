export type ExtractString<T> = T extends string ? T : never
export type GetStringKeys<T extends Record<string, unknown>> = ExtractString<
  keyof T
>

export const getKeys: <Obj extends Record<string, any>>(
  o: Obj
) => GetStringKeys<Obj>[] = Object.keys as any

export const toPairs = Object.entries as <T extends Record<string, any>>(
  obj: T
) => {
  [K in keyof T]: [K, T[K]]
}[keyof T & string][]

export const fromPairs = Object.fromEntries as <T extends [PropertyKey, any][]>(
  entries: T
) => {
  [K in T[number][0]]: Extract<T[number], [K, any]>[1]
}
