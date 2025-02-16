import { BrandedFunction, GetBrand } from "../types";

export type BuildAssertion<BF extends BrandedFunction> = (
  value: any
) => asserts value is GetBrand<BF>;

export function buildAssertion<BF extends BrandedFunction>(
  bf: BF
): BuildAssertion<BF> {
  function assert(value: any): asserts value is GetBrand<BF> {
    const validator = bf();

    if (!validator(value)) {
      throw new Error(
        `re-guard: ${bf.___name} assertion failed with value: ${value}`
      );
    }
  }

  return assert;
}
