import { ZodSchema } from "zod"
import { MakeAssertion, makeAssertion } from "../buildAssertion"
import { MakeGuard, makeGuard } from "../buildGuard"
import type {
  GetKeysWithDifferentType,
  InferZodLookup,
  Input,
  PickBy,
  RenameKeys,
  SafeGet,
  ValueOf,
} from "../types"
import {
  fromPairs,
  getKeys,
  ResolveInputName,
  resolveInputName,
  toPairs,
} from "../utils"

type CreateGuards<
  Lookup extends Record<string, Input>,
  Types extends Record<keyof Lookup, any>
> = {
  [K in keyof Lookup]: MakeGuard<Types[K]>
}

type CreateAssertions<
  Lookup extends Record<string, Input>,
  Types extends Record<keyof Lookup, any>
> = {
  [K in keyof Lookup]: MakeAssertion<Types[K & string]>
}

//

const remapKeys = <Obj extends Record<string, any>, Suffix extends string>(
  obj: Obj,
  suffix: Suffix
) =>
  fromPairs(
    toPairs(obj).map(([key, value]) => [`${key}${suffix}`, value])
  ) as RenameKeys<Obj, Suffix>

//

type RenameInputKeys<T extends Record<string, Input>> = {
  [K in keyof T as `${ResolveInputName<K & string, T[K]>}`]: T[K]
}

const remapInputKeys = <T extends Record<string, Input>>(obj: T) =>
  fromPairs(
    toPairs(obj).map(([key, value]) => [resolveInputName(key, value), value])
  ) as unknown as RenameInputKeys<T>

export const collect = <
  InputLookup extends Record<string, Input>,
  TypeLookupWithoutZod extends Record<
    GetKeysWithDifferentType<
      InputLookup,
      Extract<ValueOf<InputLookup>, ZodSchema>
    >,
    any
  >
>(
  inputLookup: InputLookup
) => {
  type ZodLookup = PickBy<InputLookup, Extract<ValueOf<InputLookup>, ZodSchema>>
  type InferredZodLookup = InferZodLookup<ZodLookup>
  type AllTypes = TypeLookupWithoutZod & InferredZodLookup

  type SafeTypes = {
    [K in keyof InputLookup]: K extends keyof AllTypes ? AllTypes[K] : never
  }

  const { guards, asserts, inputs } = getKeys(inputLookup).reduce(
    (acc, key) => {
      type AssignedValue = SafeGet<AllTypes, typeof key>

      acc["guards"][key] = makeGuard<
        (typeof inputLookup)[typeof key],
        AssignedValue
      >(inputLookup[key])

      acc["asserts"][key] = makeAssertion<
        (typeof inputLookup)[typeof key],
        AssignedValue
      >(inputLookup[key], key)

      acc["inputs"][key] = inputLookup[key]

      return acc
    },
    {
      guards: {} as CreateGuards<InputLookup, SafeTypes>,
      asserts: {} as CreateAssertions<InputLookup, SafeTypes>,
      inputs: {} as InputLookup,
    }
  )

  return {
    guards: remapKeys(guards, "Guard"),
    asserts: remapKeys(asserts, "Assert"),
    inputs: remapInputKeys(inputs),
  }
}
