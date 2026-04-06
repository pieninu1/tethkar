import { z } from "zod"

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "البريد الإلكتروني مطلوب")
    .email("أدخل بريداً إلكترونياً صالحاً"),
  password: z
    .string()
    .min(1, "كلمة المرور مطلوبة")
    .regex(
      passwordRegex,
      "كلمة المرور يجب أن تحتوي على عدد من الأحرف الكبيرة والصغيرة والأرقام والرموز"
    ),
  rememberMe: z.boolean().optional(),
})