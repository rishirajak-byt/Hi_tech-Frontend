"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Search, Plus, Mail, BookOpen, Users, MoreVertical } from "lucide-react";
import { facultyMembers } from "@/data/admin";

const deptColors: Record<string, string> = {
  CSE: "#1A3C6E", ECE: "#F4A300", ME: "#C8102E", CE: "#059669",
  "AI&DS": "#7C3AED", IT: "#0891B2", EE: "#D97706",
};

export default function FacultyPage() {
  const [search, setSearch] = useState("");
  const [dept, setDept] = useState("All");
  const depts = ["All", ...Array.from(new Set(facultyMembers.map((f) => f.department)))];

  const filtered = facultyMembers.filter((f) => {
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase()) || f.email.toLowerCase().includes(search.toLowerCase());
    const matchDept = dept === "All" || f.department === dept;
    return matchSearch && matchDept;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-hitech-navy">Faculty</h1>
          <p className="text-gray-500 mt-1">312 faculty members across 14 departments</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-hitech-saffron text-hitech-navy text-sm font-bold hover:bg-yellow-400 transition-colors shrink-0">
          <Plus className="w-4 h-4" /> Add Faculty
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Faculty", value: "312", icon: GraduationCap, c: "text-blue-400 bg-blue-500/10" },
          { label: "Professors", value: "88", icon: BookOpen, c: "text-violet-400 bg-violet-500/10" },
          { label: "Assoc. Professors", value: "124", icon: GraduationCap, c: "text-yellow-400 bg-yellow-500/10" },
          { label: "Asst. Professors", value: "100", icon: Users, c: "text-emerald-400 bg-emerald-500/10" },
        ].map((c, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className="bg-white shadow-sm border border-gray-100 border border-gray-100 rounded-2xl p-4">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${c.c}`}><c.icon className="w-4 h-4" /></div>
            <p className="text-xl font-heading font-bold text-hitech-navy">{c.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{c.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="bg-white shadow-sm border border-gray-100 border border-gray-100 rounded-2xl overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search faculty..."
              className="w-full pl-10 pr-4 py-2.5 bg-white shadow-sm border border-gray-100 border border-gray-100 rounded-xl text-sm text-hitech-navy placeholder-gray-600 focus:outline-none focus:border-hitech-saffron/40" />
          </div>
          <select value={dept} onChange={(e) => setDept(e.target.value)}
            className="px-3 py-2.5 bg-white shadow-sm border border-gray-100 border border-gray-100 rounded-xl text-sm text-gray-600 focus:outline-none">
            {depts.map((d) => <option key={d} value={d} className="bg-gray-900">{d}</option>)}
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {["Faculty Member", "Department", "Designation", "Courses", "Students", "Actions"].map((h) => (
                  <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((f) => (
                <tr key={f.id} className="hover:bg-white/[0.03] transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold shrink-0"
                        style={{ background: `${deptColors[f.department] ?? "#1A3C6E"}22`, color: deptColors[f.department] ?? "#F4A300" }}>
                        {f.avatar}
                      </div>
                      <div>
                        <p className="text-hitech-navy font-semibold">{f.name}</p>
                        <p className="text-xs text-gray-500 flex items-center gap-1"><Mail className="w-3 h-3" />{f.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-bold" style={{ background: `${deptColors[f.department]}22`, color: deptColors[f.department] ?? "#F4A300" }}>
                      {f.department}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-600 text-xs">{f.designation}</td>
                  <td className="py-4 px-4 text-center">
                    <span className="px-2 py-1 rounded-lg bg-blue-500/10 text-blue-300 text-xs font-bold">{f.courses}</span>
                  </td>
                  <td className="py-4 px-4 text-gray-600 text-center">{f.students}</td>
                  <td className="py-4 px-4">
                    <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"><MoreVertical className="w-3.5 h-3.5 text-gray-500" /></button>
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
