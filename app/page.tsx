import PostBox from "@/components/PostBox";
import Posts from "@/components/Posts";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <div className="max-w-5xl mx-auto">
        <PostBox />
        <Posts />
      </div>
    </div>
  );
}
