"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FolderOpen,
  Download,
  Clock,
  CheckCircle2,
  Loader2,
  XCircle,
  ChevronRight,
  FileText,
  Plus,
  X,
  AlertCircle,
} from "lucide-react";
import {
  documentRequests,
  availableDocuments,
  DocumentRequest,
} from "@/data/students";

/* ─── STATUS CONFIG ─── */
const statusConfig: Record<DocumentRequest["status"], { color: string; bg: string; icon: React.ElementType<{ className?: string }>; label: string }> = {
  Ready: { color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200", icon: CheckCircle2, label: "Ready for Download" },
  Processing: { color: "text-blue-600", bg: "bg-blue-50 border-blue-200", icon: Loader2, label: "Processing" },
  Pending: { color: "text-yellow-600", bg: "bg-yellow-50 border-yellow-200", icon: Clock, label: "Pending Review" },
  Rejected: { color: "text-red-600", bg: "bg-red-50 border-red-200", icon: XCircle, label: "Rejected" },
};

/* ─── REQUEST MODAL ─── */
function RequestModal({
  doc,
  onClose,
}: {
  doc: typeof availableDocuments[0];
  onClose: () => void;
}) {
  const [purpose, setPurpose] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!purpose.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-xl w-full max-w-md"
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{doc.icon}</span>
            <div>
              <h3 className="font-heading font-bold text-gray-900">{doc.name}</h3>
              <p className="text-xs text-gray-400">Turnaround: {doc.turnaround}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Purpose / Reason *</label>
              <textarea
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                rows={3}
                placeholder="e.g. Bank loan application, Job application at XYZ Corp"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-hitech-navy/30 focus:border-hitech-navy resize-none"
              />
            </div>
            <div className="flex items-start gap-2 p-3 rounded-xl bg-yellow-50 border border-yellow-100">
              <AlertCircle className="w-4 h-4 text-yellow-600 shrink-0 mt-0.5" />
              <p className="text-xs text-yellow-700">
                Please ensure all your dues are cleared before requesting official documents.
                Requests with pending dues may be delayed.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!purpose.trim()}
                className="flex-1 py-2.5 rounded-xl bg-hitech-navy text-white text-sm font-semibold hover:bg-hitech-navy-dark transition-colors disabled:opacity-50"
              >
                Submit Request
              </button>
            </div>
          </form>
        ) : (
          <div className="p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-emerald-500" />
            </div>
            <h3 className="font-heading font-bold text-gray-900 mb-2">Request Submitted!</h3>
            <p className="text-sm text-gray-500 mb-6">
              Your request for <strong>{doc.name}</strong> has been submitted successfully.
              Expected processing time: <strong>{doc.turnaround}</strong>.
            </p>
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-hitech-navy text-white text-sm font-semibold hover:bg-hitech-navy-dark transition-colors"
            >
              Done
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   DOCUMENTS PAGE
   ═══════════════════════════════════════════════ */
export default function DocumentsPage() {
  const [selectedDoc, setSelectedDoc] = useState<typeof availableDocuments[0] | null>(null);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* ═══ HEADER ═══ */}
      <div>
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-gray-900">Documents</h1>
        <p className="text-gray-500 mt-1">Request, track, and download official documents</p>
      </div>

      {/* ═══ MY REQUESTS ═══ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderOpen className="w-5 h-5 text-hitech-navy" />
            <h2 className="text-lg font-heading font-bold text-gray-900">My Requests</h2>
          </div>
          <span className="text-xs text-gray-400">{documentRequests.length} request(s)</span>
        </div>

        {documentRequests.length === 0 ? (
          <div className="py-12 text-center">
            <FileText className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-400 text-sm">No document requests yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {documentRequests.map((req, idx) => {
              const cfg = statusConfig[req.status];
              const StatusIcon = cfg.icon;
              return (
                <motion.div
                  key={req.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + idx * 0.07 }}
                  className={`flex flex-col sm:flex-row sm:items-center gap-4 p-5 border-l-4 ${cfg.bg} border-l-current`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-sm font-bold ${cfg.color}`}>{req.type}</span>
                      <span className="text-xs text-gray-400">#{req.id}</span>
                    </div>
                    <p className="text-xs text-gray-500">Purpose: {req.purpose}</p>
                    {req.remarks && (
                      <p className="text-xs text-gray-400 mt-1 italic">{req.remarks}</p>
                    )}
                  </div>
                  <div className="text-sm text-gray-400 shrink-0">
                    <Clock className="w-3 h-3 inline mr-1" />
                    {req.requestedOn}
                  </div>
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${cfg.color} bg-white/80 shrink-0`}>
                    <StatusIcon className={`w-3.5 h-3.5 ${req.status === "Processing" ? "animate-spin" : ""}`} />
                    {cfg.label}
                  </div>
                  {req.downloadable && (
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-hitech-navy text-white text-xs font-semibold hover:bg-hitech-navy-dark transition-colors shrink-0">
                      <Download className="w-3.5 h-3.5" />
                      Download
                    </button>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>

      {/* ═══ AVAILABLE DOCUMENTS ═══ */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-hitech-navy" />
          <h2 className="text-lg font-heading font-bold text-gray-900">Available Documents</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {availableDocuments.map((doc, idx) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + idx * 0.06 }}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:border-hitech-navy/20 hover:shadow-md transition-all group card-hover"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-hitech-surface flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform">
                  {doc.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900">{doc.name}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{doc.desc}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-[11px] text-gray-400">
                      <Clock className="w-3 h-3 inline mr-0.5" />
                      {doc.turnaround}
                    </span>
                    <span className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${doc.availability === "Instant"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-blue-50 text-blue-600"
                      }`}>
                      {doc.availability}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedDoc(doc)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-hitech-navy text-white text-xs font-semibold hover:bg-hitech-navy-dark transition-colors shrink-0"
                >
                  <Plus className="w-3 h-3" />
                  Request
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ═══ QUICK DOWNLOADS ═══ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-gradient-to-br from-hitech-navy to-hitech-navy-dark rounded-2xl p-6"
      >
        <h2 className="text-lg font-heading font-bold text-white mb-4">Instant Downloads</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { label: "Fee Receipt — Sem 5", sub: "Semester 5, 2025–26" },
            { label: "Attendance Report", sub: "Current semester, PDF" },
            { label: "Sem 4 Marksheet", sub: "Official mark statement" },
          ].map((item, i) => (
            <button
              key={i}
              className="flex items-center gap-3 p-3 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-colors text-left group"
            >
              <Download className="w-4 h-4 text-hitech-saffron shrink-0 group-hover:scale-110 transition-transform" />
              <div>
                <p className="text-sm font-semibold text-white">{item.label}</p>
                <p className="text-xs text-gray-300">{item.sub}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 ml-auto" />
            </button>
          ))}
        </div>
      </motion.div>

      {/* ═══ MODAL ═══ */}
      <AnimatePresence>
        {selectedDoc && (
          <RequestModal doc={selectedDoc} onClose={() => setSelectedDoc(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
