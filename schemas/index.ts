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

export const RegisterSchema = z.object({
  email: z
    .string({
      invalid_type_error: "Enter a valid email address",
    })
    .email({
      message: "Email is Required",
    }),
  password: z.string().min(4, {
    message: "Password is required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),

  phone: z.string().regex(/^[0-9]{10}$/, {
    message: "Phone number is required",
  }),
});

export const ForgotPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of 6 characters required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});
