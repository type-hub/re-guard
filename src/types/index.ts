import { ZodSchema } from "zod/lib/types"

type UnaryFunc = (value: any) => any
export type SupportedInput = RegExp | UnaryFunc | ZodSchema
export type Input = SupportedInput | SupportedInput[]
