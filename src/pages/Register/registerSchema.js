import { z } from "zod"

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/

export const registerSchema = z
  .object({
    firstName: z.string().min(1, "الاسم الأول مطلوب"),
    lastName: z.string().min(1, "الاسم الأخير مطلوب"),
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
    confirmPassword: z.string().min(1, "تأكيد كلمة المرور مطلوب"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "كلمتا المرور غير متطابقتين",
    path: ["confirmPassword"],
  })