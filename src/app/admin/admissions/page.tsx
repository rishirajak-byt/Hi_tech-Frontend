"use client";

import { motion } from "framer-motion";
import { Users, CheckCircle2, Clock, XCircle, TrendingUp, ChevronRight } from "lucide-react";
import { admissionFunnel, departmentStats } from "@/data/admin";

const applications = [
  { id: "APP001", name: "Aditya Singh", state: "Delhi", rank: 12450, program: "CSE", status: "Confirmed" as const, date: "Apr 15, 2026" },
  { id: "APP002", name: "Meera Joshi", state: "UP", rank: 18200, program: "ECE", status: "Counselling" as const, date: "Apr 18, 2026" },
  { id: "APP003", name: "Siddharth Rao", state: "Maharashtra", rank: 21000, program: "AI&DS", status: "Document Pending" as const, date: "Apr 20, 2026" },
  { id: "APP004", name: "Pooja Bansal", state: "Rajasthan", rank: 15800, program: "IT", status: "Confirmed" as const, date: "Apr 12, 2026" },
  { id: "APP005", name: "Karan Malhotra", state: "Punjab", rank: 28000, program: "ME", status: "Waitlist" as const, date: "Apr 22, 2026" },
];

type AppStatus = "Confirmed" | "Counselling" | "Document Pending" | "Waitlist" | "Rejected";
const statusCfg: Record<AppStatus, { color: string; bg: string }> = {
  Confirmed: { color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
  Counselling: { color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
  "Document Pending": { color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20" },
  Waitlist: { color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20" },
  Rejected: { color: "text-red-400", bg: "bg-red-500/10 border-red-500/20" },
};

export default function AdmissionsPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-hitech-navy">Admissions</h1>
        <p className="text-gray-500 mt-1">Academic Year 2026–27 · B.Tech All Programs</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Applications", value: "6,820", icon: Users, c: "text-blue-400 bg-blue-500/10" },
          { label: "Confirmed", value: "1,248", icon: CheckCircle2, c: "text-emerald-400 bg-emerald-500/10" },
          { label: "In Progress", value: "2,190", icon: Clock, c: "text-yellow-400 bg-yellow-500/10" },
          { label: "Conversion Rate", value: "18.3%", icon: TrendingUp, c: "text-violet-400 bg-violet-500/10" },
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
        {/* Funnel */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-white shadow-sm border border-gray-100 border border-gray-100 rounded-2xl p-6">
          <h2 className="text-base font-heading font-bold text-hitech-navy mb-5">Admission Funnel</h2>
          <div className="space-y-3">
            {admissionFunnel.map((stage, i) => {
              const pct = Math.round((stage.count / admissionFunnel[0].count) * 100);
              return (
                <div key={i}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-gray-500">{stage.stage}</span>
                    <span className="font-bold text-gray-600">{stage.count.toLocaleString()} <span className="text-gray-600">({pct}%)</span></span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-hitech-saffron to-yellow-400"
                      style={{ width: `${pct}%`, opacity: 0.4 + 0.6 * (i / admissionFunnel.length) }} />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Dept seat availability */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          className="bg-white shadow-sm border border-gray-100 border border-gray-100 rounded-2xl p-6">
          <h2 className="text-base font-heading font-bold text-hitech-navy mb-5">2026-27 Seat Allocation</h2>
          <div className="space-y-3">
            {departmentStats.slice(0, 6).map((dept) => {
              const seats = Math.round(dept.students / 4);
              const filled = Math.round(seats * 0.82);
              return (
                <div key={dept.code} className="flex items-center gap-3">
                  <span className="text-xs font-bold w-12 shrink-0" style={{ color: dept.color }}>{dept.code}</span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-700" style={{ width: `${(filled / seats) * 100}%`, background: dept.color }} />
                  </div>
                  <span className="text-xs text-gray-500 shrink-0">{filled}/{seats}</span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Applications table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
        className="bg-white shadow-sm border border-gray-100 border border-gray-100 rounded-2xl overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center gap-2">
          <Users className="w-5 h-5 text-hitech-saffron" />
          <h2 className="text-base font-heading font-bold text-hitech-navy">Recent Applications</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {["App ID", "Applicant", "State", "JEE Rank", "Program", "Date", "Status", "Action"].map((h) => (
                  <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {applications.map((app) => {
                const cfg = statusCfg[app.status];
                return (
                  <tr key={app.id} className="hover:bg-white/[0.03]">
                    <td className="py-3.5 px-4 text-gray-500 font-mono text-xs">{app.id}</td>
                    <td className="py-3.5 px-4 text-hitech-navy font-semibold">{app.name}</td>
                    <td className="py-3.5 px-4 text-gray-500 text-xs">{app.state}</td>
                    <td className="py-3.5 px-4 text-gray-600">{app.rank.toLocaleString()}</td>
                    <td className="py-3.5 px-4"><span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-300 text-xs font-bold">{app.program}</span></td>
                    <td className="py-3.5 px-4 text-gray-500 text-xs">{app.date}</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold border ${cfg.bg} ${cfg.color}`}>{app.status}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <button className="flex items-center gap-1 text-gray-500 hover:text-hitech-saffron transition-colors text-xs">
                        Review <ChevronRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
