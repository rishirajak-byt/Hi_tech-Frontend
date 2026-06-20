"use client";

import { motion } from "framer-motion";
import { CalendarCheck, AlertTriangle, TrendingDown, CheckCircle2, Users } from "lucide-react";
import { departmentStats } from "@/data/admin";
import { attendanceData } from "@/data/students";

const lowAttendanceStudents = [
  { name: "Vikram Patel", id: "2023CSE012", dept: "CSE", subject: "Multiple Subjects", attendance: 68 },
  { name: "Ritika Sharma", id: "2023ME041", dept: "ME", subject: "Engineering Drawing", attendance: 71 },
  { name: "Aman Dubey", id: "2024ECE018", dept: "ECE", subject: "Signals & Systems", attendance: 73 },
  { name: "Sanya Gupta", id: "2023CE029", dept: "CE", subject: "Structural Analysis", attendance: 70 },
];

export default function AdminAttendancePage() {
  const avgAttendance = (departmentStats.reduce((s, d) => s + d.avgAttendance, 0) / departmentStats.length).toFixed(1);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-hitech-navy">Attendance</h1>
        <p className="text-gray-500 mt-1">Semester 5 · Academic Year 2025–26 (Odd)</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "College Avg.", value: `${avgAttendance}%`, icon: CalendarCheck, c: "text-blue-400 bg-blue-500/10" },
          { label: "Above 75%", value: "4,936", icon: CheckCircle2, c: "text-emerald-400 bg-emerald-500/10" },
          { label: "Below 75%", value: "312", icon: AlertTriangle, c: "text-red-400 bg-red-500/10" },
          { label: "Debarred Risk", value: "58", icon: TrendingDown, c: "text-orange-400 bg-orange-500/10" },
        ].map((c, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className="bg-white shadow-sm border border-gray-100 border border-gray-100 rounded-2xl p-4">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${c.c}`}><c.icon className="w-4 h-4" /></div>
            <p className="text-xl font-heading font-bold text-hitech-navy">{c.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{c.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Department-wise */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-white shadow-sm border border-gray-100 border border-gray-100 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <Users className="w-5 h-5 text-hitech-saffron" />
            <h2 className="text-base font-heading font-bold text-hitech-navy">Department-wise Attendance</h2>
          </div>
          <div className="space-y-4">
            {departmentStats.map((dept) => (
              <div key={dept.code}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-semibold text-gray-600">{dept.code}</span>
                  <span className={`font-bold ${dept.avgAttendance >= 80 ? "text-emerald-400" : dept.avgAttendance >= 75 ? "text-yellow-400" : "text-red-400"}`}>
                    {dept.avgAttendance}%
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${dept.avgAttendance}%`, background: dept.avgAttendance >= 80 ? "#10b981" : dept.avgAttendance >= 75 ? "#eab308" : "#ef4444" }} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Subject-wise (current sem sample) */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          className="bg-white shadow-sm border border-gray-100 border border-gray-100 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <CalendarCheck className="w-5 h-5 text-hitech-saffron" />
            <h2 className="text-base font-heading font-bold text-hitech-navy">CSE Sem 5 — Subject Breakdown</h2>
          </div>
          <div className="space-y-4">
            {attendanceData.map((r) => (
              <div key={r.code}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-gray-500 truncate mr-2">{r.subject}</span>
                  <span className={`font-bold shrink-0 ${r.percentage >= 75 ? "text-emerald-400" : "text-red-400"}`}>{r.percentage}%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${r.percentage}%`, background: r.percentage >= 75 ? "#10b981" : "#ef4444" }} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Low attendance alerts */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
        className="bg-white shadow-sm border border-gray-100 border border-gray-100 rounded-2xl overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-400" />
          <h2 className="text-base font-heading font-bold text-hitech-navy">Low Attendance Alerts</h2>
          <span className="ml-auto px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 text-xs font-bold border border-red-500/20">312 students</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {["Student", "Roll No.", "Department", "Subject", "Attendance", "Action"].map((h) => (
                  <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {lowAttendanceStudents.map((s) => (
                <tr key={s.id} className="hover:bg-white/[0.03]">
                  <td className="py-3.5 px-4 text-hitech-navy font-semibold">{s.name}</td>
                  <td className="py-3.5 px-4 text-gray-500 font-mono text-xs">{s.id}</td>
                  <td className="py-3.5 px-4"><span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-300 text-xs font-bold">{s.dept}</span></td>
                  <td className="py-3.5 px-4 text-gray-500 text-xs">{s.subject}</td>
                  <td className="py-3.5 px-4"><span className="font-bold text-red-400">{s.attendance}%</span></td>
                  <td className="py-3.5 px-4">
                    <button className="px-3 py-1.5 rounded-lg bg-hitech-saffron/10 border border-hitech-saffron/20 text-hitech-saffron text-xs font-semibold hover:bg-hitech-saffron/20 transition-colors">
                      Send Alert
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
