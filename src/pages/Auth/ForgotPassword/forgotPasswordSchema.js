import { z } from "zod"

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "البريد الإلكتروني مطلوب")
    .email("أدخل بريد إلكتروني صحيح"),
})