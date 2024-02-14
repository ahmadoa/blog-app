import Link from "next/link";
import { IoAdd } from "react-icons/io5";

export default function Home() {
  return (
    <main className="flex h-screen w-full flex-col p-10">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-orange-800 font-bold text-2xl">Nebula Blogs</h1>
        <Link
          href={"/create-blog"}
          className="flex flex-row gap-1 items-center border p-2 rounded-md hover:bg-gray-200 transition-all"
        >
          <IoAdd className="text-orange-800" size={25} />
          <span className="font-semibold">Create new post</span>
        </Link>
      </div>
    </main>
  );
}
