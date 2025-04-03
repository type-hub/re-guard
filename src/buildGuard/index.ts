import { Input } from "../types"
import { safeValidate } from "../utils/validationWrapper"

// TODO: any vs expected wide type
export type MakeGuard<Type> = (value: any) => value is Type

export const makeGuard =
  <I extends Input, Type>(input: I): MakeGuard<Type> =>
  (value: any): value is Type =>
    safeValidate(input, value)
