import { CreateBrandedRegex, RegexFactory } from "../types";

export const createBrandedFunction =
  <Brand>() =>
  <Name extends string>(
    regexFactory: RegexFactory,
    name: Name
  ): CreateBrandedRegex<Name, Brand> => {
    const brandedRegex = function () {
      return regexFactory();
    };

    brandedRegex.name = name;
    let brand: Brand | undefined;
    brandedRegex.brand = brand;

    return brandedRegex;
  };
