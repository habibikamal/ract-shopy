

import { ChartBarIcon, Cog6ToothIcon, HomeIcon, UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarContent() {
  const pathname = usePathname();
  
  const menuItems = [
    { name: "Dashboard", icon: <HomeIcon className="h-5 w-5" />, href: "/panel" },
    { name: "Users", icon: <UserIcon className="h-5 w-5" /> , href: "/panel/users"},
    { name: "Products", icon: <ChartBarIcon className="h-5 w-5" /> , href: "/panel/products"},
    { name: "Report", icon: <Cog6ToothIcon className="h-5 w-5" />, href: "/panel/report"},
  ];

 return (
    <nav className="flex flex-col gap-4 mt-8">
      {menuItems.map((item) => {
        const isActive = pathname === item.href || 
                        (item.href !== "/panel" && pathname?.startsWith(item.href));
        
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              isActive 
                ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600" 
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {item.icon}
            <span className="font-medium">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}