import * as z from "zod";

export const updateUserSchema = z.object({
  name: z
    .string()
    .nonempty("Name is Required")
    .min(2, "Name Minumum Length is 2")
    .max(10, "Name Maxmium Length is 10"),
  email: z.email().nonempty("Email is Required"),
  phone: z.string().regex(/^01[0251][0-9]{8}$/),
});

export type updateUserSchemaType = z.infer<typeof updateUserSchema>;
