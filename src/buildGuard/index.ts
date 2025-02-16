import { BrandedFunction, GetBrand } from "../types";

export type BuildGuard<BRF extends BrandedFunction> = (
  value: any
) => value is GetBrand<BRF>;

export const buildGuard = <BF extends BrandedFunction>(
  bf: BF
): BuildGuard<BF> => {
  const guard = (value: any): value is GetBrand<BF> => {
    const validator = bf();
    return validator(value);
  };

  return guard;
};
