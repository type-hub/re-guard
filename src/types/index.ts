import { ZodSchema } from "zod/lib/types";

export type ValidationWrapper = (value: any) => any;
export type SupportedInput = RegExp | ValidationWrapper | ZodSchema;
export type Input = SupportedInput | SupportedInput[];

export type BrandedFunction = {
  (): ValidationWrapper;
  name: string;
  brand: any;
};

export type CreateBrandedFunction<Name extends string, Brand> = {
  (): ValidationWrapper;
  name: Name;
  brand: Brand | undefined;
};

export type GetBrand<BRF extends BrandedFunction> = Exclude<
  BRF["brand"],
  undefined
>;
