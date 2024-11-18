"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowBigUp, ArrowBigDown } from "lucide-react";
import { cn } from "@/lib/utils";

type PostProps = {
  title: string;
  body: string;
  community: string;
  imageUrl: string | null;
};

const Post: React.FC<PostProps> = ({ title, body, community, imageUrl }) => {
  const [votes, setVotes] = useState(0);
  const [userVote, setUserVote] = useState<"up" | "down" | null>(null);

  const handleVote = (voteType: "up" | "down") => {
    if (userVote === voteType) {
      // Remove vote
      setVotes(votes + (voteType === "up" ? -1 : 1));
      setUserVote(null);
    } else {
      // Add/change vote
      setVotes(
        votes +
          (voteType === "up"
            ? userVote === "down"
              ? 2
              : 1
            : userVote === "up"
            ? -2
            : -1)
      );
      setUserVote(voteType);
    }
  };

  return (
    <div className="flex gap-2 bg-gray-800 text-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
      {/* Voting Section */}
      <div className="flex flex-col items-center px-2 py-4 bg-gray-900 rounded-l-lg">
        <button
          onClick={() => handleVote("up")}
          className={cn(
            "p-1 rounded hover:bg-gray-700 transition-colors",
            userVote === "up" && "text-orange-500"
          )}
          aria-label="Upvote"
        >
          <ArrowBigUp className="w-6 h-6" />
        </button>

        <span
          className={cn(
            "font-medium my-1 text-sm",
            userVote === "up" && "text-orange-500",
            userVote === "down" && "text-blue-500"
          )}
        >
          {votes}
        </span>

        <button
          onClick={() => handleVote("down")}
          className={cn(
            "p-1 rounded hover:bg-gray-700 transition-colors",
            userVote === "down" && "text-blue-500"
          )}
          aria-label="Downvote"
        >
          <ArrowBigDown className="w-6 h-6" />
        </button>
      </div>

      {/* Content Section */}
      <div className="flex-1 p-4">
        <h2 className="text-2xl font-semibold text-gray-100 mb-3">{title}</h2>

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

        <p className="text-gray-300 mb-4">{body}</p>

        <p className="text-sm text-blue-400">
          Community: <span className="font-medium">{community}</span>
        </p>
      </div>
    </div>
  );
};

export default Post;
