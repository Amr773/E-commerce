import * as z from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .nonempty("Name is Required")
      .min(2, "Name Minumum Length is 2")
      .max(10, "Name Maxmium Length is 10"),
    email: z.email().nonempty("Email is Required"),
    password: z
      .string()
      .nonempty("Password is Required")
      .min(6, "Password Minumum Length is 6"),
    rePassword: z.string().nonempty("Please Re-enter Your Password"),
    phone: z.string().regex(/^01[0251][0-9]{8}$/),
  })
  .refine((object) => object.password === object.rePassword, {
    path: [`rePassword`],
    error: "Passwords don't match",
  });


export type registerSchemaType = z.infer<typeof registerSchema>