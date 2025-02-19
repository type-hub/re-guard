import { ZodSchema } from "zod/lib/types"

export function isRegex(value: unknown): value is RegExp {
  return value instanceof RegExp
}

export function isZodSchema(value: unknown): value is ZodSchema {
  return (
    typeof value === "object" &&
    value !== null &&
    "safeParse" in value &&
    "parse" in value
  )
}
