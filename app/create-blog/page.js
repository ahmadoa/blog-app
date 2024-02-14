"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup
  .object({
    title: yup.string().required("Title is required"),
    content: yup.string().required("Content is required"),
  })
  .required();

export default function CreateBlog() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col p-12 gap-5">
      <h1 className="text-orange-800 font-bold text-2xl">Create Blog</h1>
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
    </div>
  );
}
