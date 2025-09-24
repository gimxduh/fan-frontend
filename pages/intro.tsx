// pages/intro.tsx
'use client'
import Intro from '../components/Intro'
import { useRouter } from 'next/navigation'

export default function IntroPage() {
  const router = useRouter()
  return <Intro onStart={() => router.push('/login')} />
}
