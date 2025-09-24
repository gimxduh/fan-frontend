 // pages/index.tsx
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  useEffect(() => {
    router.replace("/intro")
  }, [router])
  return null
}
