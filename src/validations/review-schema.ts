import * as zod from "zod";

export const reviewSchema = zod.object({
  rating: zod
    .number()
    .min(1)
    .max(5)
    .refine((val) => Number.isInteger(val), {
      message: "Rating must be an integer",
    }),
  content: zod.string().min(1, "Content cannot be empty"),
});
