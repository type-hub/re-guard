import { BuildGuard, buildGuard } from "../buildGuard";
import { BrandedFunction } from "../types";
import { keys } from "../utils";

type BuildGuards<Lookup extends Record<string, BrandedFunction>> = {
  [Key in keyof Lookup]: BuildGuard<Lookup[Key]>;
};

export const buildGuards = <Lookup extends Record<string, BrandedFunction>>(
  lookup: Lookup
): BuildGuards<Lookup> =>
  keys(lookup).reduce((acc, key) => {
    acc[key] = buildGuard(lookup[key]);

    return acc;
  }, {} as BuildGuards<Lookup>);
