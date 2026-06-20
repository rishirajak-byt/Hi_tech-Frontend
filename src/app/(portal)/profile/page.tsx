"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  BookOpen,
  Hash,
  GraduationCap,
  Shield,
  Camera,
  Edit2,
  Check,
  TrendingUp,
  CalendarCheck,
  IndianRupee,
  Award,
} from "lucide-react";
import { studentProfile, cgpaProgression } from "@/data/students";

/* ─── FIELD ROW ─── */
function Field({ icon: Icon, label, value }: { icon: React.ElementType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-lg bg-hitech-surface flex items-center justify-center shrink-0 mt-0.5">
        <Icon className="w-4 h-4 text-hitech-navy" />
      </div>
      <div>
        <p className="text-xs text-gray-400 font-medium">{label}</p>
        <p className="text-sm font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   PROFILE PAGE
   ═══════════════════════════════════════════════ */
export default function ProfilePage() {
  const [editMode, setEditMode] = useState(false);
  const [phone, setPhone] = useState("+91 98765 43210");
  const [address, setAddress] = useState("42, Civil Lines, New Delhi — 110054");
  const [emergencyContact, setEmergencyContact] = useState("+91 98765 00011");

  const totalCredits = cgpaProgression.reduce((s, r) => s + r.creditsEarned, 0);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* ═══ HEADER ═══ */}
      <div>
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-500 mt-1">View and manage your personal information</p>
      </div>

      {/* ═══ PROFILE HERO CARD ═══ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-hitech-navy to-hitech-navy-dark rounded-2xl p-6 sm:p-8"
      >
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="w-24 h-24 rounded-2xl bg-hitech-saffron flex items-center justify-center text-hitech-navy font-heading font-bold text-3xl">
              {studentProfile.avatar}
            </div>
            <button className="absolute -bottom-2 -right-2 w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors">
              <Camera className="w-4 h-4 text-hitech-navy" />
            </button>
          </div>

          {/* Basic info */}
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-2xl font-heading font-bold text-white">{studentProfile.name}</h2>
            <p className="text-gray-300 mt-1">{studentProfile.rollNumber}</p>
            <p className="text-gray-300 text-sm">{studentProfile.department}</p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-3">
              <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold">
                {studentProfile.semesterLabel}
              </span>
              <span className="px-3 py-1 rounded-full bg-hitech-saffron/20 text-hitech-saffron text-xs font-semibold border border-hitech-saffron/30">
                Batch {studentProfile.batch}
              </span>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 gap-3 shrink-0">
            {[
              { label: "CGPA", value: studentProfile.cgpa.toFixed(2), icon: TrendingUp },
              { label: "Attendance", value: `${studentProfile.overallAttendance}%`, icon: CalendarCheck },
              { label: "Credits", value: totalCredits, icon: Award },
              { label: "Fee", value: studentProfile.feeStatus, icon: IndianRupee },
            ].map((s, i) => (
              <div key={i} className="bg-white/10 rounded-xl p-3 text-center">
                <s.icon className="w-4 h-4 text-hitech-saffron mx-auto mb-1" />
                <p className="text-white font-bold text-base">{s.value}</p>
                <p className="text-gray-300 text-[11px]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ═══ DETAILS GRID ═══ */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Academic Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center gap-2 mb-5">
            <GraduationCap className="w-5 h-5 text-hitech-navy" />
            <h2 className="text-base font-heading font-bold text-gray-900">Academic Details</h2>
          </div>
          <div className="space-y-4">
            <Field icon={Hash} label="Roll Number" value={studentProfile.rollNumber} />
            <Field icon={BookOpen} label="Department" value={studentProfile.department} />
            <Field icon={BookOpen} label="Department Code" value={studentProfile.departmentCode} />
            <Field icon={Calendar} label="Batch" value={studentProfile.batch} />
            <Field icon={GraduationCap} label="Current Semester" value={`Semester ${studentProfile.currentSemester}`} />
            <Field icon={Shield} label="Admission Type" value="Regular — JEE Mains" />
          </div>
        </motion.div>

        {/* Personal Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-hitech-navy" />
              <h2 className="text-base font-heading font-bold text-gray-900">Personal Details</h2>
            </div>
            <button
              onClick={() => setEditMode(!editMode)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${editMode
                  ? "bg-emerald-500 text-white hover:bg-emerald-600"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
            >
              {editMode ? <Check className="w-3.5 h-3.5" /> : <Edit2 className="w-3.5 h-3.5" />}
              {editMode ? "Save" : "Edit"}
            </button>
          </div>

          <div className="space-y-4">
            <Field icon={User} label="Full Name" value={studentProfile.name} />
            <Field icon={Mail} label="College Email" value={studentProfile.email} />
            <Field icon={Mail} label="Personal Email" value="rahul.sharma@gmail.com" />

            {/* Editable fields */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-hitech-surface flex items-center justify-center shrink-0 mt-0.5">
                <Phone className="w-4 h-4 text-hitech-navy" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-400 font-medium">Mobile Number</p>
                {editMode ? (
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="text-sm font-semibold text-gray-800 w-full border-b-2 border-hitech-navy/30 focus:border-hitech-navy focus:outline-none py-0.5"
                  />
                ) : (
                  <p className="text-sm font-semibold text-gray-800">{phone}</p>
                )}
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-hitech-surface flex items-center justify-center shrink-0 mt-0.5">
                <MapPin className="w-4 h-4 text-hitech-navy" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-400 font-medium">Home Address</p>
                {editMode ? (
                  <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="text-sm font-semibold text-gray-800 w-full border-b-2 border-hitech-navy/30 focus:border-hitech-navy focus:outline-none py-0.5"
                  />
                ) : (
                  <p className="text-sm font-semibold text-gray-800">{address}</p>
                )}
              </div>
            </div>

            <Field icon={Calendar} label="Date of Birth" value="14 March 2005" />
            <Field icon={User} label="Category" value="General (CML)" />
          </div>
        </motion.div>

        {/* Emergency Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center gap-2 mb-5">
            <Phone className="w-5 h-5 text-hitech-navy" />
            <h2 className="text-base font-heading font-bold text-gray-900">Emergency Contact</h2>
          </div>
          <div className="space-y-4">
            <Field icon={User} label="Guardian Name" value="Suresh Kumar Sharma" />
            <Field icon={User} label="Relation" value="Father" />

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-hitech-surface flex items-center justify-center shrink-0 mt-0.5">
                <Phone className="w-4 h-4 text-hitech-navy" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-400 font-medium">Emergency Contact Number</p>
                {editMode ? (
                  <input
                    value={emergencyContact}
                    onChange={(e) => setEmergencyContact(e.target.value)}
                    className="text-sm font-semibold text-gray-800 w-full border-b-2 border-hitech-navy/30 focus:border-hitech-navy focus:outline-none py-0.5"
                  />
                ) : (
                  <p className="text-sm font-semibold text-gray-800">{emergencyContact}</p>
                )}
              </div>
            </div>

            <Field icon={MapPin} label="Guardian Address" value="Same as student address" />
          </div>
        </motion.div>

        {/* Documents & IDs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center gap-2 mb-5">
            <Shield className="w-5 h-5 text-hitech-navy" />
            <h2 className="text-base font-heading font-bold text-gray-900">Identification</h2>
          </div>
          <div className="space-y-4">
            <Field icon={Hash} label="Student ID" value={studentProfile.rollNumber} />
            <Field icon={Shield} label="Aadhar (last 4)" value="XXXX XXXX 4521" />
            <Field icon={Hash} label="Library Card No." value="LIB-CSE-2023-047" />
            <Field icon={Hash} label="Hostel Room" value="H-Block, Room 204" />
            <Field icon={Shield} label="Blood Group" value="B+" />
          </div>
        </motion.div>
      </div>

      {/* ═══ PASSWORD CHANGE ═══ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-heading font-bold text-gray-900">Password & Security</h2>
            <p className="text-sm text-gray-400 mt-0.5">Last changed: 45 days ago</p>
          </div>
          <button className="px-4 py-2 rounded-xl bg-hitech-navy text-white text-sm font-semibold hover:bg-hitech-navy-dark transition-colors">
            Change Password
          </button>
        </div>
      </motion.div>
    </div>
  );
}
