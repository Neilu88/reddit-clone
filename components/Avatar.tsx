import { useSession } from "next-auth/react"
import Image from "next/image"

type Props = {
  seed?: string
  large?: boolean
}

const Avatar = ({ seed, large }: Props) => {
  const { data: session } = useSession()

  return (
    <div
      className={`overflow-hidden relative rounded-full h-10 w-10 border-gray-300 bg-white ${
        large && "!h-20 !w-20"
      }`}
    >
      <Image
        layout="fill"
        src={`https://avatars.dicebear.com/api/open-peeps/${
          seed || session?.user?.name || "placeholder"
        }.svg`}
      />
    </div>
  )
}
export default Avatar
