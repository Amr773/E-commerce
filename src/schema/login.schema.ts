import * as z from "zod";

export const loginSchema = z.object({
  email: z.email().nonempty("Email is Required"),
  password: z
    .string()
    .nonempty("Password is Required")
    .min(6, "Password Minumum Length is 6"),
});

export type loginSchemaType = z.infer<typeof loginSchema>;
