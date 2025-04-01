import { ZodSchema } from "zod/lib/types"
import { BuildAssertion, buildAssertion } from "../buildAssertion"
import { BuildGuard, buildGuard } from "../buildGuard"
import {
  GetKeysWithDifferentType,
  InferZodLookup,
  PickBy,
  RenameKeys,
  SafeGet,
  SupportedInput,
  ValueOf,
} from "../types"
import { getStringKeys, ResolveInputName, resolveInputName } from "../utils"

type CreateGuards<
  Lookup extends Record<string, SupportedInput>,
  Types extends Record<keyof Lookup, any>
  // Types extends Record<any, any>
> = {
  [K in keyof Lookup]: BuildGuard<Types[K]>
}

type CreateAssertions<
  Lookup extends Record<string, SupportedInput>,
  Types extends Record<keyof Lookup, any>
> = {
  [K in keyof Lookup]: BuildAssertion<Types[K & string]>
}

//

function _remapKeys<T extends Record<string, any>, Suffix extends string>(
  obj: T,
  suffix: Suffix
): RenameKeys<T, Suffix> {
  return Object.keys(obj).reduce((acc, key) => {
    const newKey = `${key}${suffix}` as keyof RenameKeys<T, Suffix>
    acc[newKey] = obj[key]
    return acc
  }, {} as RenameKeys<T, Suffix>)
}

//

type RenameInputKeys<T extends Record<string, SupportedInput>> = {
  [K in keyof T as `${ResolveInputName<K & string, T[K]>}`]: T[K]
}

function _remapInputKeys<T extends Record<string, SupportedInput>>(
  obj: T
): RenameInputKeys<T> {
  return (Object.keys(obj) as (keyof T & string)[]).reduce((acc, key) => {
    const newKey = resolveInputName(key, obj[key]) as keyof RenameInputKeys<T>
    acc[newKey] = obj[key] as unknown as RenameInputKeys<T>[typeof newKey]

    return acc
  }, {} as RenameInputKeys<T>)
}

export const collect = <InputLookup extends Record<string, SupportedInput>>(
  inputLookup: InputLookup
) => ({
  setTypes: <
    TypeLookupWithoutZod extends Record<
      GetKeysWithDifferentType<
        InputLookup,
        Extract<ValueOf<InputLookup>, ZodSchema>
      >,
      any
    >
  >() => {
    return {
      build: () => {
        type ZodLookup = PickBy<
          InputLookup,
          Extract<ValueOf<InputLookup>, ZodSchema>
        >

        type InferredZodLookup = InferZodLookup<ZodLookup>

        type AllTypes = TypeLookupWithoutZod & InferredZodLookup

        type SafeTypes = {
          [K in keyof InputLookup]: K extends keyof AllTypes
            ? AllTypes[K]
            : never
        }

        // ------------------------------------------------------------

        const _keys = getStringKeys(inputLookup)

        const { guards, asserts, inputs } = _keys.reduce(
          (acc, key) => {
            type AssignedValue = SafeGet<AllTypes, typeof key>

            acc["guards"][key] = buildGuard<
              AssignedValue,
              (typeof inputLookup)[typeof key]
            >(inputLookup[key])

            acc["asserts"][key] = buildAssertion<
              AssignedValue,
              (typeof inputLookup)[typeof key]
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
          guards: _remapKeys(guards, "Guard"),
          asserts: _remapKeys(asserts, "Assert"),
          inputs: _remapInputKeys(inputs),
        }
      },
    }
  },
})
