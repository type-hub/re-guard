export type ExtractString<T> = T extends string ? T : never;
export type GetStringKeys<T extends Record<string, unknown>> = ExtractString<
  keyof T
>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function keys<Obj extends Record<string, any>>(
  o: Obj
): GetStringKeys<Obj>[] {
  return Object.keys(o) as GetStringKeys<Obj>[];
}
