import { z } from "zod"

export const categorySchema = z.object({
  Name: z.string().min(1, "اسم التصنيف مطلوب"),
  Id: z.number().optional(),
})