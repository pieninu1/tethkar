import { z } from "zod"

export const ticketTypeSchema = z.object({
  typeName: z
    .string({ required_error: "نوع التذكرة مطلوب" })
    .min(1, "نوع التذكرة مطلوب"),

  price: z
    .number({ required_error: "السعر مطلوب" })
    .min(1, "السعر يجب أن يكون أكبر من 0"),

  quantity: z
    .number({ required_error: "الكمية مطلوبة" })
    .min(1, "الكمية يجب أن تكون أكبر من 0"),

  // ✅ FIXED HERE
  eventId: z
    .number({ required_error: "اختر الفعالية" })
    .min(1, "اختر الفعالية"),

  // optional for edit
  ticketTypeId: z.number().optional(),
})