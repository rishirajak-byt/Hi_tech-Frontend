"use client";

import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Users, Award, CalendarCheck } from "lucide-react";
import { departmentStats, admissionFunnel } from "@/data/admin";
import { cgpaProgression } from "@/data/students";

const placementTrend = [
  { year: "2022-23", rate: 88.4, avgPkg: 6.8, highPkg: 32 },
  { year: "2023-24", rate: 91.2, avgPkg: 7.4, highPkg: 36 },
  { year: "2024-25", rate: 92.5, avgPkg: 8.1, highPkg: 38 },
  { year: "2025-26", rate: 94.6, avgPkg: 8.5, highPkg: 42 },
];

const cgpaDistribution = [
  { range: "9.0–10.0", count: 312, pct: 6 },
  { range: "8.0–8.9", count: 780, pct: 14.9 },
  { range: "7.0–7.9", count: 1820, pct: 34.7 },
  { range: "6.0–6.9", count: 1560, pct: 29.7 },
  { range: "Below 6.0", count: 776, pct: 14.8 },
];

export default function AnalyticsPage() {
  const maxCgpaCount = Math.max(...cgpaDistribution.map((c) => c.count));

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-hitech-navy">Analytics</h1>
        <p className="text-gray-500 mt-1">Institutional performance insights — Academic Year 2025–26</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Avg. CGPA", value: "7.84", sub: "+0.12 vs last year", icon: TrendingUp, c: "text-violet-400 bg-violet-500/10" },
          { label: "Placement Rate", value: "94.6%", sub: "+2.1% vs 2024-25", icon: Award, c: "text-emerald-400 bg-emerald-500/10" },
          { label: "Avg. Attendance", value: "81.4%", sub: "-1.2% vs last sem", icon: CalendarCheck, c: "text-blue-400 bg-blue-500/10" },
          { label: "Total Students", value: "5,248", sub: "Across 8 departments", icon: Users, c: "text-yellow-400 bg-yellow-500/10" },
        ].map((c, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${c.c}`}><c.icon className="w-4 h-4" /></div>
            <p className="text-2xl font-heading font-bold text-hitech-navy">{c.value}</p>
            <p className="text-xs font-medium text-gray-500 mt-0.5">{c.label}</p>
            <p className="text-[11px] text-gray-500 mt-1">{c.sub}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* CGPA Distribution */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-5 h-5 text-hitech-saffron" />
            <h2 className="text-base font-heading font-bold text-hitech-navy">CGPA Distribution</h2>
          </div>
          <div className="space-y-3">
            {cgpaDistribution.map((band, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-xs text-gray-600 w-20 shrink-0">{band.range}</span>
                <div className="flex-1 h-6 bg-gray-50 rounded-lg overflow-hidden relative">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${(band.count / maxCgpaCount) * 100}%` }}
                    transition={{ delay: 0.4 + i * 0.06, duration: 0.6 }}
                    className="h-full rounded-lg bg-gradient-to-r from-hitech-navy to-blue-500 flex items-center justify-end pr-2">
                    <span className="text-[10px] text-white font-bold">{band.pct}%</span>
                  </motion.div>
                </div>
                <span className="text-xs text-gray-500 w-14 text-right shrink-0">{band.count.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Dept CGPA comparison */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-hitech-saffron" />
            <h2 className="text-base font-heading font-bold text-hitech-navy">Dept. Avg. CGPA</h2>
          </div>
          <div className="grid grid-cols-4 gap-2 items-end h-40 mb-3">
            {departmentStats.map((dept) => (
              <div key={dept.code} className="flex flex-col items-center gap-1.5">
                <span className="text-[11px] font-bold text-gray-700">{dept.avgCgpa}</span>
                <motion.div initial={{ height: 0 }} animate={{ height: `${((dept.avgCgpa - 6) / 4) * 100}%` }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="w-full rounded-t-lg" style={{ background: dept.color, minHeight: 4 }} />
                <span className="text-[10px] text-gray-500 font-bold">{dept.code}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between text-[10px] text-gray-500 pt-2 border-t border-gray-100">
            <span>Scale: 6.0 → 10.0</span>
            <span>College Avg: 7.84</span>
          </div>
        </motion.div>
      </div>

      {/* Placement trend */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <Award className="w-5 h-5 text-hitech-saffron" />
          <h2 className="text-base font-heading font-bold text-hitech-navy">Placement Trend</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {["Academic Year", "Placement Rate", "Avg Package (LPA)", "Highest Package (LPA)", "Trend"].map((h) => (
                  <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {placementTrend.map((row, i) => (
                <tr key={i} className={`hover:bg-gray-50 ${i === placementTrend.length - 1 ? "bg-hitech-saffron/5" : ""}`}>
                  <td className="py-3.5 px-4 text-hitech-navy font-semibold">{row.year}</td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-emerald-500">{row.rate}%</span>
                  </td>
                  <td className="py-3.5 px-4 text-gray-600">₹{row.avgPkg} LPA</td>
                  <td className="py-3.5 px-4 text-hitech-saffron font-bold">₹{row.highPkg} LPA</td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1 text-emerald-500 text-xs">
                      <TrendingUp className="w-3.5 h-3.5" />
                      {i > 0 ? `+${(row.rate - placementTrend[i - 1].rate).toFixed(1)}%` : "—"}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* CGPA semester progression (sample student) */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
        className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <h2 className="text-base font-heading font-bold text-hitech-navy mb-5">Sample Student CGPA Progression</h2>
        <div className="flex items-end gap-4 h-32 mt-4">
          {cgpaProgression.map((sem) => (
            <div key={sem.semester} className="flex-1 flex flex-col items-center justify-end gap-1.5 h-full">
              <span className="text-sm font-bold text-hitech-navy">{sem.sgpa}</span>
              <div className="w-full rounded-t-lg bg-gradient-to-t from-hitech-navy to-blue-400" style={{ height: `${(sem.sgpa / 10) * 100}%` }} />
              <span className="text-[10px] text-gray-500">Sem {sem.semester}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
