import type { ZodSchema } from "zod"

export const isRegex = (v: unknown): v is RegExp => v instanceof RegExp

export const isZodSchema = (v: unknown): v is ZodSchema =>
  typeof v === "object" && v !== null && "safeParse" in v && "parse" in v
