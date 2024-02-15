import SinglePost from "@/components/singlePost";

export default function page({ searchParams }) {
  return (
    <section className="p-7">
      <SinglePost postId={searchParams.id} />
    </section>
  );
}
