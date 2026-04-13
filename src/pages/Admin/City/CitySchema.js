import { z } from "zod"

export const citySchema = z.object({
  Name: z
    .string()
    .min(1, "اسم المدينة مطلوب")
    .min(2, "اسم المدينة يجب أن يكون حرفين على الأقل"),

  ImageUrl: z
  .string()
  .url("أدخل رابط صورة صحيح")
  .optional()
  .or(z.literal("")),

  Id: z
    .number()
    .nullable()
    .optional(),
})