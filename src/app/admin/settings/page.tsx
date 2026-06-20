"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Settings, Bell, Shield, Calendar, Users, Save, Check } from "lucide-react";

function Section({ title, icon: Icon, children }: { title: string; icon: React.ElementType<{ className?: string }>; children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-5 pb-4 border-b border-gray-100">
        <Icon className="w-5 h-5 text-hitech-saffron" />
        <h2 className="text-base font-heading font-bold text-hitech-navy">{title}</h2>
      </div>
      {children}
    </motion.div>
  );
}

function Toggle({ label, desc, checked, onChange }: { label: string; desc?: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
      <div>
        <p className="text-sm font-medium text-gray-800">{label}</p>
        {desc && <p className="text-xs text-gray-500 mt-0.5">{desc}</p>}
      </div>
      <button onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full transition-colors ${checked ? "bg-hitech-saffron" : "bg-gray-200"}`}>
        <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${checked ? "left-6" : "left-1 shadow-sm"}`} />
      </button>
    </div>
  );
}

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [notifs, setNotifs] = useState({ feeReminder: true, attendanceAlert: true, resultPublish: true, admissionUpdate: false });
  const [academic, setAcademic] = useState({ year: "2025-26", sem: "Odd (Semester 5)", minAttendance: "75", graceMarks: "5" });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-hitech-navy">Settings</h1>
          <p className="text-gray-500 mt-1">Configure academic year, notifications, and system preferences</p>
        </div>
        <button onClick={handleSave}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${saved ? "bg-emerald-500 text-white" : "bg-hitech-saffron text-hitech-navy hover:bg-yellow-400"}`}>
          {saved ? <><Check className="w-4 h-4" /> Saved!</> : <><Save className="w-4 h-4" /> Save Changes</>}
        </button>
      </div>

      {/* Academic Year */}
      <Section title="Academic Settings" icon={Calendar}>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Academic Year", key: "year" as const, placeholder: "2025-26" },
            { label: "Current Semester", key: "sem" as const, placeholder: "Odd (Semester 5)" },
            { label: "Min. Attendance (%)", key: "minAttendance" as const, placeholder: "75" },
            { label: "Grace Marks", key: "graceMarks" as const, placeholder: "5" },
          ].map((field) => (
            <div key={field.key}>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{field.label}</label>
              <input value={academic[field.key]} onChange={(e) => setAcademic({ ...academic, [field.key]: e.target.value })}
                placeholder={field.placeholder}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:border-hitech-saffron/40 shadow-sm" />
            </div>
          ))}
        </div>
      </Section>

      {/* Notifications */}
      <Section title="Notification Preferences" icon={Bell}>
        <Toggle label="Fee Due Reminders" desc="Automatically send reminders to students with pending fees" checked={notifs.feeReminder} onChange={(v) => setNotifs({ ...notifs, feeReminder: v })} />
        <Toggle label="Low Attendance Alerts" desc="Alert students when attendance drops below minimum threshold" checked={notifs.attendanceAlert} onChange={(v) => setNotifs({ ...notifs, attendanceAlert: v })} />
        <Toggle label="Result Publication Notifications" desc="Notify students when semester results are published" checked={notifs.resultPublish} onChange={(v) => setNotifs({ ...notifs, resultPublish: v })} />
        <Toggle label="Admission Updates" desc="Email notifications for new admission applications" checked={notifs.admissionUpdate} onChange={(v) => setNotifs({ ...notifs, admissionUpdate: v })} />
      </Section>

      {/* User Roles */}
      <Section title="User Management" icon={Users}>
        <div className="space-y-3">
          {[
            { role: "Super Admin", email: "admin@hitech.edu.in", access: "Full Access" },
            { role: "Faculty", email: "teacher@hitech.edu.in", access: "Academic Only" },
            { role: "Accounts Staff", email: "accounts@hitech.edu.in", access: "Fee Management" },
          ].map((user) => (
            <div key={user.email} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
              <div>
                <p className="text-sm font-semibold text-gray-900">{user.role}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-hitech-saffron/10 border border-hitech-saffron/20 text-hitech-saffron">
                {user.access}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* Security */}
      <Section title="Security" icon={Shield}>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-100">
            <div>
              <p className="text-sm font-semibold text-gray-900">Two-Factor Authentication</p>
              <p className="text-xs text-gray-500 mt-0.5">Adds an extra layer of security to admin accounts</p>
            </div>
            <span className="px-2 py-1 rounded-full text-[11px] font-bold bg-red-50 border border-red-100 text-red-600">Disabled</span>
          </div>
          <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-100">
            <div>
              <p className="text-sm font-semibold text-gray-900">Session Timeout</p>
              <p className="text-xs text-gray-500 mt-0.5">Auto-logout after inactivity</p>
            </div>
            <select className="px-3 py-1.5 bg-white border border-gray-200 rounded-xl text-gray-700 text-xs focus:outline-none">
              {["30 minutes", "1 hour", "2 hours", "Never"].map((o) => <option key={o} className="bg-white">{o}</option>)}
            </select>
          </div>
        </div>
      </Section>
    </div>
  );
}
