import { ZodSchema } from "zod/lib/types"
import { isRegex, isZodSchema } from ".."
import { SupportedInput } from "../../types"

export type ResolveInputName<
  Name extends string,
  Input extends SupportedInput
> = Input extends RegExp
  ? `${Name}Regex`
  : Input extends ZodSchema
  ? `${Name}Schema`
  : `${Name}Function`

export const resolveInputName = <
  Name extends string,
  Input extends SupportedInput
>(
  name: Name,
  input: Input
): ResolveInputName<Name, Input> => {
  if (isRegex(input)) {
    return `${name}Regex` as ResolveInputName<Name, Input>
  } else if (isZodSchema(input)) {
    return `${name}Schema` as ResolveInputName<Name, Input>
  } else {
    return `${name}Function` as ResolveInputName<Name, Input>
  }
}

export type ResolveInputToType<Input extends SupportedInput> =
  Input extends RegExp
    ? //
      Input
    : Input extends ZodSchema
    ? Input
    : Input
