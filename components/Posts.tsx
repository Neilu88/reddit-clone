import React from "react";
import Post from "./Post";
import { fetchPosts } from "@/lib/data";

const postsData = await fetchPosts();

// Posts component to render the list of posts
const Posts = () => {
  return (
    <div className="posts-container p-4">
      <h1 className="text-2xl font-bold mb-4">Posts</h1>
      <div className="space-y-4">
        {postsData.map((post) => (
          <Post
            key={post.id}
            title={post.title}
            body={post.body}
            imageUrl={post.imageUrl}
            community={post.community.name}
          />
        ))}
      </div>
    </div>
  );
};

export default Posts;
