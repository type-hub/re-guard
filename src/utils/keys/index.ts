export type ExtractString<T> = T extends string ? T : never
export type GetStringKeys<T extends Record<string, unknown>> = ExtractString<
  keyof T
>

export function getStringKeys<Obj extends Record<string, any>>(
  o: Obj
): GetStringKeys<Obj>[] {
  return Object.keys(o) as GetStringKeys<Obj>[]
}
