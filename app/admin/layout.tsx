'use client'
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const {user,error,loading}=useAuth();
  
  

  if (loading) {
    return <div>Loading...</div>;
  }
  
  if(!user?.is_admin){
     router.push('/')
          return <></>;
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
