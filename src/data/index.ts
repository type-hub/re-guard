import { z } from "zod"

export const hashTag = /^#\w+$/ // #money
export const mention = /^@\w+$/ // @john_doe

export const regexes = {
  hashTag: hashTag,
  mention: mention,
  zod: z.boolean(),
  // TODO: broken
  zodBranded: z.boolean().brand("BRANDED"),

  custom: (x: any) => (Math.random() > 0.5 ? true : false),
} as const

const x = z.boolean().brand("zod").parse(true)

export type RegexesTypes = {
  hashTag: `#${string}`
  mention: `@${string}`
  // TODO: use infer inside collect
  zod: z.infer<typeof regexes.zod>
  zodBranded: z.infer<typeof regexes.zodBranded>

  custom: `${boolean}`
}
