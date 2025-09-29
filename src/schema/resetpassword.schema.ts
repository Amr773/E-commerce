import * as z from "zod";

export const resetPasswordSchema = z.object({
  email: z.email().nonempty("Email is Required"),
  newPassword: z
    .string()
    .nonempty("Password is Required")
    .min(6, "Password Minumum Length is 6"),
});

export type resetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;
