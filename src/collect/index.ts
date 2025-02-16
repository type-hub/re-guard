import { buildAssertions } from "../buildAssertions";
import { buildGuards } from "../buildGuards";
import { createBrandedFunction } from "../createBrandedFunction";
import { CreateBrandedFunction, Input } from "../types";
import { isRegex } from "../utils";
import { GetStringKeys, keys } from "../utils/keys";

type MapRegexes<
  Lookup extends Record<string, Input>,
  Types extends Record<GetStringKeys<Lookup>, any>
> = {
  [Key in GetStringKeys<Lookup>]: CreateBrandedFunction<Key, Types[Key]>;
};

type ExcludeNonRegexes<
  Obj extends Record<string, any>,
  Key extends keyof Obj
> = Obj[Key] extends RegExp ? Key : never;
// type ExcludeNonRegexes<Obj extends Record<string, any>, Key extends keyof Obj> = Obj[Key] extends RegExp ? Pick<Obj, Key> : never

export const collect = <Lookup extends Record<string, Input>>(
  lookup: Lookup
) => ({
  setTypes: <RegTypes extends Record<keyof Lookup, any>>() => {
    const _keys = keys(lookup);

    const brandedFunctions = _keys.reduce((acc, key) => {
      acc[key] = createBrandedFunction<RegTypes[typeof key]>()(
        lookup[key],
        key
      );

      return acc;
    }, {} as MapRegexes<Lookup, RegTypes>);

    return {
      build: () => {
        const guards = buildGuards(brandedFunctions);
        const asserts = buildAssertions(brandedFunctions);

        type MaybeRegexesLookup = {
          [K in keyof Lookup as ExcludeNonRegexes<Lookup, K>]: RegExp;
          // [K in keyof Lookup as Lookup[K]]: RegExp;
        };

        type GetRegex<K extends keyof Lookup> = Lookup[K] extends RegExp
          ? Lookup[K]
          : never;

        type MaybeRegex = "";

        type Out = {
          [K in keyof typeof guards]: {
            guard: (typeof guards)[K];
            assert: (typeof asserts)[K];

            // regex: MaybeRegexesLookup[K]; //  GetRegex<K>//
            // regex: ExcludeNonRegexes<Lookup, K>
          };
        };

        const finalMap = _keys.reduce((acc, key) => {
          if (!(key in acc)) {
            acc[key] = {} as Out[typeof key];
          }

          acc[key]["guard"] = guards[key];
          acc[key]["assert"] = asserts[key];
          if (isRegex(lookup[key])) {
            // acc[key]["regex"] = lookup[key];
          }

          return acc;
        }, {} as Out);

        return finalMap;
      },
    };
  },
});
