'use client'
import { useEffect, useState } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
        // بررسی وضعیت ورود کاربر (مثلاً از طریق کوکی‌ها یا localStorage)
       setLoading(false)
    }, 3000);
  }, []) 


  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    

    <div className="dashboard-wrapper flex">
      <aside className="sidebar w-64 bg-black text-white">Sidebar Menu</aside>
      <main className="flex-1 p-6 bg-gray-50">{children}</main>
    </div>
  );
}
