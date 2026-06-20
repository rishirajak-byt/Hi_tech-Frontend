"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FolderOpen, CheckCircle2, XCircle, Clock, FileText } from "lucide-react";

type DocStatus = "Ready" | "Processing" | "Pending" | "Rejected";

interface DocRequest { id: string; student: string; roll: string; type: string; purpose: string; date: string; status: DocStatus; }

const docRequests: DocRequest[] = [
  { id: "D001", student: "Rahul Kumar Sharma", roll: "2023CSE047", type: "Bonafide Certificate", purpose: "Bank Loan", date: "Apr 3, 2026", status: "Ready" },
  { id: "D002", student: "Priya Sharma", roll: "2022ECE022", type: "Character Certificate", purpose: "Job Application – Infosys", date: "Apr 10, 2026", status: "Processing" },
  { id: "D003", student: "Arjun Mehta", roll: "2023ME015", type: "NOC", purpose: "Passport Application", date: "Apr 18, 2026", status: "Pending" },
  { id: "D004", student: "Ananya Singh", roll: "2024IT031", type: "Fee Receipt", purpose: "Scholarship Form", date: "Apr 20, 2026", status: "Ready" },
  { id: "D005", student: "Vikram Patel", roll: "2023CSE012", type: "Bonafide Certificate", purpose: "Internship Application", date: "Apr 22, 2026", status: "Pending" },
];

const statusCfg: Record<DocStatus, { color: string; bg: string; label: string }> = {
  Ready: { color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20", label: "Ready" },
  Processing: { color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20", label: "Processing" },
  Pending: { color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20", label: "Pending" },
  Rejected: { color: "text-red-400", bg: "bg-red-500/10 border-red-500/20", label: "Rejected" },
};

export default function AdminDocumentsPage() {
  const [requests, setRequests] = useState(docRequests);

  const approve = (id: string) => setRequests((prev) => prev.map((r) => r.id === id ? { ...r, status: "Ready" as const } : r));
  const reject = (id: string) => setRequests((prev) => prev.map((r) => r.id === id ? { ...r, status: "Rejected" as const } : r));

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-hitech-navy">Documents</h1>
        <p className="text-gray-500 mt-1">Review and approve student document requests</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Requests", value: docRequests.length, icon: FileText, c: "text-blue-400 bg-blue-500/10" },
          { label: "Ready", value: docRequests.filter(r => r.status === "Ready").length, icon: CheckCircle2, c: "text-emerald-400 bg-emerald-500/10" },
          { label: "Pending", value: docRequests.filter(r => r.status === "Pending").length, icon: Clock, c: "text-yellow-400 bg-yellow-500/10" },
          { label: "Processing", value: docRequests.filter(r => r.status === "Processing").length, icon: FolderOpen, c: "text-violet-400 bg-violet-500/10" },
        ].map((c, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className="bg-white shadow-sm border border-gray-100 border border-gray-100 rounded-2xl p-4">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${c.c}`}><c.icon className="w-4 h-4" /></div>
            <p className="text-xl font-heading font-bold text-hitech-navy">{c.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{c.label}</p>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="bg-white shadow-sm border border-gray-100 border border-gray-100 rounded-2xl overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center gap-2">
          <FolderOpen className="w-5 h-5 text-hitech-saffron" />
          <h2 className="text-base font-heading font-bold text-hitech-navy">Document Requests Queue</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {requests.map((req, i) => {
            const cfg = statusCfg[req.status];
            return (
              <motion.div key={req.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 + i * 0.06 }}
                className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 hover:bg-white/[0.03] transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-hitech-navy font-semibold">{req.student}</span>
                    <span className="text-gray-600 text-xs font-mono">{req.roll}</span>
                  </div>
                  <p className="text-sm text-gray-600 font-medium">{req.type}</p>
                  <p className="text-xs text-gray-500 mt-0.5">Purpose: {req.purpose} · {req.date}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${cfg.bg} ${cfg.color}`}>{cfg.label}</span>
                  {req.status === "Pending" && (
                    <>
                      <button onClick={() => approve(req.id)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold hover:bg-emerald-500/20 transition-colors">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                      </button>
                      <button onClick={() => reject(req.id)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold hover:bg-red-500/20 transition-colors">
                        <XCircle className="w-3.5 h-3.5" /> Reject
                      </button>
                    </>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
