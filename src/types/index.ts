import { ZodSchema } from "zod"

export * from "./algo"

type UnaryFunc = (value: any) => any
export type Input = RegExp | UnaryFunc | ZodSchema
