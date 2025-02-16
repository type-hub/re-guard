import { ZodSchema } from "zod/lib/types";

export type ValidationWrapper = (value: any) => any;
export type SupportedInput = RegExp | ValidationWrapper | ZodSchema;
export type Input = SupportedInput | SupportedInput[];

export type BrandedFunction = {
  (): ValidationWrapper;
  ___name: string;
  ___type: any;
};

export type CreateBrandedFunction<Name extends string, Brand> = {
  (): ValidationWrapper;
  ___name: Name;
  ___type: Brand | undefined;
};

export type GetBrand<BF extends BrandedFunction> = Exclude<
  BF["___type"],
  undefined
>;
