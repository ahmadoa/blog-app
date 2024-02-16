"use client";
import { deletePost, getAllPosts } from "@/prisma/posts";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoMdTrash } from "react-icons/io";
import { toast } from "sonner";

export default function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all posts
  const getPosts = async () => {
    try {
      const data = await getAllPosts();
      setPosts(data.props.posts);
    } catch (error) {
      setError("Error fetching posts");
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
      setPosts(posts.filter((post) => post.id !== id));
      toast.success("Post deleted succesfully!");
    } catch (error) {
      console.log("Error deleting post:", error.message);
    }
  };

  // create excerpt for blog content
  function createExcerpt(content, maxLength = 15) {
    const words = content.split(" ");
    const excerpt = words.slice(0, maxLength).join(" ");
    return excerpt + (words.length > maxLength ? "..." : "");
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="flex h-screen w-full flex-col p-10">
      <h1 className="text-amber-950 font-bold text-2xl">All Posts</h1>
      {loading ? (
        <p>Loading...</p>
      ) : !loading && !posts.length ? (
        <p>No posts found</p>
      ) : null}
      {error && <p>Error: {error}</p>}
      <div className="flex flex-col gap-5 mt-5">
        {posts.map((post) => {
          return (
            <div
              key={post.id}
              className="flex flex-col p-2 bg-gray-100 rounded-md gap-2 lg:w-2/4 w-full transition hover:bg-gray-200 relative"
            >
              <h1 className="text-amber-950 font-bold text-lg first-letter:uppercase">
                {post.title}
              </h1>
              <p>{createExcerpt(post.content, 15)}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-sm text-amber-900">
                  <span>Posted</span>
                  <span>
                    {new Date(post.createdAt).toLocaleTimeString([], {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <Link
                  href={{ pathname: `/${post.title}`, query: { id: post.id } }}
                  className="text-amber-900 font-semibold px-2"
                >
                  Read more
                </Link>
              </div>

              <button
                className="p-2 absolute top-2 right-2 transition-all hover:scale-110"
                onClick={() => PostDeletion(post.id)}
              >
                <IoMdTrash size={25} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
