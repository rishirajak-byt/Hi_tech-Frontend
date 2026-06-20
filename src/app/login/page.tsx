"use client";

import { motion } from "framer-motion";
import { GraduationCap, ArrowRight, Mail, Lock, Shield, Users, BookOpen, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = "/dashboard";
    }, 1500);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden pt-20 pb-10 px-4">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(135deg, #f0f4ff 0%, #e8f0ff 25%, #fef8e8 50%, #f0f4ff 75%, #e8f0ff 100%)",
          backgroundSize: "400% 400%",
          animation: "gradient-shift 12s ease infinite",
        }}
      />

      {/* Floating geometric shapes */}
      <div className="absolute top-[15%] left-[8%] w-24 h-24 rounded-full bg-hitech-saffron/10" style={{ animation: "float-up 8s ease-in-out infinite" }} />
      <div className="absolute top-[60%] right-[12%] w-32 h-32 rounded-full bg-hitech-navy/5" style={{ animation: "float-down 10s ease-in-out infinite" }} />
      <div className="absolute bottom-[25%] left-[20%] w-16 h-16 border-2 border-hitech-navy/10 rounded-lg" style={{ animation: "spin-slow 20s linear infinite" }} />
      <div className="absolute top-[25%] right-[25%] w-20 h-20 bg-hitech-crimson/5 rounded-full" style={{ animation: "float-slow 12s ease-in-out infinite" }} />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(26,60,110,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(26,60,110,0.2) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container relative z-10 max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Side - Copy & Branding */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 text-center lg:text-left pt-10 lg:pt-0"
        >
          {/* Back to site */}
          <Link href="/" className="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-700 text-sm font-medium mb-8 transition-colors">
            <ChevronRight className="w-4 h-4 rotate-180" /> Back to Website
          </Link>
          <br/>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-hitech-navy/5 border border-hitech-navy/10 text-hitech-navy text-sm font-semibold mb-6 backdrop-blur-sm">
            <GraduationCap className="w-5 h-5 text-hitech-saffron" />
            <span>Student Portal 2026</span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-heading font-extrabold text-hitech-navy mb-6 leading-tight">
            Welcome Back to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-hitech-navy to-blue-600">
              HiTech Excellence.
            </span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0 font-sans leading-relaxed">
            Access your academic dashboard, track your attendance, manage fee payments, and stay updated with campus notifications all in one place.
          </p>

          {/* Feature badges */}
          <div className="hidden lg:flex flex-col gap-3">
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                <Shield className="w-4 h-4 text-emerald-600" />
              </div>
              <span>Enterprise-grade security with encrypted sessions</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-blue-600" />
              </div>
              <span>Real-time attendance & results tracking</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
                <Users className="w-4 h-4 text-orange-600" />
              </div>
              <span>5000+ students already connected</span>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="w-full max-w-md relative"
        >
          {/* Decorative tilted card behind */}
          <div className="absolute inset-0 bg-white/40 backdrop-blur-xl rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/60 -rotate-2 transform scale-105 z-0" />

          <div className="relative z-10 bg-white/90 backdrop-blur-2xl rounded-3xl p-8 lg:p-10 shadow-2xl border border-white/50 overflow-hidden">
            {/* Decorative blobs inside card */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-hitech-saffron/15 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-hitech-navy/5 rounded-full blur-3xl -ml-10 -mb-10 pointer-events-none" />

            <div className="mb-10 relative z-10">
              <div className="flex items-start sm:items-center justify-between mb-2 flex-col sm:flex-row gap-2">
                <h2 className="text-3xl font-heading font-bold text-gray-900">Secure Login</h2>
                <button 
                  type="button" 
                  onClick={() => {
                    setEmail("2023cse047@hitech.edu.in");
                    setPassword("student@123");
                  }} 
                  className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-bold transition-colors border border-gray-200 shrink-0"
                >
                  Student Demo
                </button>
              </div>
              <p className="text-gray-500 text-sm">Enter your university credentials to continue</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6 relative z-10">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 block">College Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-hitech-saffron/50 focus:border-hitech-saffron transition-all outline-none backdrop-blur-sm text-gray-800 placeholder-gray-400"
                    placeholder="e.g. 2023cse001@hitech.edu.in"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-gray-700 block">Password</label>
                  <Link href="/forgot-password" className="text-xs font-semibold text-hitech-navy hover:text-hitech-saffron transition-colors">
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-hitech-saffron/50 focus:border-hitech-saffron transition-all outline-none backdrop-blur-sm text-gray-800 placeholder-gray-400"
                    placeholder="••••••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-hitech-navy text-white font-bold py-4 px-4 rounded-xl hover:bg-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-900/30 transition-all flex items-center justify-center gap-2 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Authenticate</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center relative z-10">
              <p className="text-xs text-gray-500">
                Protected by enterprise-grade encryption. <br />
                By logging in, you agree to the <Link href="/terms" className="underline hover:text-hitech-navy">Terms of Service</Link>.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
