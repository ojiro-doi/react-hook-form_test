import { z } from "zod";

export const validationSchema = z.object({
  name: z.string().nonempty("名前は必須").min(4, "4文字以上で入力"),
});
