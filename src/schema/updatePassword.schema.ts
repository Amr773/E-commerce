import * as z from "zod";

export const updatePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .nonempty("Password is Required")
      .min(6, "Password Minumum Length is 6"),
    password: z
      .string()
      .nonempty("Password is Required")
      .min(6, "Password Minumum Length is 6"),
    rePassword: z.string().nonempty("Please Re-enter Your Password"),
  })
  .refine((object) => object.password === object.rePassword, {
    path: [`rePassword`],
    error: "Passwords don't match",
  });

export type updatePasswordSchemaType = z.infer<typeof updatePasswordSchema>;
