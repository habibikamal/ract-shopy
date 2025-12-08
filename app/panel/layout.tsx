"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "../hooks/useAuth";

import {
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import SidebarContent from "./componrnts/sidebarContent";
import ProfileDropdown from "./componrnts/profileDropdown";
import LanguageDropdown from "./componrnts/languageDropdown";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, error, loading } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && error) {
      router.push("/auth/loginMobile");
    }
  }, [loading, error]);

  if (loading) return <div>در حال بارگذاری...</div>;
  if (error) return null;

  return (
    <div className="flex h-screen bg-gray-100" dir="rtl">

      {/* ---------------- Sidebar (Mobile) ---------------- */}
      <div
        className={`fixed inset-0 z-40 flex lg:hidden transition-all duration-300 ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Background */}
        <div
          className="fixed inset-0 bg-black/50"
          onClick={() => setSidebarOpen(false)}
        ></div>

        {/* Sidebar Panel */}
        <div className="relative z-50 w-64 bg-white shadow-xl p-4">
          <button
            className="absolute left-4 top-4"
            onClick={() => setSidebarOpen(false)}
          >
            <XMarkIcon className="h-6 w-6" />
          </button>

          <SidebarContent />
        </div>
      </div>

      {/* ---------------- Sidebar (Desktop) ---------------- */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col bg-white shadow-lg p-4">
        <SidebarContent />
      </div>

      {/* ---------------- Main Section ---------------- */}
      <div className="flex flex-1 flex-col">

        {/* ---------------- Top Navbar ---------------- */}
        <div className="flex items-center justify-between bg-white px-6 py-3 shadow relative">

          {/* Mobile Sidebar Toggle */}
          <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Bars3Icon className="h-6 w-6" />
          </button>

          {/* Title */}
          <h1 className="text-xl font-semibold">داشبورد</h1>

          {/* Right Section (actually left in RTL) */}
          <div className="flex items-center gap-6">

            {/* Language Dropdown */}
            <LanguageDropdown />

            {/* Profile Dropdown */}
            <ProfileDropdown user={user} />
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
