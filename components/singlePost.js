"use client";
import { useState, useEffect } from "react";
import { getPostById, deletePost } from "@/prisma/posts";
import { IoMdTrash } from "react-icons/io";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

export default function SinglePost({ postId }) {
  const [post, setPost] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch a single post
  const getSinglePost = async (id) => {
    try {
      const data = await getPostById(id);
      setPost(data.props.post);
    } catch (error) {
      setError("Error fetching post");
    } finally {
      setLoading(false);
    }
  };

  const router = useRouter();

  // Delete a post
  const PostDeletion = async (id) => {
    try {
      await deletePost(id);
      console.log("Post deleted");
      router.push("/");
    } catch (error) {
      console.log("Error deleting post:", error.message);
    }
  };

  useEffect(() => {
    getSinglePost(postId);
  }, []);

  // If the post is still loading, display a loading message
  if (loading) {
    return <p>Loading...</p>;
  }

  // If there is an error fetching the post, display the error message
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  // If the post is not found, display a message
  if (!post) {
    return <p>Data not found.</p>;
  }

  return (
    <article key={post.id} className="w-1-2 flex flex-col">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <h1 className="text-amber-950 font-bold text-2xl">{post.title}</h1>
          <span className="text-xs text-amber-900">
            Posted {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex gap-1 items-center text-white p-2 rounded-md bg-amber-900 font-semibold transition-all hover:scale-105">
              <IoMdTrash size={25} />
              Delete Blog
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Article Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this article? This action cannot
                be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <button
                onClick={() => PostDeletion(post.id)}
                className="bg-amber-950 rounded-lg px-3 hover:scale-105 transition py-1 text-white"
              >
                Yes
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <p className="mt-5">{post.content}</p>
    </article>
  );
}
