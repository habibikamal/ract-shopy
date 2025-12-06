'use client'
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useRouter } from "next/navigation";

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


  if (loading) {
    return <div>Loading...</div>;
  }
  
  if(error) {
          // show error
          router.push('/auth/loginMobile')
          return <></>;
      }

    console.log(user);


  return (
    

    <div className="dashboard-wrapper flex">
      <aside className="sidebar w-64 bg-black text-white">Sidebar Menu</aside>
      <main className="flex-1 p-6 bg-gray-50">{children}</main>
    </div>
  );
}
