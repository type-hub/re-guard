import { CreateBrandedFunction, Input, SupportedInput } from "../types";
import { isRegex, isZodSchema } from "../utils";

function tryCatch(
  validator: (value: any) => boolean,
  valueToTest: any
): boolean {
  let result: boolean = false;

  try {
    result = validator(valueToTest);
  } catch (error) {
    result = false;
  }

  return result;
}

function validate(input: SupportedInput, value: string): boolean {
  if (isRegex(input)) {
    // @ts-ignore
    return tryCatch((v: any) => input.test(v), value);
  } else if (isZodSchema(input)) {
    return tryCatch((v: any) => {
      input.parse(v);
      return true;
    }, value);
  } else {
    return tryCatch((v: any) => Boolean(input(v)), value);
  }
}

export const createBrandedFunction =
  <Brand>() =>
  <Name extends string>(
    input: Input,
    name: Name
  ): CreateBrandedFunction<Name, Brand> => {
    const brandedRegex = function () {
      if (Array.isArray(input)) {
        return function multiValidation(value: string): boolean {
          return input.every((i) => validate(i, value));
        };
      }

      return function singleValidation(value: string): boolean {
        return validate(input, value);
      };
    };

    brandedRegex.name = name;
    let brand: Brand | undefined;
    brandedRegex.brand = brand;

    return brandedRegex;
  };
