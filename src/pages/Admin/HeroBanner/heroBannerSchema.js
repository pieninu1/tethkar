import { z } from "zod"

export const heroBannerSchema = z.object({
  Title: z
    .string()
    .trim()
    .min(1, "عنوان البنر مطلوب")
    .min(2, "عنوان البنر يجب أن يكون حرفين على الأقل"),

  Subtitle: z
    .string()
    .trim()
    .min(1, "وصف البنر مطلوب")
    .min(2, "وصف البنر يجب أن يكون حرفين على الأقل"),

  ImageUrl: z
    .string()
    .trim()
    .url("أدخل رابط صورة صحيح")
    .optional()
    .or(z.literal("")),

  ButtonText: z
    .string()
    .trim()
    .min(1, "نص الزر مطلوب")
    .min(2, "نص الزر يجب أن يكون حرفين على الأقل"),

  ButtonLink: z
    .string()
    .trim()
    .optional()
    .or(z.literal("")),

  DisplayOrder: z.coerce
    .number({
      invalid_type_error: "أدخل ترتيب ظهور صحيح",
    })
    .min(0, "ترتيب الظهور يجب أن يكون صفر أو أكثر"),

  IsActive: z.boolean().default(true),

  Id: z.number().nullable().optional(),
})