import * as z from "zod";

export const addressSchema = z.object({
  name: z
    .string()
    .nonempty("Name is Required")
    .min(2, "Name Minumum Length is 2")
    .max(10, "Name Maxmium Length is 10"),
  details: z.string().nonempty("Email is Required"),
  phone: z.string().regex(/^01[0251][0-9]{8}$/),
  city: z.string().nonempty("City is Required"),
});

export type addressSchemaType = z.infer<typeof addressSchema>;
