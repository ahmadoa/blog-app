import PostForm from "@/components/PostForm";

export default function CreateBlog() {
  return (
    <div className="flex flex-col p-12 gap-5">
      <h1 className="text-orange-800 font-bold text-2xl">Create Blog</h1>
      <PostForm />
    </div>
  );
}
