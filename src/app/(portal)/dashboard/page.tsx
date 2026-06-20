"use client";

import { motion } from "framer-motion";
import {
  CalendarCheck,
  GraduationCap,
  IndianRupee,
  TrendingUp,
  BookOpen,
  Bell,
  Calendar,
  Download,
  FileText,
  Upload,
  ChevronRight,
  AlertTriangle,
  Clock,
  Trophy,
  Target,
} from "lucide-react";
import Link from "next/link";
import {
  studentProfile,
  attendanceData,
  cgpaProgression,
  notifications,
  upcomingEvents,
  semesterProgress,
} from "@/data/students";

/* ─── STAT CARD ─── */
function StatCard({
  icon: Icon,
  label,
  value,
  subtitle,
  color,
  delay,
}: {
  icon: React.ElementType<{ className?: string }>;
  label: string;
  value: string;
  subtitle: string;
  color: string;
  delay: number;
}) {
  const colorMap: Record<string, string> = {
    blue: "from-blue-500/10 to-blue-600/5 text-blue-600",
    green: "from-emerald-500/10 to-emerald-600/5 text-emerald-600",
    purple: "from-violet-500/10 to-violet-600/5 text-violet-600",
    orange: "from-orange-500/10 to-orange-600/5 text-orange-600",
  };

  const iconColorMap: Record<string, string> = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-emerald-100 text-emerald-600",
    purple: "bg-violet-100 text-violet-600",
    orange: "bg-orange-100 text-orange-600",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="stat-card bg-white rounded-2xl p-6 shadow-sm border border-gray-100 card-hover"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconColorMap[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-3xl font-heading font-bold text-gray-900 mb-1">{value}</p>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </motion.div>
  );
}

/* ─── ATTENDANCE BAR ─── */
function AttendanceBar({ subject, percentage, status }: { subject: string; percentage: number; status: string }) {
  const barColor =
    status === "Safe" ? "bg-emerald-500" : status === "Warning" ? "bg-yellow-500" : "bg-red-500";
  const statusBg =
    status === "Safe" ? "status-safe" : status === "Warning" ? "status-warning" : "status-short";

  return (
    <div className="flex items-center gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-sm font-medium text-gray-700 truncate">{subject}</span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-gray-800">{percentage}%</span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusBg}`}>
              {status}
            </span>
          </div>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full progress-bar ${barColor}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}

/* ─── NOTIFICATION TYPE COLORS ─── */
const notificationTypeColors: Record<string, string> = {
  fee: "bg-orange-100 text-orange-700",
  result: "bg-blue-100 text-blue-700",
  attendance: "bg-red-100 text-red-700",
  notice: "bg-gray-100 text-gray-700",
  exam: "bg-purple-100 text-purple-700",
  document: "bg-emerald-100 text-emerald-700",
};

/* ═══════════════════════════════════════════════
   STUDENT DASHBOARD PAGE
   ═══════════════════════════════════════════════ */
export default function DashboardPage() {
  const progressPercent = Math.round(
    (semesterProgress.completedWeeks / semesterProgress.totalWeeks) * 100
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* ═══ HEADER ═══ */}
      <div>
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">
          {studentProfile.departmentCode} · {studentProfile.semesterLabel}
        </p>
      </div>

      {/* ═══ STAT CARDS ═══ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={BookOpen}
          label="Semester"
          value={`Sem ${studentProfile.currentSemester}`}
          subtitle="2025–26, Odd Semester"
          color="blue"
          delay={0}
        />
        <StatCard
          icon={CalendarCheck}
          label="Attendance"
          value={`${studentProfile.overallAttendance}%`}
          subtitle={studentProfile.overallAttendance >= 75 ? "Meeting minimum requirement" : "Below 75% — Take action!"}
          color={studentProfile.overallAttendance >= 75 ? "green" : "orange"}
          delay={0.1}
        />
        <StatCard
          icon={TrendingUp}
          label="CGPA"
          value={studentProfile.cgpa.toFixed(2)}
          subtitle="Cumulative (Sem 1–4)"
          color="purple"
          delay={0.2}
        />
        <StatCard
          icon={IndianRupee}
          label="Fee Status"
          value={studentProfile.feeStatus}
          subtitle={
            studentProfile.feeStatus === "Paid"
              ? "All dues cleared"
              : `₹${studentProfile.feePending.toLocaleString("en-IN")} pending`
          }
          color={studentProfile.feeStatus === "Paid" ? "green" : "orange"}
          delay={0.3}
        />
      </div>

      {/* ═══ MAIN GRID ═══ */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* ─── ATTENDANCE SUMMARY (2/3) ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-heading font-bold text-gray-900">Attendance Summary</h2>
              <p className="text-sm text-gray-400">Subject-wise for Semester 5</p>
            </div>
            <Link
              href="/attendance"
              className="text-sm text-hitech-navy font-semibold hover:text-hitech-saffron flex items-center gap-1 transition-colors"
            >
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Warning banner */}
          {attendanceData.some((a) => a.status !== "Safe") && (
            <div className="flex items-center gap-3 p-3 rounded-xl bg-red-50 border border-red-100 mb-6">
              <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
              <p className="text-sm text-red-700">
                <span className="font-semibold">Attention:</span> You are below 75% in{" "}
                {attendanceData.filter((a) => a.status !== "Safe").length} subject(s). Minimum 75% is required for exam eligibility.
              </p>
            </div>
          )}

          <div className="space-y-4">
            {attendanceData.map((record, idx) => (
              <AttendanceBar
                key={idx}
                subject={record.subject}
                percentage={record.percentage}
                status={record.status}
              />
            ))}
          </div>
        </motion.div>

        {/* ─── FEE STATUS + SEMESTER PROGRESS (1/3) ─── */}
        <div className="space-y-6">
          {/* Fee Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
          >
            <h2 className="text-lg font-heading font-bold text-gray-900 mb-4">Fee Status</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Tuition Fee</span>
                <span className="text-sm font-semibold text-emerald-600">₹42,500 — Paid</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Hostel Fee</span>
                <span className="text-sm font-semibold text-orange-600">₹25,000 — Pending</span>
              </div>
              <div className="h-px bg-gray-100 my-2" />
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Balance Due</span>
                <span className="text-lg font-bold text-orange-600">₹25,000</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Clock className="w-3 h-3" />
                Due by {studentProfile.feeDueDate}
              </div>
            </div>
          </motion.div>

          {/* Semester Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
          >
            <h2 className="text-lg font-heading font-bold text-gray-900 mb-4">Semester Progress</h2>
            <div className="relative mb-3">
              <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-hitech-navy to-hitech-saffron rounded-full progress-bar"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">
                Week {semesterProgress.completedWeeks} of {semesterProgress.totalWeeks}
              </span>
              <span className="font-bold text-hitech-navy">{progressPercent}%</span>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              {semesterProgress.startDate} — {semesterProgress.endDate}
            </p>
          </motion.div>
        </div>
      </div>

      {/* ═══ SECOND ROW ═══ */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* ─── RECENT NOTIFICATIONS ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-heading font-bold text-gray-900">Recent Notifications</h2>
              <p className="text-sm text-gray-400">Latest updates from the university</p>
            </div>
            <Link
              href="/notifications"
              className="text-sm text-hitech-navy font-semibold hover:text-hitech-saffron flex items-center gap-1 transition-colors"
            >
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-3">
            {notifications.slice(0, 5).map((notif) => (
              <div
                key={notif.id}
                className={`flex items-start gap-4 p-4 rounded-xl transition-colors ${notif.read ? "bg-white" : "bg-blue-50/50"
                  } hover:bg-gray-50`}
              >
                <div className={`shrink-0 px-2 py-1 rounded-lg text-[10px] font-bold uppercase ${notificationTypeColors[notif.type]}`}>
                  {notif.type}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm ${notif.read ? "text-gray-700" : "text-gray-900 font-semibold"}`}>
                    {notif.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-1 truncate">{notif.message}</p>
                </div>
                <span className="text-xs text-gray-400 shrink-0">{notif.date}</span>
                {!notif.read && <span className="w-2 h-2 rounded-full bg-hitech-saffron shrink-0 mt-1.5" />}
              </div>
            ))}
          </div>
        </motion.div>

        {/* ─── UPCOMING EVENTS + QUICK LINKS ─── */}
        <div className="space-y-6">
          {/* Upcoming Events */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
          >
            <h2 className="text-lg font-heading font-bold text-gray-900 mb-4">Upcoming</h2>
            <div className="space-y-3">
              {upcomingEvents.map((event, idx) => {
                const iconMap = {
                  exam: Target,
                  event: Trophy,
                  deadline: Calendar,
                };
                const EventIcon = iconMap[event.type];
                return (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                    <div className="w-9 h-9 rounded-lg bg-hitech-navy/10 flex items-center justify-center shrink-0">
                      <EventIcon className="w-4 h-4 text-hitech-navy" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{event.title}</p>
                      <p className="text-xs text-gray-400">{event.date}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-gradient-to-br from-hitech-navy to-hitech-navy-dark rounded-2xl p-6 shadow-sm"
          >
            <h2 className="text-lg font-heading font-bold text-white mb-4">Quick Links</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Download, label: "Marksheet", href: "/results" },
                { icon: CalendarCheck, label: "Attendance", href: "/attendance" },
                { icon: Upload, label: "Upload Doc", href: "/documents" },
                { icon: Bell, label: "Notices", href: "/notifications" },
              ].map((link, idx) => (
                <Link
                  key={idx}
                  href={link.href}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-center group"
                >
                  <link.icon className="w-5 h-5 text-hitech-saffron group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-medium text-gray-200">{link.label}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ═══ CGPA PROGRESSION ═══ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-heading font-bold text-gray-900">CGPA Progression</h2>
            <p className="text-sm text-gray-400">Your academic trajectory across semesters</p>
          </div>
          <Link
            href="/results"
            className="text-sm text-hitech-navy font-semibold hover:text-hitech-saffron flex items-center gap-1 transition-colors"
          >
            Full Results <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Visual CGPA bars */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {cgpaProgression.map((sem) => (
            <div key={sem.semester} className="text-center">
              <div className="h-32 bg-gray-50 rounded-xl flex items-end justify-center p-3 mb-3 relative overflow-hidden">
                <div
                  className="w-full rounded-lg bg-gradient-to-t from-hitech-navy to-blue-400"
                  style={{ height: `${(sem.sgpa / 10) * 100}%` }}
                />
                <span className="absolute top-3 left-1/2 -translate-x-1/2 text-2xl font-heading font-bold text-hitech-navy">
                  {sem.sgpa.toFixed(1)}
                </span>
              </div>
              <p className="text-sm font-semibold text-gray-800">Semester {sem.semester}</p>
              <p className="text-xs text-gray-400">CGPA: {sem.cumulativeCgpa.toFixed(2)}</p>
              <p className="text-xs text-gray-400">{sem.creditsEarned} credits</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
