import { z } from "zod"

const hashTag = /^#\w+$/ // #money
const mention = /^@\w+$/ // @john_doe

export const inputFuncs = {
  // regex
  hashTag,
  mention,

  // other
  custom: (x: any) => (Math.random() > 0.5 ? true : false),

  // zod
  zod: z.string(),
  zodBranded: z.boolean().brand("BRANDED"),
} as const

export type inputTypes = {
  hashTag: `#${string}`
  mention: `@${string}`
  custom: `${boolean}`

  // INFO: use infer inside collect
  // zod: z.infer<typeof inputFuncs.zod>
  // zodBranded: z.infer<typeof inputFuncs.zodBranded>
}
