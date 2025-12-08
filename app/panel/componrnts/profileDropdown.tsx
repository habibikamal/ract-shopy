"use client";

import { useState } from "react";
import {
  UserIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  ChevronDownIcon
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function ProfileDropdown({ user }: { user: any }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const logout = () => {
    document.cookie =
      "shopy_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/auth/loginMobile");
  };

  return (
    <div className="relative">
      {/* Button */}
      <button
        className="flex items-center gap-3 hover:bg-gray-100 px-3 py-1 rounded"
        onClick={() => setOpen(!open)}
      >
        <img
          src="https://api.dicebear.com/7.x/personas/svg"
          className="w-8 h-8 rounded-full"
        />
        <span className="font-medium">{user?.name ?? "User"}</span>
        <ChevronDownIcon className="h-4 w-4" />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-2 z-50">

          {/* User Info */}
          <div className="px-3 py-2 border-b">
            <p className="text-sm font-semibold">{user?.name ?? "User"}</p>
            <p className="text-xs text-gray-500">
              {user?.email ?? "email@example.com"}
            </p>
          </div>

          {/* Menu Items */}
          <button
            className="w-full px-3 py-2 flex items-center gap-2 hover:bg-gray-100 rounded"
            onClick={() => alert("Open Profile")}
          >
            <UserIcon className="h-4 w-4" />
            Profile
          </button>

          <button
            className="w-full px-3 py-2 flex items-center gap-2 hover:bg-gray-100 rounded"
            onClick={() => alert("Settings")}
          >
            <Cog6ToothIcon className="h-4 w-4" />
            Settings
          </button>

          <button
            className="w-full px-3 py-2 flex items-center gap-2 text-red-600 hover:bg-red-50 rounded"
            onClick={logout}
          >
            <ArrowLeftOnRectangleIcon className="h-4 w-4" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
