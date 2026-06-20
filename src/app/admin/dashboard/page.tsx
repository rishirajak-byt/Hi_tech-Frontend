"use client";

import { motion } from "framer-motion";
import {
  Users,
  GraduationCap,
  IndianRupee,
  CalendarCheck,
  TrendingUp,
  TrendingDown,
  Minus,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  BookOpen,
  BarChart3,
  Building2,
  Award,
} from "lucide-react";
import {
  collegeStats,
  departmentStats,
  recentActivities,
  pendingActions,
  feeCollectionSummary,
  admissionFunnel,
  RecentActivity,
  PendingAction,
} from "@/data/admin";

/* ─── STAT CARD ─── */
function StatCard({
  label,
  value,
  change,
  changeType,
  icon,
  delay,
}: {
  label: string;
  value: string | number;
  change: string;
  changeType: "up" | "down" | "neutral";
  icon: string;
  delay: number;
}) {
  const iconMap: Record<string, React.ElementType<{ className?: string }>> = {
    students: Users,
    faculty: GraduationCap,
    departments: Building2,
    attendance: CalendarCheck,
    fee: IndianRupee,
    placement: Award,
  };
  const IconEl = iconMap[icon] ?? BarChart3;

  const changeColors = {
    up: "text-emerald-600 bg-emerald-50",
    down: "text-red-600 bg-red-50",
    neutral: "text-gray-600 bg-gray-50",
  };
  const ChangeIcon = changeType === "up" ? TrendingUp : changeType === "down" ? TrendingDown : Minus;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-hitech-saffron/10 border border-hitech-saffron/20 flex items-center justify-center">
          <IconEl className="w-5 h-5 text-hitech-saffron" />
        </div>
        <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${changeColors[changeType]}`}>
          <ChangeIcon className="w-3.5 h-3.5" />
          {change}
        </div>
      </div>
      <p className="text-2xl font-heading font-bold text-hitech-navy mb-0.5">{value}</p>
      <p className="text-xs text-gray-500 font-medium">{label}</p>
    </motion.div>
  );
}

/* ─── ACTIVITY TYPE CONFIG ─── */
const activityTypeColors: Record<RecentActivity["type"], string> = {
  admission: "text-blue-600 bg-blue-50 border-blue-100",
  result: "text-purple-600 bg-purple-50 border-purple-100",
  fee: "text-emerald-600 bg-emerald-50 border-emerald-100",
  document: "text-yellow-600 bg-yellow-50 border-yellow-100",
  complaint: "text-red-600 bg-red-50 border-red-100",
  notice: "text-gray-600 bg-gray-50 border-gray-100",
};

/* ─── PENDING PRIORITY CONFIG ─── */
const priorityConfig: Record<PendingAction["priority"], { color: string; bg: string }> = {
  High: { color: "text-red-600", bg: "bg-red-50 border-red-100" },
  Medium: { color: "text-yellow-600", bg: "bg-yellow-50 border-yellow-100" },
  Low: { color: "text-gray-600", bg: "bg-gray-50 border-gray-100" },
};

/* ─── PENDING TYPE ICONS ─── */
const pendingTypeIcons: Record<PendingAction["type"], React.ElementType<{ className?: string }>> = {
  document: BookOpen,
  fee: IndianRupee,
  leave: Clock,
  complaint: AlertCircle,
  admission: Users,
};

/* ═══════════════════════════════════════════════
   ADMIN DASHBOARD
   ═══════════════════════════════════════════════ */
export default function AdminDashboard() {
  const feePercent = Math.round(
    (feeCollectionSummary.totalCollected / feeCollectionSummary.totalExpected) * 100
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* ═══ HEADER ═══ */}
      <div>
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-hitech-navy">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1">Academic Year 2025–26 · Odd Semester (Sem 5)</p>
      </div>

      {/* ═══ STAT CARDS ═══ */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {collegeStats.map((stat, i) => (
          <StatCard key={i} {...stat} delay={i * 0.07} />
        ))}
      </div>

      {/* ═══ MAIN GRID ═══ */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* ─── FEE COLLECTION ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-5">
            <IndianRupee className="w-5 h-5 text-hitech-saffron" />
            <h2 className="text-base font-heading font-bold text-hitech-navy">Fee Collection</h2>
          </div>

          {/* Donut-style visual */}
          <div className="relative flex items-center justify-center mb-5">
            <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="50" fill="none" stroke="#f3f4f6" strokeWidth="12" />
              <circle
                cx="60" cy="60" r="50" fill="none"
                stroke="#F4A300"
                strokeWidth="12"
                strokeDasharray={`${(feePercent / 100) * 314} 314`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute text-center">
              <p className="text-2xl font-heading font-bold text-hitech-navy">{feePercent}%</p>
              <p className="text-[10px] text-gray-500">Collected</p>
            </div>
          </div>

          <div className="space-y-2">
            {[
              { label: "Collected", value: `₹${(feeCollectionSummary.totalCollected / 10000000).toFixed(2)} Cr`, color: "text-emerald-600", dot: "bg-emerald-500" },
              { label: "Pending", value: `₹${(feeCollectionSummary.totalPending / 10000000).toFixed(2)} Cr`, color: "text-red-600", dot: "bg-red-500" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${item.dot}`} />
                  <span className="text-xs text-gray-500">{item.label}</span>
                </div>
                <span className={`text-xs font-bold ${item.color}`}>{item.value}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-3 gap-2 text-center">
            {[
              { label: "Paid", value: feeCollectionSummary.paidStudents.toLocaleString(), color: "text-emerald-600" },
              { label: "Partial", value: feeCollectionSummary.partialStudents, color: "text-yellow-600" },
              { label: "Pending", value: feeCollectionSummary.pendingStudents.toLocaleString(), color: "text-red-600" },
            ].map((s) => (
              <div key={s.label}>
                <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
                <p className="text-[10px] text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ─── DEPARTMENT OVERVIEW (2/3) ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-5">
            <Building2 className="w-5 h-5 text-hitech-saffron" />
            <h2 className="text-base font-heading font-bold text-hitech-navy">Department Overview</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-2 pr-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Department</th>
                  <th className="text-center py-2 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Students</th>
                  <th className="text-center py-2 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Faculty</th>
                  <th className="text-center py-2 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Avg CGPA</th>
                  <th className="text-left py-2 pl-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Attendance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {departmentStats.map((dept, i) => (
                  <motion.tr
                    key={dept.code}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.55 + i * 0.06 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: dept.color }} />
                        <span className="font-semibold text-gray-900 text-xs">{dept.code}</span>
                        <span className="text-gray-500 text-xs hidden md:block truncate max-w-[140px]">{dept.name}</span>
                      </div>
                    </td>
                    <td className="text-center py-3 px-3 text-gray-700 font-medium">{dept.students.toLocaleString()}</td>
                    <td className="text-center py-3 px-3 text-gray-700">{dept.faculty}</td>
                    <td className="text-center py-3 px-3">
                      <span className={`font-bold ${dept.avgCgpa >= 8 ? "text-emerald-600" : dept.avgCgpa >= 7.5 ? "text-yellow-600" : "text-gray-700"}`}>
                        {dept.avgCgpa}
                      </span>
                    </td>
                    <td className="py-3 pl-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden min-w-[60px]">
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${dept.avgAttendance}%`, background: dept.color }}
                          />
                        </div>
                        <span className="text-xs text-gray-600 shrink-0">{dept.avgAttendance}%</span>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* ═══ SECOND ROW ═══ */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* ─── RECENT ACTIVITIES ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-5">
            <Clock className="w-5 h-5 text-hitech-saffron" />
            <h2 className="text-base font-heading font-bold text-hitech-navy">Recent Activities</h2>
          </div>
          <div className="space-y-3">
            {recentActivities.slice(0, 6).map((activity, idx) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + idx * 0.05 }}
                className="flex items-start gap-3"
              >
                <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase border shrink-0 mt-0.5 ${activityTypeColors[activity.type]}`}>
                  {activity.type}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-700 leading-relaxed truncate">{activity.message}</p>
                  {activity.user && <p className="text-[10px] text-gray-400 mt-0.5">by {activity.user}</p>}
                </div>
                <span className="text-[10px] text-gray-400 shrink-0">{activity.time}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ─── PENDING ACTIONS ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-hitech-saffron" />
              <h2 className="text-base font-heading font-bold text-hitech-navy">Pending Actions</h2>
            </div>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-red-50 text-red-600 border border-red-100">
              {pendingActions.length} pending
            </span>
          </div>
          <div className="space-y-3">
            {pendingActions.map((action, idx) => {
              const pcfg = priorityConfig[action.priority];
              const ActionIcon = pendingTypeIcons[action.type];
              return (
                <motion.div
                  key={action.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.75 + idx * 0.05 }}
                  className="flex items-start gap-3 p-3 rounded-xl bg-gray-50/50 border border-gray-100 hover:bg-gray-50 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0 border border-gray-100 shadow-sm">
                    <ActionIcon className="w-4 h-4 text-gray-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-900 truncate">{action.title}</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">
                      {action.submittedBy} · {action.submittedOn}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${pcfg.bg} ${pcfg.color}`}>
                      {action.priority}
                    </span>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="w-6 h-6 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center hover:bg-emerald-100 transition-colors">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      </button>
                      <button className="w-6 h-6 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center hover:bg-red-100 transition-colors">
                        <XCircle className="w-3.5 h-3.5 text-red-600" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* ═══ ADMISSION FUNNEL ═══ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85 }}
        className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm"
      >
        <div className="flex items-center gap-2 mb-6">
          <Users className="w-5 h-5 text-hitech-saffron" />
          <h2 className="text-base font-heading font-bold text-hitech-navy">Admission Funnel — 2026-27</h2>
          <span className="ml-auto text-xs text-gray-500">B.Tech All Programs</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {admissionFunnel.map((stage, i) => {
            const maxCount = admissionFunnel[0].count;
            const pct = Math.round((stage.count / maxCount) * 100);
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + i * 0.07 }}
                className="text-center"
              >
                <div className="h-24 bg-gray-50 border border-gray-100 rounded-xl flex items-end justify-center p-2 mb-3 relative overflow-hidden">
                  <div
                    className="w-8 rounded-lg bg-gradient-to-t from-hitech-saffron to-hitech-saffron-light transition-all duration-700"
                    style={{ height: `${pct}%`, opacity: 0.6 + 0.4 * (i / admissionFunnel.length) }}
                  />
                  <span className="absolute top-2 left-1/2 -translate-x-1/2 text-sm font-heading font-bold text-gray-700">
                    {stage.count >= 1000 ? `${(stage.count / 1000).toFixed(1)}k` : stage.count}
                  </span>
                </div>
                <p className="text-[11px] text-gray-600 font-medium leading-tight">{stage.stage}</p>
                <p className="text-xs text-gray-400 mt-0.5">{pct}%</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
