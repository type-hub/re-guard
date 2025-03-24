import { BuildAssertion, buildAssertion } from "../buildAssertion"
import { BuildGuard, buildGuard } from "../buildGuard"
import { SupportedInput } from "../types"
import {
  getStringKeys,
  ResolveInputName,
  resolveInputName,
  ResolveInputToType,
} from "../utils"

type CreateGuards<
  Lookup extends Record<string, SupportedInput>,
  Types extends Record<keyof Lookup, any>
> = {
  [K in keyof Lookup & string as `${K}Guard`]: BuildGuard<Types[K]>
}

type CreateAssertions<
  Lookup extends Record<string, SupportedInput>,
  Types extends Record<keyof Lookup, any>
> = {
  [K in keyof Lookup & string as `${K}Assert`]: BuildAssertion<Types[K]>
}

export type CreateInputs<Lookup extends Record<string, SupportedInput>> = {
  [K in keyof Lookup & string as ResolveInputName<
    K,
    Lookup[K]
  >]: ResolveInputToType<Lookup[K]>
}

export const collect = <Lookup extends Record<string, SupportedInput>>(
  lookup: Lookup
) => ({
  // TODO: infer zod types from lookup, zod keys should be optional
  setTypes: <Types extends Record<keyof Lookup, any>>() => {
    return {
      build: () => {
        const _keys = getStringKeys(lookup)

        const collection = _keys.reduce(
          (acc, key) => {
            const guardKey: `${typeof key}Guard` = `${key}Guard`
            const assertKey: `${typeof key}Assert` = `${key}Assert`
            const inputKey = resolveInputName(key, lookup[key])

            acc["guards"][guardKey] = buildGuard<
              Types[typeof key],
              (typeof lookup)[typeof key]
            >(lookup[key]) as any

            acc["asserts"][assertKey] = buildAssertion<
              Types[typeof key],
              (typeof lookup)[typeof key]
            >(lookup[key], key) as any

            acc["inputs"][inputKey] = buildAssertion<
              Types[typeof key],
              (typeof lookup)[typeof key]
            >(lookup[key], key) as any

            return acc
          },
          {
            guards: {} as CreateGuards<Lookup, Types>,
            asserts: {} as CreateAssertions<Lookup, Types>,
            inputs: {} as CreateInputs<Lookup>,
          }
        )

        return collection
      },
    }
  },
})
