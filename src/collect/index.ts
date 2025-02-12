import { createBrandedFunction } from "../createBrandedFunction";
import { guardsBuilder } from "../guardsBuilder";
import { CreateBrandedRegex, NamedRegexFactory } from "../types";
import { GetStringKeys, keys } from "../utils/keys";

type MapRegexes<
  T extends Record<string, NamedRegexFactory>,
  _RxTypes extends Record<GetStringKeys<T>, any>
> = {
  [K in GetStringKeys<T>]: CreateBrandedRegex<K, _RxTypes[K]>;
};

export const collect = <RegLookup extends Record<string, NamedRegexFactory>>(
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
        return guardsBuilder(brandedFunctions);
      },
    };
  },
});
