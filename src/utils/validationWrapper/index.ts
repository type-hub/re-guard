import { Input, SupportedInput } from "../../types"
import { isRegex, isZodSchema } from "../guards"
import { validatorTryCatch } from "../validatorTryCatch"

function safeValidate(input: SupportedInput, value: any): boolean {
  if (isRegex(input)) {
    // @ts-ignore
    return validatorTryCatch((v: any) => input.test(v), value)
  } else if (isZodSchema(input)) {
    return validatorTryCatch((v: any) => {
      input.parse(v)
      return true
    }, value)
  } else {
    return validatorTryCatch((v: any) => Boolean(input(v)), value)
  }
}

export const validationWrapper = (input: Input) => {
  // TODO: array support?
  if (Array.isArray(input)) {
    return function multiValidation(value: any): boolean {
      return input.every((i) => safeValidate(i, value))
    }
  }

  // TODO: dead code?
  return function singleValidation(value: any): boolean {
    return safeValidate(input, value)
  }
}
