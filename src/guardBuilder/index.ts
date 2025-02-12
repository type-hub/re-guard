import { BrandedRegexFactory, ExcludeUndefined } from "../types";

type GetBrand<BRF extends BrandedRegexFactory> = ExcludeUndefined<BRF["brand"]>;

export type BuildGuard<BRF extends BrandedRegexFactory> = (
  v: string
) => v is GetBrand<BRF>;

export const guardBuilder = <BRF extends BrandedRegexFactory>(
  brf: BRF
): BuildGuard<BRF> => {
  const guard = (value: string): value is GetBrand<BRF> => {
    const regex = brf();
    return regex.test(value);
  };

  return guard;
};
