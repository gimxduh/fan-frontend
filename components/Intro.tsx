//components/Intro.tsx
'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Shield, BarChart3, Bot } from 'lucide-react'
import Image from 'next/image'

// Animation preset
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

export default function Intro({ onStart }: { onStart: () => void }) {
  return (
    <main className="bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white scroll-smooth">
      <Navbar />

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <Image
            src="/FAN_logo.png"
            alt="FAN Logo"
            width={300}   // ปรับขนาดได้
            height={300}
            className="mx-auto"
          />
        </motion.div>
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-6">
            Franchise AI Navigator
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-slate-300 mb-8">
            AI-powered onboarding, scheduling, mentorship, and knowledge hub.
          </p>
          <button
            onClick={onStart}
            className="px-8 py-3 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 hover:opacity-90 shadow-lg text-lg font-semibold"
          >
            Get Started
          </button>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="min-h-screen py-24 px-6 max-w-6xl mx-auto">
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-4xl font-bold text-center mb-12"
        >
          Key Features
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard title="Smart Onboarding" desc="Instant answers to manuals and policies with AI assistance." />
          <FeatureCard title="Fair Scheduling" desc="Auto-generate balanced shift schedules respecting availability." />
          <FeatureCard title="Growth Mentorship" desc="Personalized career path guidance and weekly nudges." />
          <FeatureCard title="Team Engagement" desc="Idea sharing, challenges, and kudos for stronger teams." />
        </div>
      </section>

      {/* Agents Section */}
      <section id="agents" className="min-h-screen py-24 bg-slate-900/50 px-6">
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-4xl font-bold text-center mb-12"
        >
          Meet Our AI Agents
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <AgentCard icon="🤖" name="Arai" desc="Onboarding Assistant for manuals & FAQs" />
          <AgentCard icon="🗓️" name="Oai" desc="Smart Scheduler with fair shift allocation" />
          <AgentCard icon="📘" name="Jai" desc="Personal Growth & career mentorship" />
          <AgentCard icon="🤝" name="Kai" desc="Team community, ideas & kudos hub" />
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="min-h-screen py-24 px-6 max-w-5xl mx-auto text-center">
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-4xl font-bold mb-6"
        >
          Why Choose FAN?
        </motion.h2>
        <p className="text-slate-300 text-lg mb-10">
          Reduce training time, improve employee satisfaction, and empower managers with AI-driven insights.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          <BenefitCard title="Faster Onboarding" desc="Cut training time by 40% with instant AI answers." />
          <BenefitCard title="Fair Workloads" desc="Balanced schedules avoid burnout and favoritism." />
          <BenefitCard title="Motivated Teams" desc="Gamified challenges and kudos system boost morale." />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen py-24 px-6 max-w-5xl mx-auto text-center">
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-4xl font-bold mb-6"
        >
          About FAN
        </motion.h2>

        <p className="text-slate-300 text-lg mb-8">
          FAN is an AI ecosystem for onboarding, scheduling, mentorship, and knowledge management —
          empowering franchises with smart, scalable tools.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700 hover:bg-slate-800 transition">
            <div className="h-10 w-10 bg-indigo-600 rounded-lg flex items-center justify-center mb-3 mx-auto">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <h4 className="font-semibold">Secure Login</h4>
            <p className="text-sm text-slate-400 mt-1">
              Role-based authentication and access control.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700 hover:bg-slate-800 transition">
            <div className="h-10 w-10 bg-green-600 rounded-lg flex items-center justify-center mb-3 mx-auto">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <h4 className="font-semibold">Progress Tracking</h4>
            <p className="text-sm text-slate-400 mt-1">
              Track employee growth and performance metrics.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700 hover:bg-slate-800 transition">
            <div className="h-10 w-10 bg-purple-600 rounded-lg flex items-center justify-center mb-3 mx-auto">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <h4 className="font-semibold">AI Guidance</h4>
            <p className="text-sm text-slate-400 mt-1">
              Personalized assistance for onboarding and career development.
            </p>
          </div>
        </div>

        {/* Credit Section */}
        <div className="mt-12">
          <hr className="border-slate-700 mb-6" />
          <h3 className="text-2xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Developed by
          </h3>
          <p className="mt-3 text-lg font-semibold text-slate-200">
            Jiratip J. <span className="text-slate-400">&</span> Krittaphas T.
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Hackathon 2025 — Franchise AI Navigator
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center py-24 bg-gradient-to-r from-indigo-700 to-purple-700">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-5xl font-bold mb-6">Ready to Transform Your Franchise?</h2>
          <p className="text-slate-200 mb-8 text-lg">
            Join teams already using FAN to onboard, schedule, and grow smarter.
          </p>
          <button
            onClick={onStart}
            className="px-10 py-4 bg-white text-indigo-700 font-semibold rounded-xl shadow-lg hover:scale-105 transition"
          >
            Get Started Free
          </button>
        </motion.div>
      </section>
    </main>
  )
}

/* ----------------- Navbar ----------------- */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition ${
        scrolled ? 'bg-slate-950/90 backdrop-blur border-b border-slate-800' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent"
        >
          FAN
        </Link>

        {/* Menu */}
        <div className="space-x-8 hidden md:flex">
          <a href="#features" className="text-slate-300 hover:text-white transition">
            Features
          </a>
          <a href="#agents" className="text-slate-300 hover:text-white transition">
            Agents
          </a>
          <a href="#benefits" className="text-slate-300 hover:text-white transition">
            Benefits
          </a>
          <a href="#about" className="text-slate-300 hover:text-white transition">
            About
          </a>
          <Link href="/login" className="text-slate-300 hover:text-white transition">
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  )
}

/* ----------------- Cards ----------------- */
function FeatureCard({ title, desc }: { title: string; desc: string }) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.3 }}
      className="bg-slate-800 p-6 rounded-xl shadow-md hover:shadow-lg transition"
    >
      <h3 className="text-xl font-semibold text-indigo-400">{title}</h3>
      <p className="mt-2 text-slate-300 text-sm">{desc}</p>
    </motion.div>
  )
}

function AgentCard({ icon, name, desc }: { icon: string; name: string; desc: string }) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.3 }}
      className="bg-slate-800 p-6 rounded-xl shadow-md text-center"
    >
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-lg font-bold">{name}</h3>
      <p className="text-slate-300 text-sm mt-1">{desc}</p>
    </motion.div>
  )
}

function BenefitCard({ title, desc }: { title: string; desc: string }) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.3 }}
      className="bg-slate-800 p-6 rounded-xl shadow-md"
    >
      <h3 className="text-lg font-semibold text-indigo-400">{title}</h3>
      <p className="mt-2 text-slate-300 text-sm">{desc}</p>
    </motion.div>
  )
}
