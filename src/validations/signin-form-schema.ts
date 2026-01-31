import * as zod from "zod";

export const signinFormSchema = zod.object({
  email: zod
    .string()
    .min(1, "Email is required")
    .email("Invalid email address"),
  password: zod.string().min(1, "Password is required"),
});
