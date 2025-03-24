import { SupportedInput } from "../types"
import { validationWrapper } from "../utils/validationWrapper"

export type BuildAssertion<Type> = (value: any) => asserts value is Type

export function buildAssertion<Type, Input extends SupportedInput>(
  input: Input,
  key: string
): BuildAssertion<Type> {
  function assert(value: any): asserts value is Type {
    const validator = validationWrapper(input)

    if (!validator(value)) {
      throw new Error(`re-guard: ${key} assertion failed with value: ${value}`)
    }
  }

  return assert
}
