import { BrandedFunction, GetBrand } from "../types";

export type BuildAssert<BRF extends BrandedFunction> = (
  value: string
) => asserts value is GetBrand<BRF>;

export function assertBuilder<BRF extends BrandedFunction>(
  brf: BRF
  // ): BuildAssert<BRF> {
): (value: string) => asserts value is "GetBrand<BRF>" {
  // function assert(value: string): asserts value is GetBrand<BRF> {
  function assert(value: string): asserts value is "GetBrand<BRF>" {
    const validator = brf();

    if (!validator(value)) {
      throw new Error(`re-guard: assertion failed, ${brf.name}`);
    }
  }

  return assert;
}

export function MY_TEST(value: string): asserts value is `${boolean}` {
  if (!/aaa/.test(value)) {
    throw new Error(`re-guard: assertion failed,`);
  }
}

MY_TEST("aaas");
