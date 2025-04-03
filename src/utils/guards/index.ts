import type { ZodSchema } from "zod"

export const isRegex = (value: unknown): value is RegExp =>
  value instanceof RegExp

export const isZodSchema = (value: unknown): value is ZodSchema =>
  typeof value === "object" &&
  value !== null &&
  "safeParse" in value &&
  "parse" in value
