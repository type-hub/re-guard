import { assertBuilder, BuildAssert } from "../assertBuilder";
import { BrandedFunction } from "../types";
import { keys } from "../utils";

type BuildGuards<Lookup extends Record<string, BrandedFunction>> = {
  [Key in keyof Lookup]: BuildAssert<Lookup[Key]>;
};

export const assertsBuilder = <Lookup extends Record<string, BrandedFunction>>(
  lookup: Lookup
): BuildGuards<Lookup> =>
  keys(lookup).reduce((acc, key) => {
    acc[key] = assertBuilder(lookup[key]);

    return acc;
  }, {} as BuildGuards<Lookup>);
