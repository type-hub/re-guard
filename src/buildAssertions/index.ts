import { BuildAssertion, buildAssertion } from "../buildAssertion";
import { BrandedFunction } from "../types";
import { keys } from "../utils";

type BuildAssertions<Lookup extends Record<string, BrandedFunction>> = {
  [Key in keyof Lookup]: BuildAssertion<Lookup[Key]>;
};

export const buildAssertions = <Lookup extends Record<string, BrandedFunction>>(
  lookup: Lookup
): BuildAssertions<Lookup> =>
  keys(lookup).reduce((acc, key) => {
    acc[key] = buildAssertion(lookup[key]);

    return acc;
  }, {} as BuildAssertions<Lookup>);
