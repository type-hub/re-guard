import { Input } from "../types"
import { safeValidate } from "../utils/validationWrapper"

export type MakeAssertion<Type> = (value: any) => asserts value is Type

export const makeAssertion =
  <I extends Input, Type>(input: I, key: string): MakeAssertion<Type> =>
  (value: any): asserts value is Type => {
    if (!safeValidate(input, value)) {
      throw new Error(`re-guard: ${key} assertion failed: ${value}`)
    }
  }
