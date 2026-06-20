"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Search,
  Filter,
  Download,
  Eye,
  MoreVertical,
  TrendingUp,
  UserCheck,
  UserX,
  GraduationCap,
} from "lucide-react";
import { departmentStats } from "@/data/admin";

const allStudents = [
  { id: "2023CSE047", name: "Rahul Kumar Sharma", dept: "CSE", sem: 5, cgpa: 7.84, attendance: 78, status: "Active", batch: "2023-27" },
  { id: "2022ECE022", name: "Priya Sharma", dept: "ECE", sem: 7, cgpa: 8.20, attendance: 85, status: "Active", batch: "2022-26" },
  { id: "2023ME015", name: "Arjun Mehta", dept: "ME", sem: 5, cgpa: 7.10, attendance: 72, status: "Active", batch: "2023-27" },
  { id: "2024IT031", name: "Ananya Singh", dept: "IT", sem: 3, cgpa: 8.55, attendance: 91, status: "Active", batch: "2024-28" },
  { id: "2023CSE012", name: "Vikram Patel", dept: "CSE", sem: 5, cgpa: 6.90, attendance: 68, status: "Warning", batch: "2023-27" },
  { id: "2022CE008", name: "Sneha Reddy", dept: "CE", sem: 7, cgpa: 7.65, attendance: 82, status: "Active", batch: "2022-26" },
  { id: "2024AIDS05", name: "Rohan Gupta", dept: "AI&DS", sem: 3, cgpa: 9.10, attendance: 95, status: "Active", batch: "2024-28" },
  { id: "2023ECE031", name: "Kavya Nair", dept: "ECE", sem: 5, cgpa: 7.45, attendance: 74, status: "Active", batch: "2023-27" },
  { id: "2022CSE099", name: "Amit Verma", dept: "CSE", sem: 7, cgpa: 7.80, attendance: 80, status: "Active", batch: "2022-26" },
  { id: "2024ME021", name: "Pooja Iyer", dept: "ME", sem: 3, cgpa: 7.20, attendance: 76, status: "Active", batch: "2024-28" },
];

const deptList = ["All", ...Array.from(new Set(allStudents.map((s) => s.dept)))];

export default function StudentsPage() {
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = allStudents.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase());
    const matchDept = deptFilter === "All" || s.dept === deptFilter;
    const matchStatus = statusFilter === "All" || s.status === statusFilter;
    return matchSearch && matchDept && matchStatus;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-hitech-navy">Students</h1>
          <p className="text-gray-500 mt-1">Total {allStudents.length} students shown — full list in production</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-hitech-saffron text-hitech-navy text-sm font-bold hover:bg-yellow-400 transition-colors shrink-0">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Students", value: "5,248", icon: Users, color: "text-blue-400 bg-blue-500/10" },
          { label: "Active", value: "5,102", icon: UserCheck, color: "text-emerald-400 bg-emerald-500/10" },
          { label: "Low Attendance", value: "312", icon: UserX, color: "text-red-400 bg-red-500/10" },
          { label: "Avg. CGPA", value: "7.84", icon: TrendingUp, color: "text-violet-400 bg-violet-500/10" },
        ].map((c, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className="bg-white shadow-sm border border-gray-100 border border-gray-100 rounded-2xl p-4">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${c.color}`}>
              <c.icon className="w-4.5 h-4.5" style={{ width: 18, height: 18 }} />
            </div>
            <p className="text-xl font-heading font-bold text-hitech-navy">{c.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{c.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Department distribution */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="bg-white shadow-sm border border-gray-100 border border-gray-100 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-5">
          <GraduationCap className="w-5 h-5 text-hitech-saffron" />
          <h2 className="text-base font-heading font-bold text-hitech-navy">Department Distribution</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {departmentStats.slice(0, 8).map((dept) => (
            <div key={dept.code} className="flex items-center gap-3 p-3 rounded-xl bg-white shadow-sm border border-gray-100">
              <span className="w-3 h-3 rounded-full shrink-0" style={{ background: dept.color }} />
              <div className="min-w-0">
                <p className="text-xs font-bold text-hitech-navy">{dept.code}</p>
                <p className="text-[11px] text-gray-500">{dept.students} students</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Filters + Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="bg-white shadow-sm border border-gray-100 border border-gray-100 rounded-2xl overflow-hidden">
        {/* Search & filters */}
        <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or roll number..."
              className="w-full pl-10 pr-4 py-2.5 bg-white shadow-sm border border-gray-100 border border-gray-100 rounded-xl text-sm text-hitech-navy placeholder-gray-600 focus:outline-none focus:border-hitech-saffron/40"
            />
          </div>
          <div className="flex gap-2">
            <select value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)}
              className="px-3 py-2.5 bg-white shadow-sm border border-gray-100 border border-gray-100 rounded-xl text-sm text-gray-600 focus:outline-none focus:border-hitech-saffron/40">
              {deptList.map((d) => <option key={d} value={d} className="bg-gray-900">{d}</option>)}
            </select>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2.5 bg-white shadow-sm border border-gray-100 border border-gray-100 rounded-xl text-sm text-gray-600 focus:outline-none focus:border-hitech-saffron/40">
              {["All", "Active", "Warning"].map((s) => <option key={s} value={s} className="bg-gray-900">{s}</option>)}
            </select>
            <button className="px-3 py-2.5 bg-white shadow-sm border border-gray-100 border border-gray-100 rounded-xl hover:bg-gray-100 transition-colors">
              <Filter className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {["Roll No.", "Name", "Dept", "Sem", "CGPA", "Attendance", "Batch", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((s, i) => (
                <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3.5 px-4 text-gray-500 font-mono text-xs">{s.id}</td>
                  <td className="py-3.5 px-4 text-hitech-navy font-semibold whitespace-nowrap">{s.name}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100 text-[11px] font-bold">{s.dept}</span>
                  </td>
                  <td className="py-3.5 px-4 text-gray-600">{s.sem}</td>
                  <td className="py-3.5 px-4">
                    <span className={`font-bold ${s.cgpa >= 8 ? "text-emerald-600" : s.cgpa >= 7 ? "text-yellow-600" : "text-red-600"}`}>{s.cgpa}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${s.attendance >= 75 ? "bg-emerald-500" : "bg-red-500"}`} style={{ width: `${s.attendance}%` }} />
                      </div>
                      <span className={`text-xs font-bold ${s.attendance >= 75 ? "text-gray-600" : "text-red-400"}`}>{s.attendance}%</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-gray-500 text-xs">{s.batch}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${s.status === "Active" ? "bg-emerald-50 text-emerald-600 border border-emerald-200" : "bg-yellow-50 text-yellow-600 border border-yellow-200"}`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5">
                      <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                        <Eye className="w-3.5 h-3.5 text-gray-500" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                        <MoreVertical className="w-3.5 h-3.5 text-gray-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between">
          <p className="text-xs text-gray-600">Showing {filtered.length} of {allStudents.length} records (demo)</p>
          <div className="flex gap-1">
            {[1, 2, 3].map((p) => (
              <button key={p} className={`w-8 h-8 rounded-lg text-xs font-semibold transition-colors ${p === 1 ? "bg-hitech-saffron text-hitech-navy" : "bg-white shadow-sm border border-gray-100 text-gray-500 hover:bg-gray-100"}`}>{p}</button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
