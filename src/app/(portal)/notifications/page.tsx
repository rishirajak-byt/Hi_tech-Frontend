"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  IndianRupee,
  FileText,
  CalendarCheck,
  Megaphone,
  BookOpen,
  FolderOpen,
  CheckCheck,
  Circle,
} from "lucide-react";
import { notifications, Notification } from "@/data/students";

/* ─── TYPE CONFIG ─── */
const typeConfig: Record<
  Notification["type"],
  { label: string; color: string; bg: string; icon: React.ElementType<{ className?: string }> }
> = {
  fee: { label: "Fee", color: "text-orange-700", bg: "bg-orange-50 border-orange-200", icon: IndianRupee },
  result: { label: "Result", color: "text-blue-700", bg: "bg-blue-50 border-blue-200", icon: FileText },
  attendance: { label: "Attendance", color: "text-red-700", bg: "bg-red-50 border-red-200", icon: CalendarCheck },
  notice: { label: "Notice", color: "text-gray-700", bg: "bg-gray-50 border-gray-200", icon: Megaphone },
  exam: { label: "Exam", color: "text-violet-700", bg: "bg-violet-50 border-violet-200", icon: BookOpen },
  document: { label: "Document", color: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200", icon: FolderOpen },
};

const ALL_TYPES = ["all", "fee", "result", "attendance", "notice", "exam", "document"] as const;
type FilterType = (typeof ALL_TYPES)[number];

/* ═══════════════════════════════════════════════
   NOTIFICATIONS PAGE
   ═══════════════════════════════════════════════ */
export default function NotificationsPage() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [readState, setReadState] = useState<Record<string, boolean>>(
    Object.fromEntries(notifications.map((n) => [n.id, n.read]))
  );

  const markAllRead = () => {
    setReadState(Object.fromEntries(notifications.map((n) => [n.id, true])));
  };

  const markRead = (id: string) => {
    setReadState((prev) => ({ ...prev, [id]: true }));
  };

  const filtered =
    filter === "all" ? notifications : notifications.filter((n) => n.type === filter);

  const unreadCount = notifications.filter((n) => !readState[n.id]).length;

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* ═══ HEADER ═══ */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-500 mt-1">
            {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}` : "All caught up!"}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <CheckCheck className="w-4 h-4" />
            Mark all read
          </button>
        )}
      </div>

      {/* ═══ FILTER TABS ═══ */}
      <div className="flex gap-2 flex-wrap">
        {ALL_TYPES.map((type) => {
          const count =
            type === "all"
              ? notifications.length
              : notifications.filter((n) => n.type === type).length;
          const cfg = type !== "all" ? typeConfig[type] : null;
          return (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${filter === type
                  ? "bg-hitech-navy text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-hitech-navy/30"
                }`}
            >
              {cfg && <cfg.icon className="w-3.5 h-3.5" />}
              {type === "all" ? "All" : cfg!.label}
              <span className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold ${filter === type ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ═══ NOTIFICATION LIST ═══ */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <Bell className="w-10 h-10 text-gray-200 mx-auto mb-3" />
            <p className="text-gray-400 text-sm">No notifications in this category.</p>
          </div>
        ) : (
          filtered.map((notif, idx) => {
            const cfg = typeConfig[notif.type];
            const TypeIcon = cfg.icon;
            const isRead = readState[notif.id];

            return (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => markRead(notif.id)}
                className={`relative flex gap-4 p-5 rounded-2xl border cursor-pointer transition-all hover:shadow-sm ${isRead ? "bg-white border-gray-100" : `${cfg.bg} border`
                  }`}
              >
                {/* Unread dot */}
                {!isRead && (
                  <span className="absolute top-4 right-4">
                    <Circle className="w-2.5 h-2.5 fill-hitech-saffron text-hitech-saffron" />
                  </span>
                )}

                {/* Type icon */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isRead ? "bg-gray-100" : `bg-white/80`
                  }`}>
                  <TypeIcon className={`w-5 h-5 ${isRead ? "text-gray-400" : cfg.color}`} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2 justify-between mb-1">
                    <p className={`text-sm font-semibold ${isRead ? "text-gray-700" : "text-gray-900"}`}>
                      {notif.title}
                    </p>
                    <span className="text-xs text-gray-400 shrink-0">{notif.date}</span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{notif.message}</p>
                  <span className={`inline-block mt-2 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${cfg.color} bg-white/60`}>
                    {cfg.label}
                  </span>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}
