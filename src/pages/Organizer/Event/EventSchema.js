import { z } from "zod"

export const eventSchema = z.object({
  Name: z.string().optional(),
  StartDateTime: z.string().optional(),
  EndDateTime: z.string().optional(),
  Venue: z.string().optional(),
  Description: z.string().optional(),
  CityId: z.any().optional(),
  CategoryId: z.any().optional(),
  Image: z.any().optional(),
  Id: z.number().optional(),
})


/*import { z } from "zod"

export const eventSchema = z.object({
  Name: z.string().min(1, "اسم الفعالية مطلوب"),
  StartDateTime: z.string().min(1, "تاريخ البداية مطلوب"),
  EndDateTime: z.string().min(1, "تاريخ النهاية مطلوب"),
  Venue: z.string().min(1, "الموقع مطلوب"),
  Description: z.string().min(1, "الوصف مطلوب"),
  CityId: z.coerce.number().min(1, "اختر المدينة"),
  CategoryId: z.coerce.number().min(1, "اختر التصنيف"),
  Image: z.any().optional(),
  Id: z.number().optional(),
})*/