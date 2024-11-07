import React from "react";

// Define the type for post props
type PostProps = {
  title: string;
  body: string | null;
  community: string;
};

const Post: React.FC<PostProps> = ({ title, body, community }) => {
  return (
    <div className="post-item p-4 border rounded shadow-sm">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-gray-700">{body}</p>
      <p className="text-sm text-blue-500">Community: {community}</p>
    </div>
  );
};

export default Post;
