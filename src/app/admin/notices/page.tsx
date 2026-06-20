"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Plus, X, Users, BookOpen, IndianRupee, Megaphone, Send } from "lucide-react";

const initialNotices = [
  { id: "N001", title: "Independence Day Holiday", type: "Holiday", audience: "All", date: "Apr 10, 2026", content: "College will remain closed on 15 August 2026 on account of Independence Day.", published: true },
  { id: "N002", title: "CIA-I Exam Schedule Released", type: "Exam", audience: "Students", date: "Apr 12, 2026", content: "CIA-I examinations are scheduled from 12 May – 16 May 2026. Download the timetable from the portal.", published: true },
  { id: "N003", title: "Fee Due Reminder — Semester 5", type: "Fee", audience: "Students", date: "Apr 22, 2026", content: "Hostel fee of ₹25,000 for Semester 5 is due by 15 Aug 2026. Please pay to avoid late charges.", published: true },
  { id: "N004", title: "Faculty Meeting — Curriculum Review", type: "Academic", audience: "Faculty", date: "Apr 24, 2026", content: "All HODs and faculty members are requested to attend the curriculum review meeting on 28 April 2026.", published: false },
];

const typeConfig: Record<string, { color: string; bg: string; icon: React.ElementType<{ className?: string; style?: React.CSSProperties }> }> = {
  Holiday: { color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20", icon: Bell },
  Exam: { color: "text-violet-400", bg: "bg-violet-500/10 border-violet-500/20", icon: BookOpen },
  Fee: { color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20", icon: IndianRupee },
  Academic: { color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20", icon: BookOpen },
  General: { color: "text-gray-500", bg: "bg-gray-500/10 border-gray-500/20", icon: Megaphone },
};

export default function NoticesPage() {
  const [notices, setNotices] = useState(initialNotices);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", type: "General", audience: "All", content: "" });

  const handlePublish = () => {
    if (!form.title || !form.content) return;
    setNotices((prev) => [
      { id: `N${prev.length + 1}`.padStart(4, "0"), ...form, date: "Apr 25, 2026", published: true },
      ...prev,
    ]);
    setForm({ title: "", type: "General", audience: "All", content: "" });
    setShowForm(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-hitech-navy">Notices & Announcements</h1>
          <p className="text-gray-500 mt-1">Publish notices to students, faculty, or all users</p>
        </div>
        <button onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-hitech-saffron text-hitech-navy text-sm font-bold hover:bg-yellow-400 transition-colors shrink-0">
          <Plus className="w-4 h-4" /> New Notice
        </button>
      </div>

      {/* Create Notice Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
            className="bg-white shadow-sm border border-gray-100 border border-gray-100 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-heading font-bold text-hitech-navy">Create New Notice</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-gray-600 transition-colors"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Notice title..."
                className="w-full px-4 py-3 bg-white shadow-sm border border-gray-100 border border-gray-100 rounded-xl text-hitech-navy placeholder-gray-600 text-sm focus:outline-none focus:border-hitech-saffron/40" />
              <div className="grid grid-cols-2 gap-3">
                <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="px-3 py-3 bg-white shadow-sm border border-gray-100 border border-gray-100 rounded-xl text-gray-600 text-sm focus:outline-none">
                  {["General", "Exam", "Holiday", "Fee", "Academic"].map((t) => <option key={t} value={t} className="bg-gray-900">{t}</option>)}
                </select>
                <select value={form.audience} onChange={(e) => setForm({ ...form, audience: e.target.value })}
                  className="px-3 py-3 bg-white shadow-sm border border-gray-100 border border-gray-100 rounded-xl text-gray-600 text-sm focus:outline-none">
                  {["All", "Students", "Faculty", "Staff"].map((a) => <option key={a} value={a} className="bg-gray-900">{a}</option>)}
                </select>
              </div>
              <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={4}
                placeholder="Notice content..."
                className="w-full px-4 py-3 bg-white shadow-sm border border-gray-100 border border-gray-100 rounded-xl text-hitech-navy placeholder-gray-600 text-sm focus:outline-none focus:border-hitech-saffron/40 resize-none" />
              <div className="flex gap-3">
                <button onClick={() => setShowForm(false)}
                  className="flex-1 py-2.5 rounded-xl border border-gray-100 text-gray-500 text-sm font-semibold hover:bg-white shadow-sm border border-gray-100 transition-colors">Cancel</button>
                <button onClick={handlePublish}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-hitech-saffron text-hitech-navy text-sm font-bold hover:bg-yellow-400 transition-colors">
                  <Send className="w-4 h-4" /> Publish Now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notices list */}
      <div className="space-y-4">
        {notices.map((notice, i) => {
          const cfg = typeConfig[notice.type] ?? typeConfig.General;
          const TypeIcon = cfg.icon;
          return (
            <motion.div key={notice.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              className="bg-white shadow-sm border border-gray-100 border border-gray-100 rounded-2xl p-5 hover:border-white/20 transition-all">
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${cfg.bg}`}>
                  <TypeIcon className={`w-4.5 h-4.5 ${cfg.color}`} style={{ width: 18, height: 18 }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="text-hitech-navy font-semibold">{notice.title}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${cfg.bg} ${cfg.color}`}>{notice.type}</span>
                    {!notice.published && <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-500/10 border border-gray-500/20 text-gray-500">Draft</span>}
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{notice.content}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-600">
                    <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {notice.audience}</span>
                    <span>{notice.date}</span>
                  </div>
                </div>
                <button className="text-gray-600 hover:text-gray-500 transition-colors shrink-0"><X className="w-4 h-4" /></button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
