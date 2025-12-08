import { ChartBarIcon, Cog6ToothIcon, HomeIcon, UserIcon } from "@heroicons/react/24/outline";

export default function SidebarContent() {
  const menuItems = [
    { name: "Dashboard", icon: <HomeIcon className="h-5 w-5" /> },
    { name: "Users", icon: <UserIcon className="h-5 w-5" /> },
    { name: "Analytics", icon: <ChartBarIcon className="h-5 w-5" /> },
    { name: "Settings", icon: <Cog6ToothIcon className="h-5 w-5" /> },
  ];

  return (
    
    <nav className="flex flex-col gap-4 mt-8">
      {menuItems.map((item) => (
        <a
          key={item.name}
          href="#"
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700"
        >
          {item.icon}
          <span>{item.name}</span>
        </a>
      ))}
    </nav>
  );
}