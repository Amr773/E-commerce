import * as z from "zod";

export const checkoutSchema = z.object({
  details: z.string().nonempty("Please enter your address"),
  phone: z
    .string()
    .nonempty("phone can't be empty")
    .regex(/^01[1250][0-9]{8}$/, "Please enter a valid phone number"),
  city: z.string().nonempty("Please enter your city"),
});

export type checkoutSchemaType = z.infer<typeof checkoutSchema>;
