export type ExtractString<T> = T extends string ? T : never
export type GetStringKeys<T extends Record<string, unknown>> = ExtractString<
  keyof T
>

export const getStrKeys = <Obj extends Record<string, any>>(
  o: Obj
): GetStringKeys<Obj>[] => Object.keys(o) as GetStringKeys<Obj>[]
