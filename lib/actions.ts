"use server";

import prisma from "@/lib/prisma";
import { getUserId } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { CreatePost, UpvoteSchema } from "./schemas";
import { z } from "zod";

export async function createPost(values: z.infer<typeof CreatePost>) {
  const userId = await getUserId();

  const { body, title, community, imageUrl } = values;
  const validatedFields = CreatePost.safeParse(values);
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Post.",
    };
  }
  let communityRecord = null;
  try {
    // Check if the community exists
    communityRecord = await prisma.community.findUnique({
      where: { name: community },
    });

    // If the community doesn't exist, create it
    if (!communityRecord) {
      communityRecord = await prisma.community.create({
        data: {
          name: community,
        },
      });
    }

    // Create the post
    await prisma.post.create({
      data: {
        body,
        title,
        community: {
          connect: {
            id: communityRecord.id,
          },
        },
        imageUrl,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Post",
    };
  }
  revalidatePath("/");
  redirect("/");
}

export async function upvotePost(value: FormDataEntryValue | null) {
  const userId = await getUserId();

  const validatedFields = UpvoteSchema.safeParse({ postId: value });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Upvote Post.",
    };
  }

  const { postId } = validatedFields.data;

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!post) {
    throw new Error("Post not found");
  }

  const like = await prisma.upvote.findUnique({
    where: {
      postId_userId: {
        postId,
        userId,
      },
    },
  });

  if (like) {
    try {
      await prisma.upvote.delete({
        where: {
          postId_userId: {
            postId,
            userId,
          },
        },
      });
      revalidatePath("/dashboard");
      return { message: "Unliked Post." };
    } catch (error) {
      return { message: "Database Error: Failed to Unlike Post." };
    }
  }

  try {
    await prisma.upvote.create({
      data: {
        postId,
        userId,
      },
    });
    revalidatePath("/dashboard");
    return { message: "Liked Post." };
  } catch (error) {
    return { message: "Database Error: Failed to upvote Post." };
  }
}
