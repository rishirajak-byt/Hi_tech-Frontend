"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarCheck,
  FileText,
  FolderOpen,
  Bell,
  User,
  LogOut,
  GraduationCap,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { studentProfile, notifications } from "@/data/students";

const sidebarLinks = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Attendance", href: "/attendance", icon: CalendarCheck },
  { name: "Results & Marks", href: "/results", icon: FileText },
  { name: "Documents", href: "/documents", icon: FolderOpen },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Profile", href: "/profile", icon: User },
];

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-hitech-surface flex">
      {/* ═══ SIDEBAR ═══ */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-100 flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100">
          <div className="w-10 h-10 bg-hitech-navy rounded-xl flex items-center justify-center shrink-0">
            <GraduationCap className="w-5 h-5 text-hitech-saffron" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-bold text-hitech-navy leading-tight">HiTech</span>
            <span className="text-[10px] font-medium tracking-widest uppercase text-gray-400">Student Portal</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden ml-auto text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Student info card */}
        <div className="mx-4 mt-4 mb-2 p-4 rounded-xl bg-gradient-to-br from-hitech-navy to-hitech-navy-dark">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-hitech-saffron flex items-center justify-center text-hitech-navy font-bold text-sm shrink-0">
              {studentProfile.avatar}
            </div>
            <div className="min-w-0">
              <p className="text-white font-semibold text-sm truncate">{studentProfile.name}</p>
              <p className="text-gray-300 text-xs truncate">{studentProfile.rollNumber} · {studentProfile.departmentCode}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "sidebar-link flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                  isActive
                    ? "bg-hitech-saffron/10 text-hitech-navy border-l-hitech-saffron font-semibold"
                    : "text-gray-500 hover:text-hitech-navy hover:bg-gray-50"
                )}
              >
                <link.icon className={cn("w-5 h-5 shrink-0", isActive ? "text-hitech-saffron" : "text-gray-400")} />
                <span className="flex-1">{link.name}</span>
                {link.name === "Notifications" && unreadCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-hitech-crimson text-white text-[10px] flex items-center justify-center font-bold badge-pulse">
                    {unreadCount}
                  </span>
                )}
                {isActive && <ChevronRight className="w-4 h-4 text-hitech-saffron" />}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-100">
          <Link
            href="/login"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </Link>
        </div>
      </aside>

      {/* ═══ MOBILE OVERLAY ═══ */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ═══ MAIN CONTENT ═══ */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-500 hover:text-hitech-navy">
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <p className="text-sm text-gray-400 font-medium">Welcome back,</p>
              <p className="font-heading font-bold text-hitech-navy text-lg">{studentProfile.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Notification bell */}
            <Link href="/notifications" className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors">
              <Bell className="w-5 h-5 text-gray-500" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-hitech-crimson text-white text-[10px] flex items-center justify-center font-bold badge-pulse">
                  {unreadCount}
                </span>
              )}
            </Link>
            {/* Avatar */}
            <div className="w-9 h-9 rounded-full bg-hitech-navy flex items-center justify-center text-white text-xs font-bold">
              {studentProfile.avatar}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
