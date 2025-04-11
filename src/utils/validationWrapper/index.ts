import { Input } from "../../types"
import { isRegex, isZodSchema } from "../guards"

export const safeValidate = <Type>(input: Input, value: any): value is Type => {
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
