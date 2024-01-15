import * as z from "zod";

export const LoginSchema = z.object({
  email: z
    .string({
      invalid_type_error: "Enter a valid email address",
    })
    .email({
      message: "Email is Required",
    }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});
