"use client";

import { motion } from "framer-motion";
import { Building2, Users, GraduationCap, TrendingUp, CalendarCheck } from "lucide-react";
import { departmentStats } from "@/data/admin";

const hodMap: Record<string, string> = {
  CSE: "Dr. Sunita Rao", ECE: "Dr. Kavita Nair", ME: "Prof. Rajesh Kumar",
  CE: "Dr. Anil Sharma", "AI&DS": "Dr. Pooja Sharma", IT: "Prof. Manish Gupta",
  EE: "Dr. Vikram Joshi", CHE: "Dr. Renu Kapoor",
};

export default function DepartmentsPage() {
  const totalStudents = departmentStats.reduce((s, d) => s + d.students, 0);
  const totalFaculty = departmentStats.reduce((s, d) => s + d.faculty, 0);
  const avgCgpa = (departmentStats.reduce((s, d) => s + d.avgCgpa, 0) / departmentStats.length).toFixed(2);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-hitech-navy">Departments</h1>
        <p className="text-gray-500 mt-1">{departmentStats.length} departments · {totalStudents.toLocaleString()} students · {totalFaculty} faculty</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Departments", value: departmentStats.length, icon: Building2, c: "text-blue-400 bg-blue-500/10" },
          { label: "Total Students", value: totalStudents.toLocaleString(), icon: Users, c: "text-emerald-400 bg-emerald-500/10" },
          { label: "Total Faculty", value: totalFaculty, icon: GraduationCap, c: "text-violet-400 bg-violet-500/10" },
          { label: "Avg. CGPA", value: avgCgpa, icon: TrendingUp, c: "text-yellow-400 bg-yellow-500/10" },
        ].map((c, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className="bg-white shadow-sm border border-gray-100 border border-gray-100 rounded-2xl p-4">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${c.c}`}><c.icon className="w-4 h-4" /></div>
            <p className="text-xl font-heading font-bold text-hitech-navy">{c.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{c.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Department cards */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {departmentStats.map((dept, i) => (
          <motion.div key={dept.code} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.07 }}
            className="bg-white shadow-sm border border-gray-100 border border-gray-100 rounded-2xl p-6 hover:border-white/20 transition-all group">
            {/* Header */}
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold text-hitech-navy"
                  style={{ background: `${dept.color}22`, border: `1px solid ${dept.color}44` }}>
                  {dept.code.slice(0, 2)}
                </div>
                <div>
                  <h3 className="font-heading font-bold text-hitech-navy text-sm">{dept.code}</h3>
                  <p className="text-[11px] text-gray-500 leading-tight max-w-[160px]">{dept.name}</p>
                </div>
              </div>
              <div className="w-3 h-3 rounded-full shrink-0 mt-1" style={{ background: dept.color }} />
            </div>

            {/* HOD */}
            <p className="text-xs text-gray-500 mb-4">
              <span className="text-gray-600 font-medium">HOD: </span>
              <span className="text-gray-600">{hodMap[dept.code] ?? "—"}</span>
            </p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              {[
                { label: "Students", value: dept.students.toLocaleString(), icon: Users },
                { label: "Faculty", value: dept.faculty, icon: GraduationCap },
                { label: "Avg CGPA", value: dept.avgCgpa, icon: TrendingUp },
                { label: "Attendance", value: `${dept.avgAttendance}%`, icon: CalendarCheck },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-2 p-2.5 rounded-xl bg-white shadow-sm border border-gray-100">
                  <s.icon className="w-3.5 h-3.5 shrink-0" style={{ color: dept.color }} />
                  <div>
                    <p className="text-xs font-bold text-hitech-navy">{s.value}</p>
                    <p className="text-[10px] text-gray-600">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Attendance bar */}
            <div>
              <div className="flex justify-between text-[11px] mb-1.5">
                <span className="text-gray-600">Avg Attendance</span>
                <span className="font-bold" style={{ color: dept.color }}>{dept.avgAttendance}%</span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-700" style={{ width: `${dept.avgAttendance}%`, background: dept.color }} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
