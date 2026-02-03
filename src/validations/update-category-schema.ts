import * as z from "zod";

export const updateCategorySchema = z.object({
  name: z.string().min(2, "Category name must be at least 2 characters long"),
  isActive: z.boolean(),
});
