import { resolve } from "path";
import { createPostShema, getSinglePostSchema } from "../../schema/post.schema";
import { createRouter } from "../createRouter";

import * as trpc from "@trpc/server";

export const postRouter = createRouter()
  .mutation("create-post", {
    input: createPostShema,
    async resolve({ ctx, input }) {
      if (!ctx.user)
        new trpc.TRPCError({
          code: "FORBIDDEN",
          message: "Please login to create post",
        });

      const post = await ctx.prisma.post.create({
        data: {
          ...input,
          user: {
            connect: {
              id: ctx?.user?.id,
            },
          },
        },
      });

      return post;
    },
  })
  .query("posts", {
    resolve({ ctx }) {
      return ctx.prisma.post.findMany();
    },
  })
  .query("single-post", {
    input: getSinglePostSchema,
    async resolve({ ctx, input }) {
      return ctx.prisma.post.findUnique({
        where: {
          id: input.postId,
        },
      });
    },
  });
