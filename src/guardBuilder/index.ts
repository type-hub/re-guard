import { BrandedFunction, GetBrand } from "../types";

export type BuildGuard<BRF extends BrandedFunction> = (
  v: any
) => v is GetBrand<BRF>;

export const guardBuilder = <BRF extends BrandedFunction>(
  brf: BRF
): BuildGuard<BRF> => {
  const guard = (value: any): value is GetBrand<BRF> => {
    const validator = brf();
    return validator(value);
  };

  return guard;
};
