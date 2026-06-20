"use client";

import { motion } from "framer-motion";
import {
  CalendarCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Info,
  TrendingUp,
  BookOpen,
  ShieldAlert,
} from "lucide-react";
import { attendanceData, studentProfile, semesterProgress } from "@/data/students";

/* ─── HELPERS ─── */
function classesNeeded(totalClasses: number, present: number): number {
  // Classes needed to reach 75%
  let n = 0;
  while ((present + n) / (totalClasses + n) < 0.75) n++;
  return n;
}

function classesCanSkip(totalClasses: number, present: number): number {
  // Max classes that can be missed while staying >= 75%
  let skip = 0;
  while ((present) / (totalClasses + skip + 1) >= 0.75) skip++;
  return skip;
}

const progressPercent = Math.round(
  (semesterProgress.completedWeeks / semesterProgress.totalWeeks) * 100
);

/* ─── STATUS CONFIG ─── */
const statusConfig = {
  Safe: { color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200", bar: "bg-emerald-500", icon: CheckCircle2 },
  Warning: { color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-200", bar: "bg-yellow-500", icon: AlertTriangle },
  Short: { color: "text-red-600", bg: "bg-red-50", border: "border-red-200", bar: "bg-red-500", icon: XCircle },
};

/* ─── SUBJECT ROW ─── */
function SubjectRow({
  record,
  delay,
}: {
  record: (typeof attendanceData)[0];
  delay: number;
}) {
  const cfg = statusConfig[record.status];
  const StatusIcon = cfg.icon;
  const needed = record.status !== "Safe" ? classesNeeded(record.totalClasses, record.present) : 0;
  const canSkip = record.status === "Safe" ? classesCanSkip(record.totalClasses, record.present) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className={`rounded-2xl border p-5 ${cfg.bg} ${cfg.border}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        {/* Subject info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <StatusIcon className={`w-4 h-4 shrink-0 ${cfg.color}`} />
            <span className="font-semibold text-gray-900 truncate">{record.subject}</span>
            <span className="text-xs font-mono text-gray-500 shrink-0">{record.code}</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>Present: <strong className="text-gray-800">{record.present}</strong></span>
            <span>Absent: <strong className="text-gray-800">{record.absent}</strong></span>
            <span>Total: <strong className="text-gray-800">{record.totalClasses}</strong></span>
          </div>
        </div>

        {/* Progress bar + percentage */}
        <div className="sm:w-64">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-gray-500">Attendance</span>
            <span className={`text-sm font-bold ${cfg.color}`}>{record.percentage}%</span>
          </div>
          <div className="w-full h-2.5 bg-white/60 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${cfg.bar} transition-all duration-1000`}
              style={{ width: `${record.percentage}%` }}
            />
          </div>
          {/* 75% marker */}
          <div className="relative mt-1">
            <div className="absolute left-[75%] -translate-x-1/2 w-px h-2 bg-gray-400" />
            <p className="text-[10px] text-gray-400 text-right">Min: 75%</p>
          </div>
        </div>

        {/* Status badge */}
        <div className="sm:w-28 text-right shrink-0">
          <span className={`inline-block px-3 py-1.5 rounded-full text-xs font-bold ${cfg.color} bg-white/60`}>
            {record.status}
          </span>
          {record.status !== "Safe" && needed > 0 && (
            <p className="text-[11px] text-red-600 mt-1 font-medium">Attend {needed} more</p>
          )}
          {record.status === "Safe" && canSkip > 0 && (
            <p className="text-[11px] text-gray-500 mt-1">Can miss {canSkip} more</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   ATTENDANCE PAGE
   ═══════════════════════════════════════════════ */
export default function AttendancePage() {
  const totalPresent = attendanceData.reduce((s, r) => s + r.present, 0);
  const totalClasses = attendanceData.reduce((s, r) => s + r.totalClasses, 0);
  const overallPct = ((totalPresent / totalClasses) * 100).toFixed(1);

  const safeCount = attendanceData.filter((r) => r.status === "Safe").length;
  const warnCount = attendanceData.filter((r) => r.status === "Warning").length;
  const shortCount = attendanceData.filter((r) => r.status === "Short").length;

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* ═══ HEADER ═══ */}
      <div>
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-gray-900">Attendance</h1>
        <p className="text-gray-500 mt-1">{studentProfile.semesterLabel}</p>
      </div>

      {/* ═══ SUMMARY CARDS ═══ */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Overall Attendance",
            value: `${overallPct}%`,
            sub: `${totalPresent} / ${totalClasses} classes`,
            icon: CalendarCheck,
            iconBg: "bg-blue-100 text-blue-600",
          },
          {
            label: "Subjects Safe",
            value: safeCount,
            sub: "Above 75%",
            icon: CheckCircle2,
            iconBg: "bg-emerald-100 text-emerald-600",
          },
          {
            label: "Subjects at Risk",
            value: warnCount + shortCount,
            sub: warnCount > 0 ? `${warnCount} warning, ${shortCount} short` : "None — all good!",
            icon: ShieldAlert,
            iconBg: warnCount + shortCount > 0 ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-500",
          },
          {
            label: "Semester Progress",
            value: `${progressPercent}%`,
            sub: `Week ${semesterProgress.completedWeeks} of ${semesterProgress.totalWeeks}`,
            icon: TrendingUp,
            iconBg: "bg-violet-100 text-violet-600",
          },
        ].map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="stat-card bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${card.iconBg}`}>
              <card.icon className="w-5 h-5" />
            </div>
            <p className="text-2xl font-heading font-bold text-gray-900">{card.value}</p>
            <p className="text-sm font-medium text-gray-700 mt-0.5">{card.label}</p>
            <p className="text-xs text-gray-400 mt-1">{card.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* ═══ ATTENDANCE RULES BANNER ═══ */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="flex items-start gap-3 p-4 rounded-2xl bg-blue-50 border border-blue-100"
      >
        <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
        <div className="text-sm text-blue-800">
          <span className="font-semibold">Attendance Policy:</span> A minimum of{" "}
          <strong>75% attendance</strong> is required in each subject to be eligible for End Semester Examinations.
          Students below 75% will be <strong>debarred</strong> from appearing in ESE unless a valid medical leave is approved.
        </div>
      </motion.div>

      {/* ═══ SUBJECT-WISE TABLE ═══ */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-hitech-navy" />
          <h2 className="text-lg font-heading font-bold text-gray-900">Subject-Wise Attendance</h2>
          <span className="ml-auto text-xs text-gray-400">{studentProfile.semesterLabel}</span>
        </div>
        <div className="space-y-3">
          {attendanceData.map((record, idx) => (
            <SubjectRow key={record.code} record={record} delay={0.4 + idx * 0.07} />
          ))}
        </div>
      </div>

      {/* ═══ ELIGIBILITY SUMMARY ═══ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
      >
        <h2 className="text-lg font-heading font-bold text-gray-900 mb-4">ESE Eligibility Check</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 pr-4 font-semibold text-gray-600">Subject</th>
                <th className="text-center py-2 px-4 font-semibold text-gray-600">Attendance %</th>
                <th className="text-center py-2 px-4 font-semibold text-gray-600">Minimum</th>
                <th className="text-center py-2 px-4 font-semibold text-gray-600">ESE Eligible</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {attendanceData.map((r) => (
                <tr key={r.code} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 pr-4">
                    <p className="font-medium text-gray-800">{r.subject}</p>
                    <p className="text-xs text-gray-400">{r.code}</p>
                  </td>
                  <td className="text-center py-3 px-4">
                    <span className={`font-bold ${r.percentage >= 75 ? "text-emerald-600" : "text-red-600"}`}>
                      {r.percentage}%
                    </span>
                  </td>
                  <td className="text-center py-3 px-4 text-gray-500">75%</td>
                  <td className="text-center py-3 px-4">
                    {r.percentage >= 75 ? (
                      <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold">
                        <CheckCircle2 className="w-4 h-4" /> Yes
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-red-600 font-semibold">
                        <XCircle className="w-4 h-4" /> No
                      </span>
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
