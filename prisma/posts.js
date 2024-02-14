"use server";
import { prisma } from "@/lib/prisma";

export async function addPost(data) {
  const newPost = await prisma.post.create({ data });
  console.log("New post created:", newPost);
}

export async function getAllPosts() {
  const posts = await prisma.post.findMany();
  return posts;
}

export async function getPostById(id) {
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
  });
  return post;
}

export async function deletePost(id) {
  const deletedPost = await prisma.post.delete({
    where: {
      id,
    },
  });
  console.log("Post deleted:", deletedPost);
}
