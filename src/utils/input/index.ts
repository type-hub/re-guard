import { ZodSchema } from "zod"
import { isRegex, isZodSchema } from ".."
import { Input } from "../../types"

export type ResolveInputName<
  Name extends string,
  I extends Input
> = I extends RegExp
  ? `${Name}Regex`
  : I extends ZodSchema
  ? `${Name}Schema`
  : `${Name}Function`

export const resolveInputName = <Name extends string, I extends Input>(
  name: Name,
  input: I
): ResolveInputName<Name, I> =>
  isRegex(input)
    ? (`${name}Regex` as ResolveInputName<Name, I>)
    : isZodSchema(input)
    ? (`${name}Schema` as ResolveInputName<Name, I>)
    : (`${name}Function` as ResolveInputName<Name, I>)

export type ResolveInputToType<I extends Input> = I extends RegExp
  ? //
    I
  : I extends ZodSchema
  ? I
  : I
