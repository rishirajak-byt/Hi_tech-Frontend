"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ChevronRight,
  GraduationCap,
  Users,
  Building2,
  BookOpen,
  Calendar,
  Trophy,
  Cpu,
  FlaskConical,
  Quote,
  Star,
  ArrowRight,
  Newspaper,
  Clock,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import HeroBackground from "@/components/website/HeroBackground";

/* ───── PROGRAM DATA ───── */
const programsList = [
  {
    title: "Computer Science & Engineering", code: "CSE", intake: 120, icon: Cpu,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
    tag: "Most Popular",
  },
  {
    title: "Electronics & Communication", code: "ECE", intake: 90, icon: FlaskConical,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
    tag: "Core Branch",
  },
  {
    title: "Mechanical Engineering", code: "ME", intake: 60, icon: Building2,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80",
    tag: "Core Branch",
  },
  {
    title: "Civil Engineering", code: "CE", intake: 60, icon: Building2,
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80",
    tag: "Core Branch",
  },
  {
    title: "Artificial Intelligence & Data Science", code: "AI&DS", intake: 60, icon: Cpu,
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=80",
    tag: "Emerging",
  },
  {
    title: "Information Technology", code: "IT", intake: 60, icon: BookOpen,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
    tag: "High Demand",
  },
];

/* ───── NEWS DATA ───── */
const newsItems = [
  {
    title: "HiTech Ranked in Top 50 Engineering Colleges by NIRF 2026",
    date: "April 15, 2026",
    category: "Achievement",
    excerpt: "Our institution has been recognized among the top 50 engineering colleges in India by the National Institutional Ranking Framework.",
  },
  {
    title: "Annual Tech Fest 'INNOVA 2026' — Registrations Open",
    date: "April 10, 2026",
    category: "Event",
    excerpt: "Join 50+ competitions, hackathons, and workshops featuring speakers from Google, Microsoft, and Amazon.",
  },
  {
    title: "Campus Placement Drive — 95% Students Placed in 2025-26",
    date: "March 28, 2026",
    category: "Placement",
    excerpt: "Record-breaking placements with highest package of ₹42 LPA and average package of ₹8.5 LPA across all branches.",
  },
];

/* ───── TESTIMONIAL DATA ───── */
const testimonials = [
  {
    name: "Priya Sharma",
    branch: "CSE — Batch 2024",
    text: "HiTech University transformed my career. The faculty mentorship and industry-aligned curriculum helped me land my dream job at Microsoft.",
    company: "Microsoft",
  },
  {
    name: "Arjun Patel",
    branch: "ECE — Batch 2023",
    text: "The research culture here is unmatched. I published 3 papers during my B.Tech and got a direct admit to IIT Bombay for M.Tech.",
    company: "IIT Bombay",
  },
  {
    name: "Sneha Reddy",
    branch: "AI&DS — Batch 2025",
    text: "The AI lab and cloud computing facilities gave me hands-on experience that textbooks never could. Now working on cutting-edge AI at Google.",
    company: "Google",
  },
];

/* ───── PARTNER LOGOS ───── */
const partners = [
  "Microsoft", "Google", "Amazon", "TCS", "Infosys", "Wipro",
  "IBM", "Accenture", "HCL", "Cognizant", "Adobe", "Oracle",
];

/* ───── ANIMATED COUNTER ───── */
function AnimatedStat({ value, label, suffix = "" }: { value: string; label: string; suffix?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center text-center"
    >
      <span className="text-4xl md:text-5xl font-heading font-bold text-hitech-navy mb-2">
        {value}
        {suffix}
      </span>
      <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">{label}</span>
    </motion.div>
  );
}

/* ───── ROTATING TAGLINES ───── */
const taglines = [
  "Building Futures.",
  "Creating Innovators.",
  "Driving Research.",
  "Empowering Leaders.",
];

/* ───── HOME PAGE ───── */
export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [currentTagline, setCurrentTagline] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* ══════ HERO SECTION ══════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <HeroBackground />

        {/* ── Floating glassmorphism achievement badges ── */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="hidden lg:flex absolute left-8 top-[30%] z-20 flex-col gap-4"
        >
          {[
            { icon: Trophy, label: "NIRF Top 50", value: "Ranked" },
            { icon: Star, label: "NAAC Grade", value: "A+" },
            { icon: GraduationCap, label: "Placements", value: "94%" },
          ].map((badge, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4 + idx * 0.2 }}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/[0.07] backdrop-blur-md border border-white/10 hover:bg-white/[0.12] transition-all group cursor-default"
              style={{ animation: `float-up ${8 + idx * 2}s ease-in-out infinite ${idx}s` }}
            >
              <div className="w-10 h-10 rounded-xl bg-hitech-saffron/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <badge.icon className="w-5 h-5 text-hitech-saffron" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">{badge.value}</p>
                <p className="text-gray-400 text-xs">{badge.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Floating right-side stats ── */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="hidden lg:flex absolute right-8 top-[25%] z-20 flex-col gap-4"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="px-5 py-4 rounded-2xl bg-white/[0.07] backdrop-blur-md border border-white/10"
            style={{ animation: "float-down 9s ease-in-out infinite" }}
          >
            <p className="text-3xl font-heading font-bold text-hitech-saffron">₹42 LPA</p>
            <p className="text-gray-400 text-xs mt-1">Highest Package 2026</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="px-5 py-4 rounded-2xl bg-white/[0.07] backdrop-blur-md border border-white/10"
            style={{ animation: "float-up 10s ease-in-out infinite 1s" }}
          >
            <p className="text-3xl font-heading font-bold text-white">150+</p>
            <p className="text-gray-400 text-xs mt-1">Recruiters Visit Annually</p>
          </motion.div>
        </motion.div>

        {/* ── Center content ── */}
        <div className="container relative z-10 mx-auto px-4 md:px-6 flex flex-col items-center text-center pt-24 pb-40">
          {/* Accreditation pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-8"
          >
            {["AICTE Approved", "NAAC A+", "NBA Accredited", "Admissions Open 2026-27"].map((pill, idx) => (
              <span
                key={idx}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm border transition-all ${
                  idx === 3
                    ? "bg-hitech-saffron/20 border-hitech-saffron/40 text-hitech-saffron"
                    : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                }`}
              >
                {idx === 3 && <span className="inline-block w-1.5 h-1.5 rounded-full bg-hitech-saffron animate-pulse mr-2" />}
                {pill}
              </span>
            ))}
          </motion.div>

          {/* Animated heading with rotating tagline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-white mb-6 leading-[1.1] max-w-5xl"
          >
            Shaping Engineers, <br />
            <span className="relative block h-[1.15em] overflow-hidden">
              {taglines.map((tagline, idx) => (
                <span
                  key={idx}
                  className={`text-transparent bg-clip-text bg-gradient-to-r from-hitech-saffron via-yellow-300 to-orange-300 absolute inset-x-0 transition-all duration-700 ${
                    currentTagline === idx
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-[60px]"
                  }`}
                >
                  {tagline}
                </span>
              ))}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-300/90 mb-10 max-w-2xl font-sans leading-relaxed"
          >
            Empowering the next generation of technologists with world-class education, cutting-edge research, and industry-aligned skills since 1995.
          </motion.p>

        </div>

        {/* ── Scrolling news ticker at bottom ── */}
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-white via-white/95 to-white/0 pt-16 pb-0">
          <div className="overflow-hidden py-3 bg-white/80 backdrop-blur-sm border-t border-gray-100">
            <div className="flex gap-12 items-center" style={{ animation: "ticker 25s linear infinite" }}>
              {[...newsItems, ...newsItems].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 shrink-0 px-2">
                  <span className="w-2 h-2 rounded-full bg-hitech-crimson shrink-0 animate-pulse" />
                  <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                    <span className="font-bold text-hitech-navy">{item.category}:</span> {item.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════ STATS BAR ══════ */}
      <section className="bg-white py-12 relative z-20 border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <AnimatedStat value="1995" label="Established Year" />
            <AnimatedStat value="5000" label="Total Students" suffix="+" />
            <AnimatedStat value="8" label="Programs Offered" />
            <AnimatedStat value="94" label="Placement Rate" suffix="%" />
          </div>
        </div>
      </section>

      {/* ══════ WHY CHOOSE US ══════ */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-bold text-hitech-crimson uppercase tracking-widest mb-2">
              Why HiTech
            </h2>
            <h3 className="text-3xl md:text-5xl font-heading font-bold text-hitech-navy">
              A Legacy of Excellence
            </h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: GraduationCap, title: "NAAC A+ Accredited", desc: "Recognized nationally for highest quality standards in technical education." },
              { icon: Building2, title: "Industry Labs", desc: "State-of-the-art laboratories sponsored by leading tech giants." },
              { icon: Users, title: "Top Placements", desc: "Dedicated placement cell ensuring opportunities in Fortune 500 companies." },
              { icon: BookOpen, title: "Global Research", desc: "Active research centers with international academic partnerships." },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 group card-hover"
              >
                <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-hitech-navy transition-all">
                  <feature.icon className="w-7 h-7 text-hitech-navy group-hover:text-hitech-saffron transition-colors" />
                </div>
                <h4 className="text-xl font-heading font-bold text-gray-900 mb-3">{feature.title}</h4>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ FEATURED B.TECH PROGRAMS (CSS Carousel) ══════ */}
      <section className="py-24 bg-[#070f1e] overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 mb-12">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="max-w-2xl">
              <h2 className="text-sm font-bold text-hitech-saffron uppercase tracking-widest mb-2">
                Academics
              </h2>
              <h3 className="text-3xl md:text-5xl font-heading font-bold text-white">
                Featured B.Tech Programs
              </h3>
            </div>
            <Link
              href="/programs"
              className="text-gray-400 font-semibold hover:text-hitech-saffron flex items-center gap-1 transition-colors"
            >
              View All Programs <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Smooth CSS-only infinite carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <div className="carousel-track gap-6 px-4">
              {[...programsList, ...programsList].map((program, idx) => (
                <div
                  key={idx}
                  className="group relative rounded-2xl overflow-hidden shrink-0 w-[320px] md:w-[360px] bg-gradient-to-br from-hitech-navy to-hitech-navy-dark card-hover shadow-xl border border-white/5"
                >
                  {/* ── Photo area ── */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={program.image}
                      alt={program.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="360px"
                    />
                    {/* dark gradient overlay so text is legible */}
                    <div className="absolute inset-0 bg-gradient-to-t from-hitech-navy via-hitech-navy/40 to-transparent" />
                    {/* tag badge */}
                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-hitech-saffron/90 text-hitech-navy text-[10px] font-bold uppercase tracking-wider shadow">
                      {program.tag}
                    </span>
                    {/* code badge */}
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm text-white/80 text-[10px] font-bold border border-white/10">
                      {program.code}
                    </span>
                  </div>

                  {/* ── Info area ── */}
                  <div className="p-6 relative">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-hitech-saffron/5 rounded-full -mr-8 -mt-8" />
                    <div className="flex items-start gap-3 mb-4 relative z-10">
                      <div className="w-10 h-10 rounded-xl bg-hitech-saffron/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-hitech-saffron/30 transition-colors">
                        <program.icon className="w-5 h-5 text-hitech-saffron" />
                      </div>
                      <h4 className="text-base font-heading font-bold text-white leading-snug group-hover:text-hitech-saffron transition-colors">
                        {program.title}
                      </h4>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-400 pt-3 border-t border-white/10 relative z-10">
                      <span>4 Years</span>
                      <span className="w-1 h-1 rounded-full bg-gray-600" />
                      <span>8 Semesters</span>
                      <span className="w-1 h-1 rounded-full bg-gray-600" />
                      <span className="text-hitech-saffron font-semibold">{program.intake} Seats</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Fade edges */}
          <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-[#070f1e] to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-[#070f1e] to-transparent z-10 pointer-events-none" />
        </div>
      </section>

      {/* ══════ NEWS & EVENTS ══════ */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-bold text-hitech-crimson uppercase tracking-widest mb-2">
              Stay Updated
            </h2>
            <h3 className="text-3xl md:text-5xl font-heading font-bold text-hitech-navy">
              News & Events
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {newsItems.map((item, idx) => (
              <motion.article
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group card-hover"
              >
                <div className="h-2 bg-gradient-to-r from-hitech-navy via-hitech-saffron to-hitech-crimson" />
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full bg-hitech-navy/5 text-hitech-navy text-xs font-semibold">
                      {item.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Clock className="w-3 h-3" />
                      {item.date}
                    </span>
                  </div>
                  <h4 className="text-lg font-heading font-bold text-gray-900 mb-3 group-hover:text-hitech-navy transition-colors leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{item.excerpt}</p>
                  <span className="text-hitech-navy font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all cursor-pointer">
                    Read More <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ TESTIMONIALS ══════ */}
      <section className="py-24 bg-[#070f1e] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-hitech-saffron/5 rounded-full -ml-32 -mt-32" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mb-48" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-hitech-saffron uppercase tracking-widest mb-2">
              Student Voices
            </h2>
            <h3 className="text-3xl md:text-5xl font-heading font-bold text-white">
              What Our Alumni Say
            </h3>
          </div>

          <div className="max-w-3xl mx-auto">
            {/* CSS grid stack — all cards share the same cell, no absolute needed */}
            <div className="grid">
              {testimonials.map((testimonial, idx) => (
                <div
                  key={idx}
                  style={{ gridArea: "1 / 1" }}
                  className={`transition-all duration-700 ease-in-out ${
                    activeTestimonial === idx
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 translate-y-5 pointer-events-none"
                  }`}
                >
                  <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-10 border border-white/10 relative">
                    <Quote className="w-10 h-10 text-hitech-saffron/30 absolute top-8 left-8" />
                    <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed font-sans relative z-10 pl-8">
                      &ldquo;{testimonial.text}&rdquo;
                    </p>
                    <div className="flex items-center gap-4 pl-8">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-hitech-saffron to-yellow-300 flex items-center justify-center text-hitech-navy font-bold text-lg">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-white font-heading font-semibold">{testimonial.name}</p>
                        <p className="text-gray-400 text-sm">{testimonial.branch}</p>
                      </div>
                      <div className="ml-auto">
                        <span className="px-4 py-1.5 rounded-full bg-hitech-saffron/10 border border-hitech-saffron/20 text-hitech-saffron text-sm font-medium">
                          Now at {testimonial.company}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dots */}
            <div className="flex items-center justify-center gap-3 mt-8">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    activeTestimonial === idx
                      ? "bg-hitech-saffron w-8"
                      : "w-3 bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════ RECRUITMENT PARTNERS ══════ */}
      <section className="py-20 bg-[#070f1e] overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-sm font-bold text-hitech-saffron uppercase tracking-widest mb-2">
              Our Recruiters
            </h2>
            <h3 className="text-3xl md:text-4xl font-heading font-bold text-white">
              Trusted by Industry Leaders
            </h3>
          </div>
        </div>

        {/* Single-row infinite marquee — reuses existing ticker animation */}
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex gap-5 items-center"
              style={{ animation: "ticker 28s linear infinite" }}
            >
              {[...partners, ...partners].map((partner, idx) => (
                <div
                  key={idx}
                  className="shrink-0 h-16 px-8 rounded-2xl border border-white/8 bg-white/4 flex items-center justify-center group hover:border-hitech-saffron/40 hover:bg-white/8 transition-all"
                >
                  <span className="text-sm font-heading font-bold text-gray-500 group-hover:text-hitech-saffron transition-colors whitespace-nowrap">
                    {partner}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {/* fade edges matching dark bg */}
          <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-[#070f1e] to-transparent pointer-events-none z-10" />
          <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-[#070f1e] to-transparent pointer-events-none z-10" />
        </div>
      </section>

      {/* ══════ PORTAL QUICK ACCESS ══════ */}
      {/* 
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, rgba(26,60,110,0.06) 0%, transparent 60%), radial-gradient(circle at 80% 50%, rgba(244,163,0,0.06) 0%, transparent 60%)" }} />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-sm font-bold text-hitech-crimson uppercase tracking-widest mb-2">Portal Access</h2>
            <h3 className="text-3xl md:text-4xl font-heading font-bold text-hitech-navy">Quick Links</h3>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">Access the HiTech University management portals directly. Choose your role below.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group relative rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 card-hover"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-hitech-navy to-hitech-navy-dark" />
              <div className="absolute top-0 right-0 w-40 h-40 bg-hitech-saffron/10 rounded-full -mr-16 -mt-16" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-10 -mb-10" />
              <div className="relative z-10 p-8">
                <div className="w-14 h-14 rounded-2xl bg-hitech-saffron/20 border border-hitech-saffron/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-7 h-7 text-hitech-saffron" />
                </div>
                <h4 className="text-xl font-heading font-bold text-white mb-2">Student Portal</h4>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">Access your attendance, results, fee status, documents, and notifications — all in one place.</p>
                <div className="space-y-2 mb-7">
                  {["Attendance & Results", "Fee Management", "Document Requests"].map((f) => (
                    <div key={f} className="flex items-center gap-2 text-xs text-gray-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-hitech-saffron" />
                      {f}
                    </div>
                  ))}
                </div>
                <Link href="/login" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-hitech-saffron text-hitech-navy font-bold text-sm hover:bg-yellow-400 transition-colors shadow-[0_0_20px_rgba(244,163,0,0.25)] group-hover:shadow-[0_0_30px_rgba(244,163,0,0.4)]">
                  Student Login <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group relative rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 card-hover"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#070f1e] to-[#0d1a35]" />
              <div className="absolute top-0 right-0 w-40 h-40 bg-hitech-crimson/10 rounded-full -mr-16 -mt-16" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-10 -mb-10" />
              <div className="relative z-10 p-8">
                <div className="w-14 h-14 rounded-2xl bg-hitech-crimson/20 border border-hitech-crimson/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Users className="w-7 h-7 text-hitech-crimson" />
                </div>
                <h4 className="text-xl font-heading font-bold text-white mb-2">Admin / Teacher Portal</h4>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">Manage students, faculty, departments, fee collections, admissions, and institutional analytics.</p>
                <div className="space-y-2 mb-7">
                  {["Student & Faculty Management", "Fee & Admissions", "Reports & Analytics"].map((f) => (
                    <div key={f} className="flex items-center gap-2 text-xs text-gray-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-hitech-crimson" />
                      {f}
                    </div>
                  ))}
                </div>
                <Link href="/admin/login" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-hitech-crimson text-white font-bold text-sm hover:bg-red-700 transition-colors shadow-[0_0_20px_rgba(200,16,46,0.25)] group-hover:shadow-[0_0_30px_rgba(200,16,46,0.4)]">
                  Admin Login <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      */}

      {/* ══════ CTA SECTION ══════ */}
      <section className="py-20 bg-[#070f1e] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 50%, #F4A300 0%, transparent 50%), radial-gradient(circle at 80% 50%, #C8102E 0%, transparent 50%)",
            }}
          />
        </div>
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
              Join thousands of students who are building their future at HiTech University. Applications for 2026-27 batch are now open.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/coming-soon"
                className="px-10 py-4 rounded-full bg-hitech-saffron text-hitech-navy font-bold text-lg hover:bg-yellow-400 transition-colors shadow-[0_0_30px_rgba(244,163,0,0.3)]"
              >
                Apply Now — Free
              </Link>
              <Link
                href="/coming-soon"
                className="px-10 py-4 rounded-full bg-white/10 text-white font-bold text-lg hover:bg-white/20 transition-colors border border-white/20 flex items-center justify-center gap-2"
              >
                Talk to Admissions
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
