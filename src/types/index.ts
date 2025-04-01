import { ZodSchema } from "zod/lib/types"

export * from "./algo"

type UnaryFunc = (value: any) => any
export type SupportedInput = RegExp | UnaryFunc | ZodSchema
export type Input = SupportedInput | SupportedInput[]
