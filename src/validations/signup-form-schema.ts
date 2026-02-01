import { ROLE } from "@/types";
import * as zod from "zod";

export const signupFormSchema = zod.object({
  name: zod.string().min(1, "Name is required"),
  email: zod
    .string()
    .min(1, "Email is required")
    .email("Invalid email address"),
  role: zod.enum(Object.values(ROLE) as [string, ...string[]], {
    message: "Please select a role",
  }),
  password: zod.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: zod.string().min(1, "Please confirm your password"),
});
