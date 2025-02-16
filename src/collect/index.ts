import { buildAssertions } from "../buildAssertions";
import { buildGuards } from "../buildGuards";
import { createBrandedFunction } from "../createBrandedFunction";
import { CreateBrandedFunction, Input } from "../types";
import { GetStringKeys, keys } from "../utils/keys";

type MapRegexes<
  Lookup extends Record<string, Input>,
  Types extends Record<GetStringKeys<Lookup>, any>
> = {
  [Key in GetStringKeys<Lookup>]: CreateBrandedFunction<Key, Types[Key]>;
};

export const collect = <Lookup extends Record<string, Input>>(
  lookup: Lookup
) => ({
  brand: <RegTypes extends Record<keyof Lookup, any>>() => {
    const brandedFunctions = keys(lookup).reduce((acc, key) => {
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

        type Out = {
          [K in keyof typeof guards]: {
            guard: (typeof guards)[K];
            asserts: (typeof asserts)[K];
          };
        };

        const finalMap = keys(lookup).reduce((acc, key) => {
          acc[key]["guard"] = guards[key];
          return acc;
        }, {} as Out);

        return finalMap;
      },
    };
  },
});
