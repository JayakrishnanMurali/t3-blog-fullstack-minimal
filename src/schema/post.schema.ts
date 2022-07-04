import z from "zod";

export const createPostShema = z.object({
  title: z.string().max(256, "Max title length is 256 charecters!"),
  body: z.string().min(10),
});

export type CreatePostInput = z.TypeOf<typeof createPostShema>;

export const getSinglePostSchema = z.object({
  postId: z.string().uuid(),
});
