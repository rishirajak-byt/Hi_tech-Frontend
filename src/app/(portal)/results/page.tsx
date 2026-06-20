"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  Award,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  GraduationCap,
  BarChart3,
} from "lucide-react";
import {
  studentProfile,
  cgpaProgression,
  allSemesterMarks,
} from "@/data/students";

/* ─── GRADE COLOR MAP ─── */
const gradeColor: Record<string, string> = {
  O: "text-emerald-600 bg-emerald-50",
  "A+": "text-blue-600 bg-blue-50",
  A: "text-sky-600 bg-sky-50",
  "B+": "text-yellow-600 bg-yellow-50",
  B: "text-orange-500 bg-orange-50",
  C: "text-red-500 bg-red-50",
};

/* ─── MARKS TABLE ─── */
function MarksTable({ semester }: { semester: number }) {
  const marks = allSemesterMarks[semester];
  if (!marks) return <p className="text-gray-400 text-sm py-8 text-center">Marks not available.</p>;

  const totalCredits = marks.reduce((s, m) => s + m.credits, 0);
  const totalWeighted = marks.reduce((s, m) => s + m.gradePoint * m.credits, 0);
  const sgpa = (totalWeighted / totalCredits).toFixed(2);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-gray-100">
              <th className="text-left py-3 pr-4 font-semibold text-gray-600 min-w-[180px]">Subject</th>
              <th className="text-center py-3 px-3 font-semibold text-gray-600">CIA-I<br /><span className="font-normal text-gray-400 text-[11px]">/15</span></th>
              <th className="text-center py-3 px-3 font-semibold text-gray-600">CIA-II<br /><span className="font-normal text-gray-400 text-[11px]">/15</span></th>
              <th className="text-center py-3 px-3 font-semibold text-gray-600">Assign.<br /><span className="font-normal text-gray-400 text-[11px]">/10</span></th>
              <th className="text-center py-3 px-3 font-semibold text-gray-600">ESE<br /><span className="font-normal text-gray-400 text-[11px]">/60</span></th>
              <th className="text-center py-3 px-3 font-semibold text-gray-600">Total<br /><span className="font-normal text-gray-400 text-[11px]">/100</span></th>
              <th className="text-center py-3 px-3 font-semibold text-gray-600">Grade</th>
              <th className="text-center py-3 px-3 font-semibold text-gray-600">GP</th>
              <th className="text-center py-3 pl-3 font-semibold text-gray-600">Credits</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {marks.map((m, i) => (
              <tr key={i} className="hover:bg-gray-50 transition-colors">
                <td className="py-3 pr-4 font-medium text-gray-800">{m.subject}</td>
                <td className="text-center py-3 px-3 text-gray-600">{m.cia1 ?? <span className="text-gray-300">—</span>}</td>
                <td className="text-center py-3 px-3 text-gray-600">{m.cia2 ?? <span className="text-gray-300">—</span>}</td>
                <td className="text-center py-3 px-3 text-gray-600">{m.assignment ?? <span className="text-gray-300">—</span>}</td>
                <td className="text-center py-3 px-3 text-gray-600">{m.ese}</td>
                <td className="text-center py-3 px-3 font-bold text-gray-900">{m.total}</td>
                <td className="text-center py-3 px-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${gradeColor[m.grade] ?? "text-gray-600 bg-gray-50"}`}>
                    {m.grade}
                  </span>
                </td>
                <td className="text-center py-3 px-3 text-gray-700 font-semibold">{m.gradePoint}</td>
                <td className="text-center py-3 pl-3 text-gray-600">{m.credits}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-gray-100 bg-gray-50">
              <td colSpan={8} className="py-3 pr-4 font-semibold text-gray-700">
                Total Credits: {totalCredits} &nbsp;|&nbsp; SGPA: <span className="text-hitech-navy">{sgpa}</span>
              </td>
              <td className="text-center py-3 pl-3 font-bold text-hitech-navy">{totalCredits}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   RESULTS PAGE
   ═══════════════════════════════════════════════ */
export default function ResultsPage() {
  const [activeSem, setActiveSem] = useState(4);
  const [expandedSem, setExpandedSem] = useState<number | null>(null);

  const availableSems = Object.keys(allSemesterMarks).map(Number).sort();

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* ═══ HEADER ═══ */}
      <div>
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-gray-900">Results & Marks</h1>
        <p className="text-gray-500 mt-1">{studentProfile.rollNumber} · {studentProfile.department}</p>
      </div>

      {/* ═══ CGPA SUMMARY ═══ */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Current CGPA", value: studentProfile.cgpa.toFixed(2), sub: "Cumulative (Sem 1–4)", icon: TrendingUp, iconBg: "bg-violet-100 text-violet-600" },
          { label: "Latest SGPA", value: cgpaProgression[cgpaProgression.length - 1].sgpa.toFixed(2), sub: `Semester ${cgpaProgression[cgpaProgression.length - 1].semester}`, icon: Award, iconBg: "bg-blue-100 text-blue-600" },
          { label: "Credits Earned", value: cgpaProgression.reduce((s, r) => s + r.creditsEarned, 0), sub: "Across all semesters", icon: BookOpen, iconBg: "bg-emerald-100 text-emerald-600" },
          { label: "Semesters", value: `${cgpaProgression.length} / 8`, sub: "Completed / Total", icon: GraduationCap, iconBg: "bg-orange-100 text-orange-600" },
        ].map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="stat-card bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${card.iconBg}`}>
              <card.icon className="w-5 h-5" />
            </div>
            <p className="text-2xl font-heading font-bold text-gray-900">{card.value}</p>
            <p className="text-sm font-medium text-gray-700 mt-0.5">{card.label}</p>
            <p className="text-xs text-gray-400 mt-1">{card.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* ═══ CGPA PROGRESSION ═══ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
      >
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 className="w-5 h-5 text-hitech-navy" />
          <h2 className="text-lg font-heading font-bold text-gray-900">CGPA Progression</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {cgpaProgression.map((sem) => (
            <div key={sem.semester} className="text-center">
              {/* Bar */}
              <div className="h-36 bg-gray-50 rounded-xl flex items-end justify-center p-3 mb-3 relative overflow-hidden">
                <div
                  className="w-10 rounded-lg bg-gradient-to-t from-hitech-navy to-blue-400 transition-all duration-700"
                  style={{ height: `${(sem.sgpa / 10) * 100}%` }}
                />
                <span className="absolute top-3 left-1/2 -translate-x-1/2 text-xl font-heading font-bold text-hitech-navy">
                  {sem.sgpa.toFixed(1)}
                </span>
              </div>
              <p className="text-sm font-semibold text-gray-800">Sem {sem.semester}</p>
              <p className="text-xs text-gray-400 mt-0.5">CGPA {sem.cumulativeCgpa.toFixed(2)}</p>
              <p className="text-xs text-gray-400">{sem.creditsEarned} credits</p>
              <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold text-emerald-600 bg-emerald-50">
                <CheckCircle2 className="w-3 h-3 inline mr-0.5" />
                {sem.result}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ═══ SEMESTER MARKS ═══ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >
        {/* Semester tabs */}
        <div className="border-b border-gray-100 px-6 pt-6 pb-0">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-hitech-navy" />
            <h2 className="text-lg font-heading font-bold text-gray-900">Semester Marks</h2>
          </div>
          <div className="flex gap-2 flex-wrap">
            {availableSems.map((sem) => (
              <button
                key={sem}
                onClick={() => setActiveSem(sem)}
                className={`px-4 py-2 rounded-t-xl text-sm font-semibold transition-all ${
                  activeSem === sem
                    ? "bg-hitech-navy text-white"
                    : "text-gray-500 hover:text-hitech-navy hover:bg-gray-50"
                }`}
              >
                Semester {sem}
              </button>
            ))}
            <div className="text-xs text-gray-400 ml-auto self-end pb-2">
              Semester 5 in progress
            </div>
          </div>
        </div>

        <div className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSem}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <MarksTable semester={activeSem} />
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* ═══ ALL SEMESTERS ACCORDION ═══ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="px-6 py-5 border-b border-gray-100">
          <h2 className="text-lg font-heading font-bold text-gray-900">Semester Summary</h2>
          <p className="text-sm text-gray-400">All completed semesters at a glance</p>
        </div>
        <div className="divide-y divide-gray-50">
          {cgpaProgression.map((sem) => (
            <div key={sem.semester}>
              <button
                onClick={() => setExpandedSem(expandedSem === sem.semester ? null : sem.semester)}
                className="w-full flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-hitech-navy/10 flex items-center justify-center shrink-0">
                  <span className="text-hitech-navy font-bold text-sm">{sem.semester}</span>
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-gray-800">Semester {sem.semester}</p>
                  <p className="text-xs text-gray-400">{sem.creditsEarned} credits earned</p>
                </div>
                <div className="text-right mr-4">
                  <p className="font-bold text-hitech-navy">{sem.sgpa.toFixed(2)}</p>
                  <p className="text-xs text-gray-400">SGPA</p>
                </div>
                <div className="text-right mr-4 hidden sm:block">
                  <p className="font-bold text-gray-700">{sem.cumulativeCgpa.toFixed(2)}</p>
                  <p className="text-xs text-gray-400">Cum. CGPA</p>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold text-emerald-600 bg-emerald-50 shrink-0">
                  {sem.result}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform shrink-0 ${expandedSem === sem.semester ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {expandedSem === sem.semester && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2">
                      <MarksTable semester={sem.semester} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
