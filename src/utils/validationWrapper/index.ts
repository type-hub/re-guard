import { Input } from "../../types"
import { isRegex, isZodSchema } from "../guards"

export const safeValidate = (input: Input, value: any): boolean => {
  let validator: (value: any) => boolean

  if (isRegex(input)) {
    // @ts-ignore
    validator = (v: any) => input.test(v)
  } else if (isZodSchema(input)) {
    validator = (v: any) => {
      input.parse(v)
      return true
    }
  } else {
    validator = (v: any) => !!input(v)
  }

  try {
    return validator(value)
  } catch (e) {
    return false
  }
}
