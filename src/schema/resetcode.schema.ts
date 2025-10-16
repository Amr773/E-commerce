import * as z from "zod";

export const resetSchema = z.object({
  resetCode: z.string().nonempty("Please Enter Reset Code"),
});

export type resetSchemaType = z.infer<typeof resetSchema>;
