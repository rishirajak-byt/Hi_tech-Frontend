"use client";

import { motion } from "framer-motion";
import { Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ComingSoonPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center pt-20 pb-10 px-4">
      <div className="max-w-xl mx-auto text-center w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-10 md:p-14 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col items-center"
        >
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
            <Clock className="w-10 h-10 text-hitech-navy" />
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-hitech-navy mb-4">
            Coming Soon
          </h1>
          <p className="text-gray-600 mb-8 max-w-sm text-center leading-relaxed">
            We are currently working hard to bring this section to life. Please check back later for updates!
          </p>
          <Link 
            href="/"
            className="flex items-center gap-2 px-6 py-3 bg-hitech-navy text-white rounded-xl font-bold hover:bg-blue-900 transition-all hover:scale-105 active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to Homepage
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
