import { CreateReGuard, reGuard } from "../reGuard"
import { SupportedInput } from "../types"
import { GetStringKeys, keys } from "../utils/keys"

type MapInput<
  Lookup extends Record<string, SupportedInput>,
  Types extends Record<GetStringKeys<Lookup>, any>
> = {
  [Key in GetStringKeys<Lookup>]: CreateReGuard<Key, Lookup[Key], Types[Key]>
}

export const collect = <Lookup extends Record<string, SupportedInput>>(
  lookup: Lookup
) => ({
  setTypes: <RegTypes extends Record<keyof Lookup, any>>() => {
    return {
      build: (): MapInput<Lookup, RegTypes> => {
        const _keys = keys(lookup)

        const brandedFunctions = _keys.reduce((acc, key) => {
          acc[key] = reGuard(key, lookup[key])
            .type<RegTypes[typeof key]>()
            .build()

          return acc
        }, {} as MapInput<Lookup, RegTypes>)

        return brandedFunctions
      },
    }
  },
})
