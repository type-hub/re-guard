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

function safeValidate(input: SupportedInput, value: any): boolean {
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
  <Type>() =>
  <Name extends string>(
    input: Input,
    name: Name
  ): CreateBrandedFunction<Name, Type> => {
    const brandedFunction = function () {
      if (Array.isArray(input)) {
        return function multiValidation(value: any): boolean {
          return input.every((i) => safeValidate(i, value));
        };
      }

      return function singleValidation(value: any): boolean {
        return safeValidate(input, value);
      };
    };

    brandedFunction.___name = name;
    let brand: Type | undefined;
    brandedFunction.___type = brand;

    return brandedFunction;
  };
