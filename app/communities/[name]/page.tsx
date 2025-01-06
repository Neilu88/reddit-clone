"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";

const CommunityPage = () => {
  const pathname = usePathname();
  const name = pathname?.split("/")[2]; // Extract the name from the URL path

  if (!name) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-6">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Banner Section */}
        <div className="relative rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black opacity-40"></div>
          <Image
            src="https://via.placeholder.com/1500x400.png?text=Community+Banner"
            alt="Community Banner"
            width={1500}
            height={400}
            className="object-cover w-full h-64"
          />
          <div className="absolute inset-0 flex items-center justify-center text-white text-3xl font-bold">
            <h1>{name} Community</h1>
          </div>
        </div>

        {/* Main Community Content */}
        <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-white">
              {name[0].toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-semibold">{name} Community</h2>
              <p className="text-gray-500">
                Join {name} to discuss, share, and discover content related to{" "}
                {name}.
              </p>
            </div>
          </div>

          {/* Community Stats Section */}
          <div className="flex justify-between text-gray-600">
            <div className="flex items-center space-x-2">
              <span className="font-semibold">Members:</span>
              <span>1.2k</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold">Posts:</span>
              <span>430</span>
            </div>
          </div>

          {/* Join Button */}
          <div className="mt-4">
            <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
              Join {name} Community
            </button>
          </div>
        </div>

        {/* Recent Posts Section */}
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold">Recent Posts in {name}</h3>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="text-xl font-semibold">Why I love {name}</h4>
            <p className="text-gray-600 mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              laoreet enim sed orci mollis pretium.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="text-xl font-semibold">
              Community Events This Week
            </h4>
            <p className="text-gray-600 mt-2">
              Curabitur lobortis ultricies orci, non pulvinar libero dapibus
              vel.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
