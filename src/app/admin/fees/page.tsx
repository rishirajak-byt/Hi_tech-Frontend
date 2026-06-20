"use client";

import { motion } from "framer-motion";
import { IndianRupee, Send, Download, CheckCircle2, Clock, XCircle, AlertCircle } from "lucide-react";
import { feeCollectionSummary, departmentStats } from "@/data/admin";

const feeRecords = [
  { id: "2023CSE047", name: "Rahul Kumar Sharma", dept: "CSE", tuition: "Paid", hostel: "Pending", total: 67500, paid: 42500, balance: 25000 },
  { id: "2022ECE022", name: "Priya Sharma", dept: "ECE", tuition: "Paid", hostel: "Paid", total: 67500, paid: 67500, balance: 0 },
  { id: "2023ME015", name: "Arjun Mehta", dept: "ME", tuition: "Partial", hostel: "Pending", total: 67500, paid: 30000, balance: 37500 },
  { id: "2024IT031", name: "Ananya Singh", dept: "IT", tuition: "Paid", hostel: "Paid", total: 67500, paid: 67500, balance: 0 },
  { id: "2023CSE012", name: "Vikram Patel", dept: "CSE", tuition: "Pending", hostel: "Pending", total: 67500, paid: 0, balance: 67500 },
];

const paidCount = feeCollectionSummary.paidStudents;
const pendingCount = feeCollectionSummary.pendingStudents;
const feePercent = Math.round((feeCollectionSummary.totalCollected / feeCollectionSummary.totalExpected) * 100);

export default function FeesPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-hitech-navy">Fee Management</h1>
          <p className="text-gray-500 mt-1">Semester 5 · Academic Year 2025–26</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-hitech-saffron/10 border border-hitech-saffron/20 text-hitech-saffron text-sm font-semibold hover:bg-hitech-saffron/20 transition-colors">
            <Send className="w-4 h-4" /> Send Reminders
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-hitech-saffron text-hitech-navy text-sm font-bold hover:bg-yellow-400 transition-colors">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>

      {/* Collection overview */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Donut */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-white shadow-sm border border-gray-100 border border-gray-100 rounded-2xl p-6 flex flex-col items-center">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-5">Collection Rate</h2>
          <div className="relative">
            <svg className="w-36 h-36 -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="12" />
              <circle cx="60" cy="60" r="50" fill="none" stroke="#F4A300" strokeWidth="12"
                strokeDasharray={`${(feePercent / 100) * 314} 314`} strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-3xl font-heading font-bold text-hitech-navy">{feePercent}%</p>
              <p className="text-[10px] text-gray-500">Collected</p>
            </div>
          </div>
          <div className="w-full mt-5 space-y-2">
            {[
              { label: "Collected", value: `₹${(feeCollectionSummary.totalCollected / 10000000).toFixed(2)} Cr`, color: "bg-emerald-400" },
              { label: "Pending", value: `₹${(feeCollectionSummary.totalPending / 10000000).toFixed(2)} Cr`, color: "bg-red-400" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2"><span className={`w-2 h-2 rounded-full ${item.color}`} /><span className="text-xs text-gray-500">{item.label}</span></div>
                <span className="text-xs font-bold text-gray-600">{item.value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Student status */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="bg-white shadow-sm border border-gray-100 border border-gray-100 rounded-2xl p-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-5">Student Fee Status</h2>
          <div className="space-y-4">
            {[
              { label: "Fully Paid", value: paidCount.toLocaleString(), icon: CheckCircle2, color: "text-emerald-400 bg-emerald-500/10" },
              { label: "Partial", value: feeCollectionSummary.partialStudents, icon: Clock, color: "text-yellow-400 bg-yellow-500/10" },
              { label: "Pending", value: pendingCount.toLocaleString(), icon: XCircle, color: "text-red-400 bg-red-500/10" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-3 p-3 rounded-xl bg-white shadow-sm border border-gray-100">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${s.color}`}><s.icon className="w-4 h-4" /></div>
                <div className="flex-1"><p className="text-hitech-navy font-bold">{s.value}</p><p className="text-xs text-gray-500">{s.label}</p></div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Dept-wise */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-white shadow-sm border border-gray-100 border border-gray-100 rounded-2xl p-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-5">Dept. Pending Students</h2>
          <div className="space-y-3">
            {departmentStats.slice(0, 6).map((d) => {
              const pending = Math.round(d.students * 0.22);
              return (
                <div key={d.code} className="flex items-center gap-3">
                  <span className="w-8 text-xs font-bold" style={{ color: d.color }}>{d.code}</span>
                  <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${(pending / d.students) * 100}%`, background: d.color }} />
                  </div>
                  <span className="text-xs text-gray-500 w-8 text-right">{pending}</span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Fee records table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
        className="bg-white shadow-sm border border-gray-100 border border-gray-100 rounded-2xl overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center gap-2">
          <IndianRupee className="w-5 h-5 text-hitech-saffron" />
          <h2 className="text-base font-heading font-bold text-hitech-navy">Student Fee Records</h2>
          <span className="ml-2 text-xs text-gray-500">(Sample — 5 of 5,248)</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {["Roll No.", "Name", "Dept", "Tuition", "Hostel", "Total", "Paid", "Balance", "Action"].map((h) => (
                  <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {feeRecords.map((r) => (
                <tr key={r.id} className="hover:bg-white/[0.03]">
                  <td className="py-3.5 px-4 text-gray-500 font-mono text-xs">{r.id}</td>
                  <td className="py-3.5 px-4 text-hitech-navy font-semibold whitespace-nowrap">{r.name}</td>
                  <td className="py-3.5 px-4"><span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-300 text-xs font-bold">{r.dept}</span></td>
                  {[r.tuition, r.hostel].map((status, i) => (
                    <td key={i} className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${status === "Paid" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : status === "Partial" ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"}`}>
                        {status}
                      </span>
                    </td>
                  ))}
                  <td className="py-3.5 px-4 text-gray-500 text-xs">₹{r.total.toLocaleString("en-IN")}</td>
                  <td className="py-3.5 px-4 text-emerald-400 font-semibold">₹{r.paid.toLocaleString("en-IN")}</td>
                  <td className="py-3.5 px-4"><span className={r.balance > 0 ? "text-red-400 font-bold" : "text-emerald-400 font-bold"}>₹{r.balance.toLocaleString("en-IN")}</span></td>
                  <td className="py-3.5 px-4">
                    {r.balance > 0 && (
                      <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-hitech-saffron/10 border border-hitech-saffron/20 text-hitech-saffron text-xs font-semibold hover:bg-hitech-saffron/20 transition-colors">
                        <Send className="w-3 h-3" /> Remind
                      </button>
                    )}
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
