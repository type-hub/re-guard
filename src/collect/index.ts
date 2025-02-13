import { assertsBuilder } from "../assertsBuilder";
import { createBrandedFunction } from "../createBrandedFunction";
import { guardsBuilder } from "../guardsBuilder";
import { CreateBrandedFunction, Input } from "../types";
import { GetStringKeys, keys } from "../utils/keys";

type MapRegexes<
  T extends Record<string, Input>,
  _RxTypes extends Record<GetStringKeys<T>, any>
> = {
  [K in GetStringKeys<T>]: CreateBrandedFunction<K, _RxTypes[K]>;
};

export const collect = <RegLookup extends Record<string, Input>>(
  regLookup: RegLookup
) => ({
  brand: <RegTypes extends Record<keyof RegLookup, any>>() => {
    const brandedFunctions = keys(regLookup).reduce((acc, key) => {
      acc[key] = createBrandedFunction<RegTypes[typeof key]>()(
        regLookup[key],
        key
      );

      return acc;
    }, {} as MapRegexes<RegLookup, RegTypes>);

    return {
      build: () => {
        const guards = guardsBuilder(brandedFunctions);
        const asserts = assertsBuilder(brandedFunctions);

        type Out = {
          [K in keyof typeof guards]: {
            guard: (typeof guards)[K];
            asserts: (typeof asserts)[K];
          };
        };

        const finalMap = keys(regLookup).reduce((acc, key) => {
          acc[key]["guard"] = guards[key];
          return acc;
        }, {} as Out);

        return finalMap;
      },
    };
  },
});
