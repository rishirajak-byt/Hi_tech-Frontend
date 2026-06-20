"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  IndianRupee,
  FolderOpen,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Shield,
  CalendarCheck,
  BarChart3,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const sidebarLinks = [
  { group: "Overview", links: [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  ]},
  { group: "Academic", links: [
    { name: "Students", href: "/admin/students", icon: Users },
    { name: "Faculty", href: "/admin/faculty", icon: GraduationCap },
    { name: "Departments", href: "/admin/departments", icon: BookOpen },
    { name: "Attendance", href: "/admin/attendance", icon: CalendarCheck },
  ]},
  { group: "Administration", links: [
    { name: "Fee Management", href: "/admin/fees", icon: IndianRupee },
    { name: "Documents", href: "/admin/documents", icon: FolderOpen },
    { name: "Notices", href: "/admin/notices", icon: Bell },
    { name: "Admissions", href: "/admin/admissions", icon: Shield },
  ]},
  { group: "System", links: [
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ]},
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const unreadCount = 6;

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

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
            <span className="text-hitech-saffron font-heading font-bold text-base">HT</span>
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-bold text-hitech-navy leading-tight">HiTech</span>
            <span className="text-[10px] font-medium tracking-widest uppercase text-gray-400">Admin Panel</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden ml-auto text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Admin info card */}
        <div className="mx-4 mt-4 mb-2 p-4 rounded-xl bg-gradient-to-br from-hitech-navy to-hitech-navy-dark">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-hitech-saffron flex items-center justify-center text-hitech-navy font-bold text-sm shrink-0">
              AD
            </div>
            <div className="min-w-0">
              <p className="text-white font-semibold text-sm truncate">Admin User</p>
              <p className="text-gray-300 text-xs truncate">Super Admin</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-5 overflow-y-auto">
          {sidebarLinks.map((group) => (
            <div key={group.group}>
              <p className="px-4 mb-1 text-[10px] font-bold tracking-widest uppercase text-gray-400">
                {group.group}
              </p>
              <div className="space-y-0.5">
                {group.links.map((link) => {
                  const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setSidebarOpen(false)}
                      className={cn(
                        "sidebar-link flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all",
                        isActive
                          ? "bg-hitech-saffron/10 text-hitech-navy border-l-hitech-saffron font-semibold"
                          : "text-gray-500 hover:text-hitech-navy hover:bg-gray-50"
                      )}
                    >
                      <link.icon className={cn("w-4.5 h-4.5 shrink-0", isActive ? "text-hitech-saffron" : "text-gray-400")} style={{ width: "18px", height: "18px" }} />
                      <span className="flex-1">{link.name}</span>
                      {isActive && <ChevronRight className="w-3.5 h-3.5 text-hitech-saffron" />}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-100">
          <Link
            href="/login"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4.5 h-4.5" style={{ width: "18px", height: "18px" }} />
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
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        {/* Top header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-500 hover:text-hitech-navy">
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <p className="text-sm text-gray-400 font-medium">HiTech University</p>
              <p className="font-heading font-bold text-hitech-navy text-lg">Admin Panel</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-500 hidden sm:block">Today: 25 Apr 2026</span>
            <Link href="/admin/notices" className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors">
              <Bell className="w-5 h-5 text-gray-500" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-hitech-crimson text-white text-[9px] flex items-center justify-center font-bold">
                {unreadCount}
              </span>
            </Link>
            <div className="w-9 h-9 rounded-full bg-hitech-navy flex items-center justify-center text-white text-xs font-bold">
              AD
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 md:p-8 bg-hitech-surface">{children}</main>
      </div>
    </div>
  );
}
