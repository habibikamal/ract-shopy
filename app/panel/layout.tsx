'use client'
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useRouter } from "next/navigation";
import UserInfo from "./componrnts/usrInfo";
import { HomeIcon, UsersIcon, FolderIcon, CalendarIcon, DocumentIcon, ChartPieIcon } from "@heroicons/react/24/outline";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const {user,error,loading}=useAuth();
  
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   setTimeout(() => {
  //       // بررسی وضعیت ورود کاربر (مثلاً از طریق کوکی‌ها یا localStorage)
  //      setLoading(false)
  //   }, 3000);
  // }, []) 
useEffect(() => {
    if (!loading && error) {
      router.push("/auth/loginMobile");
    }
  }, [loading, error]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return null; // تا redirect انجام شود
  }


  return (
    

   <div className="h-screen w-full flex bg-[#0F172A] text-gray-200">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#0B1220] flex flex-col border-r border-gray-700/30">
        
        {/* Logo */}
        <div className="px-6 py-6">
          <span className="text-3xl text-indigo-400 font-bold">~~</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-1">
          
          <SidebarItem title="Dashboard" icon={<HomeIcon className="w-5 h-5" />} active />
          <SidebarItem title="Team" icon={<UsersIcon className="w-5 h-5" />} />
          <SidebarItem title="Projects" icon={<FolderIcon className="w-5 h-5" />} />
          <SidebarItem title="Calendar" icon={<CalendarIcon className="w-5 h-5" />} />
          <SidebarItem title="Documents" icon={<DocumentIcon className="w-5 h-5" />} />
          <SidebarItem title="Reports" icon={<ChartPieIcon className="w-5 h-5" />} />

          {/* Teams */}
          <div className="mt-10 text-xs text-gray-400">Your teams</div>

          <TeamItem name="Heroicons" />
          <TeamItem name="Tailwind Labs" />
          <TeamItem name="Workcation" />
        </nav>

        {/* User */}
        <div className="p-4 border-t border-gray-700/30 flex items-center">
          <img
            src="https://i.pravatar.cc/40"
            className="w-10 h-10 rounded-full"
            alt="avatar"
          />
          <div className="ml-3">
            <p className="text-sm font-semibold">Tom Cook</p>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6">
        <div className="h-full border border-gray-700 rounded-xl bg-[#0B1220] relative overflow-hidden">
          {/* Pattern Background */}
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.toptal.com/designers/subtlepatterns/uploads/double-bubble-outline.png')]"></div>

          <div className="absolute inset-0 p-8 text-gray-500">
            {children}
          </div>
        </div>
      </main>

    </div>
  );
}
interface SidebarItemProps {
  title: string;
  icon: any;
  active?: boolean;   //  ← اختیاری شد
}
function SidebarItem({ title, icon, active = false }: SidebarItemProps) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer
        ${active ? "bg-gray-800 text-white" : "text-gray-400 hover:bg-gray-800/50"}`}
    >
      {icon}
      <span className="text-sm">{title}</span>
    </div>
  );
}

interface TeamItemProps {
  name: string;
}

function TeamItem({ name }: TeamItemProps) {
  return (
    <div className="flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer text-gray-400 hover:bg-gray-800/50">
      <div className="w-6 h-6 rounded bg-gray-700 flex items-center justify-center text-xs">
        {name.charAt(0)}
      </div>
      <span className="text-sm">{name}</span>
    </div>
  );
}
