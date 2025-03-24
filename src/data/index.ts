import { z } from "zod"

export const hashTag = /^#\w+$/ // #money
export const mention = /^@\w+$/ // @john_doe

export const inputFuncs = {
  hashTag: hashTag,
  mention: mention,
  zod: z.boolean(),
  zodBranded: z.boolean().brand("BRANDED"),
  custom: (x: any) => (Math.random() > 0.5 ? true : false),
} as const

type x = NonNullable<(typeof inputFuncs)["zod"]["~standard"]["types"]>["output"]

export type inputTypes = {
  hashTag: `#${string}`
  mention: `@${string}`
  // TODO: use infer inside collect
  zod: z.infer<typeof inputFuncs.zod>
  zodBranded: z.infer<typeof inputFuncs.zodBranded>

  custom: `${boolean}`
}
