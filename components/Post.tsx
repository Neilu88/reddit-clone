import React from "react";
import Image from "next/image";

// Define the type for post props
type PostProps = {
  title: string;
  body: string;
  community: string;
  imageUrl: string | null;
};

const Post: React.FC<PostProps> = ({ title, body, community, imageUrl }) => {
  return (
    <div className="post-item p-6 bg-gray-800 text-white border border-gray-700 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
      {/* Title */}
      <h2 className="text-2xl font-semibold text-gray-100 mb-3">{title}</h2>

      {/* Image */}
      {imageUrl && (
        <div className="relative w-full h-64 mb-4">
          <Image
            src={imageUrl}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      )}

      {/* Body */}
      <p className="text-gray-300 mb-4">{body}</p>

      {/* Community */}
      <p className="text-sm text-blue-400">
        Community: <span className="font-medium">{community}</span>
      </p>
    </div>
  );
};

export default Post;
