"use server";

import prisma from "@/lib/prisma";
import { getUserId } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { CreatePost } from "./schemas";
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
