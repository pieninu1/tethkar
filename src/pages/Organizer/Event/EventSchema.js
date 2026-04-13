import { z } from "zod"

export const eventSchema = z.object({
  Name: z.string().min(1, "اسم الفعالية مطلوب"),
  StartDateTime: z.string().min(1, "تاريخ البداية مطلوب"),
  EndDateTime: z.string().min(1, "تاريخ النهاية مطلوب"),
  Venue: z.string().min(1, "الموقع مطلوب"),
  Description: z.string().min(1, "الوصف الطويل مطلوب"),

  CityId: z.any().refine((value) => value !== "", {
    message: "المدينة مطلوبة",
  }),

  CategoryId: z.any().refine((value) => value !== "", {
    message: "الفئة مطلوبة",
  }),

  CardImageUrl: z.string().min(1, "صورة الكارد مطلوبة"),
  DetailsImageUrl1: z.string().min(1, "الصورة الأولى للتفاصيل مطلوبة"),
  DetailsImageUrl2: z.string().min(1, "الصورة الثانية للتفاصيل مطلوبة"),

  Id: z.number().nullable().optional(),
})