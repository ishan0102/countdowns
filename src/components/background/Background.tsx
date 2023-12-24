import { useCountdown } from "@/hooks/CountdownContext"
import Image from "next/image"

export default function Background() {
  const { background } = useCountdown()

  return (
    <div className="w-full h-full fixed inset-0">
      <Image
        src={background.src}
        alt={background.label}
        width={1920}
        height={1080}
        className="w-full h-full object-cover object-center"
      />
    </div>
  )
}
