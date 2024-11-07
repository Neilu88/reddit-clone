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
    <div className="sticky p-4 mt-4 bg-gray-800 max-w-5xl mx-auto rounded-xl border border-gray-700 shadow-lg">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center space-x-2 mb-4">
          <p className="text-white font-semibold">Title</p>
          <input
            {...register("title", { required: "Title is required" })}
            className="flex-1 p-2 bg-gray-700 text-white rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter title"
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div className="flex items-center space-x-2 mb-4">
          <p className="text-white font-semibold">Body</p>
          <input
            {...register("body", { required: "Body is required" })}
            className="flex-1 p-2 bg-gray-700 text-white rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter body"
          />
          {errors.body && <p className="text-red-500">{errors.body.message}</p>}
        </div>

        <div className="flex items-center space-x-2 mb-4">
          <p className="text-white font-semibold">Community</p>
          <input
            {...register("community", { required: "Community is required" })}
            className="flex-1 p-2 bg-gray-700 text-white rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter community"
          />
          {errors.community && (
            <p className="text-red-500">{errors.community.message}</p>
          )}
        </div>

        <div className="flex justify-between mt-4">
          <button
            type="button"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Upload Image
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Create Post
          </button>
        </div>
      </form>
    </div>
  );
}

export default PostBox;
