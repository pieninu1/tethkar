import { z } from "zod"

export const eventSchema = z.object({
  eventName: z.string({ required_error: "اسم الفعالية مطلوب" }).min(1, "اسم الفعالية مطلوب"),
  startDateTime: z.string({ required_error: "تاريخ البداية مطلوب" }).min(1, "تاريخ البداية مطلوب"),
  endDateTime: z.string({ required_error: "تاريخ النهاية مطلوب" }).min(1, "تاريخ النهاية مطلوب"),
  venue: z.string({ required_error: "الموقع مطلوب" }).min(1, "الموقع مطلوب"),
  description: z.string({ required_error: "الوصف مطلوب" }).min(1, "الوصف مطلوب"),
  cityId: z.number({ required_error: "اختر المدينة" }).min(1, "اختر المدينة"),
  eventId: z.number().optional(),
  //adding the categoryId 
})