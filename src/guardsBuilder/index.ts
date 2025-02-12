import { BuildGuard, guardBuilder } from "../guardBuilder";
import { BrandedRegexFactory } from "../types";
import { keys } from "../utils";

type BuildGuards<Lookup extends Record<string, BrandedRegexFactory>> = {
  [Key in keyof Lookup]: BuildGuard<Lookup[Key]>;
};

export const guardsBuilder = <
  Lookup extends Record<string, BrandedRegexFactory>
>(
  lookup: Lookup
): BuildGuards<Lookup> =>
  keys(lookup).reduce((acc, key) => {
    acc[key] = guardBuilder(lookup[key]);

    return acc;
  }, {} as BuildGuards<Lookup>);
