"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addPost } from "@/prisma/posts";
import { toast } from "sonner";

const schema = yup
  .object({
    title: yup.string().required("Title is required"),
    content: yup.string().required("Content is required"),
  })
  .required();

export default function CreationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await addPost(data);
      reset();
      toast("Blog posted successfully");
    } catch (error) {
      console.error(error);
      toast("Error posting blog", "error");
    }
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid w-full gap-1.5">
        <Label htmlFor="title">Title</Label>
        <Input
          {...register("title")}
          id="title"
          type="text"
          placeholder="Title"
          s
          className="w-1/3"
        />
        <p className="text-sm text-red-500">{errors.title?.message}</p>
      </div>

      <div className="grid w-full gap-1.5">
        <Label htmlFor="content">Content</Label>
        <Textarea
          {...register("content")}
          placeholder="Type your blog content here"
          id="content"
          className="w-2/3"
        />
        <p className="text-sm text-red-500">{errors.content?.message}</p>
      </div>
      <Button type="submit" className="w-fit">
        Publish
      </Button>
    </form>
  );
}
