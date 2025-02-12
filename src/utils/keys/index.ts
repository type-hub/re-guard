export type ExtractString<T> = T extends string ? T : never;
export type GetStringKeys<T extends Record<string, unknown>> = ExtractString<
  keyof T
>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function keys<T extends Record<string, any>>(o: T): GetStringKeys<T>[] {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return Object.values(o);
}
