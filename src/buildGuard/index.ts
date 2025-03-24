import { SupportedInput } from "../types"
import { validationWrapper } from "../utils/validationWrapper"

// TODO: any vs expected wide type
export type BuildGuard<Type> = (value: any) => value is Type

export const buildGuard = <Type, Input extends SupportedInput>(
  input: Input
): BuildGuard<Type> => {
  function guard(value: any): value is Type {
    const validator = validationWrapper(input)
    return validator(value)
  }

  return guard
}
