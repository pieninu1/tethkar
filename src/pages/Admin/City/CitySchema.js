import { z } from "zod";

export const citySchema = z.object({
  Name: z.string().min(1, "اسم المدينة مطلوب"),
});