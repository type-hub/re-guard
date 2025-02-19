import { ZodSchema } from "zod/lib/types"
import { BuildAssertion, buildAssertion } from "../buildAssertion"
import { BuildGuard, buildGuard } from "../buildGuard"
import { createBrandedFunction } from "../createBrandedFunction"
import { CreateBrandedFunction, SupportedInput } from "../types"
import { isRegex, isZodSchema } from "../utils"

type ResolveInput<Input extends SupportedInput> = Input extends RegExp
  ? { regex: Input }
  : Input extends ZodSchema
  ? { schema: Input }
  : { function: Input }

const addInput = <Input extends SupportedInput>(
  input: Input
): ResolveInput<Input> => {
  if (isRegex(input)) {
    return { regex: input } as ResolveInput<Input>
  } else if (isZodSchema(input)) {
    return { schema: input } as ResolveInput<Input>
  } else {
    return { function: input } as ResolveInput<Input>
  }
}

// TODO: convention: do we need abstract types for every FUNC?
export type CreateReGuard<
  Name extends string,
  Input extends SupportedInput,
  Type
> = ResolveInput<Input> & {
  // TODO: refactor - move CBF upstream
  guard: BuildGuard<CreateBrandedFunction<Name, Type>>
  assert: BuildAssertion<CreateBrandedFunction<Name, Type>>
}

// TODO: types are not complete
export const reGuard = <Name extends string, Input extends SupportedInput>(
  name: Name,
  input: Input
) => ({
  type: <Type>() => {
    return {
      // TODO: pretty
      build: function (): CreateReGuard<Name, Input, Type> {
        const bf = createBrandedFunction<Type>()(input, name)

        return {
          guard: buildGuard(bf),
          assert: buildAssertion(bf),
          ...addInput(input),
        }
      },
    }
  },
})
