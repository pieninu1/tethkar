import { z } from "zod"

export const categorySchema = z.object({
  Name: z
    .string()
    .min(1, "اسم الفئة مطلوب")
    .max(100, "اسم الفئة طويل جدًا"),

  ImageUrl: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val || val.trim() === "") return true // optional
        try {
          new URL(val)
          return true
        } catch {
          return false
        }
      },
      {
        message: "رابط الصورة غير صالح",
      }
    ),
})