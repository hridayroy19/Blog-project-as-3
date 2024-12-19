import { z } from "zod";


const blogValidationByZod = z.object({

    title:z.string({ required_error:"Title is required"}),
    content:z.string({required_error:"Content is required"}),
    author: z
    .string({
      required_error: "Author is required",
    })
    .regex(/^[a-fA-F0-9]{24}$/, "Author must be a valid ObjectId"),
    isPublished:z.boolean().optional().default(true)
    
})

export  const blogValidation = {
    blogValidationByZod
}