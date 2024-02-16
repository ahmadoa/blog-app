"use server";
import { prisma } from "@/lib/prisma";

// Add a new post action
export async function addPost(data) {
  const newPost = await prisma.post.create({ data });
  console.log("New post created:", newPost);
}

// Fetch all posts action
export async function getAllPosts() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { props: { posts }, revalidate: 30 };
  } catch (error) {
    console.error("erroc fetching posts:", error);
    return null;
  }
}

// Fetch a single post action
export async function getPostById(id) {
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
  });
  return { props: { post }, revalidate: 60 };
}

// Delete a post action
export async function deletePost(id) {
  const deletedPost = await prisma.post.delete({
    where: {
      id,
    },
  });
  console.log("Post deleted:", deletedPost);
}
