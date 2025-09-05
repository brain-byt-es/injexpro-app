import { z } from "zod";

export const complicationTableSchema = z.object({
  id: z.string(),
  name: z.string(),
  signs: z.array(z.string()).default([]), // mapped from DB signs_symptoms[]
});
export type ComplicationTableRow = z.infer<typeof complicationTableSchema>;
