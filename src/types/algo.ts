import { ZodSchema } from "zod/lib/types"
import { SupportedInput } from "."

export type ValueOf<T extends Record<string, any>> = T[keyof T]

export type SafeGet<Obj, Key> = Key extends keyof Obj ? Obj[Key] : never

export type RenameKeys<T, Suffix extends string> = {
  [K in keyof T as `${string & K}${Suffix}`]: T[K]
}

export type InferZodType<T> = T extends ZodSchema
  ? NonNullable<T["~standard"]["types"]>["output"]
  : never

export type InferZodLookup<ZodLookup extends Record<string, any>> = {
  [K in keyof ZodLookup]: InferZodType<ZodLookup[K]>
}

export type RemapTypes<AllTypes, InputLookup> = [keyof AllTypes] extends [
  keyof InputLookup
]
  ? [keyof InputLookup] extends [keyof AllTypes]
    ? {
        [K in keyof InputLookup]: K extends keyof AllTypes
          ? AllTypes[K & keyof AllTypes]
          : InputLookup[K]
      }
    : never
  : never

// ------------------------------------------------------------

type _GetKeysWithType<
  Lookup extends Record<string, any>,
  Keys extends keyof Lookup,
  AcceptedType extends ValueOf<Lookup>
> = Keys extends string
  ? //
    Lookup[Keys] extends AcceptedType
    ? Keys
    : never
  : never

export type GetKeysWithType<
  Lookup extends Record<string, any>,
  AcceptedType extends ValueOf<Lookup>
> = _GetKeysWithType<
  //
  Lookup,
  keyof Lookup & string,
  AcceptedType
>

// ------------------------------------------------------------

type _GetKeysWithDifferentType<
  Lookup extends Record<string, any>,
  Keys extends keyof Lookup,
  RejectType extends ValueOf<Lookup>
> = Keys extends string
  ? //
    Lookup[Keys] extends RejectType
    ? never
    : Keys
  : never

export type GetKeysWithDifferentType<
  Lookup extends Record<string, any>,
  RejectType extends ValueOf<Lookup>
> = _GetKeysWithDifferentType<
  //
  Lookup,
  keyof Lookup & string,
  RejectType
>

// ------------------------------------------------------------

export type OmitBy<
  Lookup extends Record<string, SupportedInput>,
  RejectType extends ValueOf<Lookup>
> = {
  [K in GetKeysWithDifferentType<Lookup, RejectType>]: Lookup[K]
}

export type PickBy<
  Lookup extends Record<string, SupportedInput>,
  AcceptedType extends ValueOf<Lookup>
> = {
  [K in GetKeysWithType<
    //
    Lookup,
    AcceptedType
  >]: Lookup[K]
}
