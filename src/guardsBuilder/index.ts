import { BuildGuard, guardBuilder } from "../guardBuilder";
import { BrandedFunction } from "../types";
import { keys } from "../utils";

type BuildGuards<Lookup extends Record<string, BrandedFunction>> = {
  [Key in keyof Lookup]: BuildGuard<Lookup[Key]>;
};

export const guardsBuilder = <Lookup extends Record<string, BrandedFunction>>(
  lookup: Lookup
): BuildGuards<Lookup> =>
  keys(lookup).reduce((acc, key) => {
    acc[key] = guardBuilder(lookup[key]);

    return acc;
  }, {} as BuildGuards<Lookup>);
