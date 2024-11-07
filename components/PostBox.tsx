"use client";

import { createPost } from "@/lib/actions";
import { useForm, SubmitHandler } from "react-hook-form";

interface PostFormData {
  title: string;
  body: string;
  community: string;
}

function PostBox() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormData>();

  const onSubmit: SubmitHandler<PostFormData> = async (data) => {
    await createPost(data);
    console.log(data); // Handle form submission logic here
  };

  return (
    <div className="post-item p-4 border border-gray-700 bg-gray-800 rounded-lg shadow-md mt-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Title Input */}
        <div className="flex flex-col space-y-1 mb-4">
          <label className="text-gray-200 font-semibold">Title</label>
          <input
            {...register("title", { required: "Title is required" })}
            className="p-2 bg-gray-700 text-gray-200 rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter a descriptive title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* Body Input */}
        <div className="flex flex-col space-y-1 mb-4">
          <label className="text-gray-200 font-semibold">Body</label>
          <textarea
            {...register("body", { required: "Body is required" })}
            className="p-2 bg-gray-700 text-gray-200 rounded placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Share more details here"
            rows={4}
          />
          {errors.body && (
            <p className="text-red-500 text-sm">{errors.body.message}</p>
          )}
        </div>

        {/* Community Input */}
        <div className="flex flex-col space-y-1 mb-4">
          <label className="text-gray-200 font-semibold">Community</label>
          <input
            {...register("community", { required: "Community is required" })}
            className="p-2 bg-gray-700 text-gray-200 rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter the community name"
          />
          {errors.community && (
            <p className="text-red-500 text-sm">{errors.community.message}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-4">
          <button
            type="button"
            className="px-4 py-2 bg-blue-600 text-gray-200 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Upload Image
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-gray-200 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Create Post
          </button>
        </div>
      </form>
    </div>
  );
}

export default PostBox;
