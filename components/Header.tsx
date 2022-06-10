import Image from "next/image"
import {
  ChevronDownIcon,
  HomeIcon,
  SearchIcon,
  MenuIcon,
} from "@heroicons/react/solid"
import {
  BellIcon,
  ChatIcon,
  GlobeIcon,
  PlusIcon,
  SparklesIcon,
  SpeakerphoneIcon,
  VideoCameraIcon,
} from "@heroicons/react/outline"
import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link"

const Header = () => {
  const { data: session } = useSession()
  return (
    <div className="flex bg-white sticky top-0 z-50 px-4 py-2 shadow-sm">
      <div className="relative h-10 w-20 flex-shrink-0 cursor-pointer">
        <Link href="/">
          <Image
            objectFit="contain"
            src="https://links.papareact.com/fqy"
            layout="fill"
          />
        </Link>
      </div>
      <div className="mx-7 flex items-center xl:min-w-[300px]">
        <HomeIcon className="h-5 w-5 " />
        <p className=" ml-2 hidden lg:inline flex-1">Home</p>
        <ChevronDownIcon className="h-5 w-5" />
      </div>
      <form className="items-center flex border border-gray-200 flex-1 space-x-2 rounded-sm bg-gray px-3">
        <SearchIcon className="h-6 w-6 text-gray-500" />
        <input
          className="flex-1 bg-transparent outline-none"
          type="text"
          placeholder="Search Reddit"
        />
        <button type="submit" hidden />
      </form>
      <div className="space-x-2 text-gray-500 mx-5 hidden lg:inline-flex">
        <SparklesIcon className="icon" />
        <GlobeIcon className="icon" />
        <VideoCameraIcon className="icon" />
        <hr className="h-10 border border-gray-100" />
        <ChatIcon className="icon" />
        <BellIcon className="icon" />
        <PlusIcon className="icon" />
        <SpeakerphoneIcon className="icon" />
      </div>
      <div className="mx-5 lg:hidden flex items-center">
        <MenuIcon className="icon flex-items-center" />
      </div>

      {session ? (
        <div
          onClick={() => signOut()}
          className="hidden lg:inline-flex items-center cursor-pointer space-x-2 border border-gray-100"
        >
          <div className="relative h-5 w-5">
            <Image
              objectFit="contain"
              src="https://links.papareact.com/23l"
              layout="fill"
              alt="Sign out"
            />
          </div>
          <div className="flex-1 text-xs">
            <p className="truncate">{session?.user?.name}</p>
            <p className="text-gray-400">1 Karma</p>
          </div>
          <ChevronDownIcon className="h-5 flex-shrink-0 text-gray-400" />
        </div>
      ) : (
        <div
          onClick={() => signIn("reddit")}
          className="hidden lg:inline-flex items-center cursor-pointer space-x-2 border border-gray-100"
        >
          <div className="relative h-5 w-5">
            <Image
              objectFit="contain"
              src="https://links.papareact.com/23l"
              layout="fill"
              alt="Sign in"
            />
          </div>
          <p className="text-gray-400">Sign In</p>
        </div>
      )}
    </div>
  )
}
export default Header
