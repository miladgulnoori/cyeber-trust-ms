import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

// Menu items.
const items = [
  {
    title: "Home",
    url: "dashboard",
    icon: Home,
  },
  {
    title: "Employees",
    url: "employees",
    icon: Inbox,
  },
  {
    title: "Departments",
    url: "departments",
    icon: Calendar,
  },
  {
    title: "Tasks",
    url: "tasks",
    icon: Search,
  },
  {
    title: "Projects",
    url: "projects",
    icon: Settings,
  },
  {
    title: "Quotations",
    url: "quotations",
    icon: Settings,
  },
  {
    title: "Cost Tracking",
    url: "cost-tracking",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <div className="fixed left-0 top-0 h-full p-4 w-60 pt-7 bg-gray-200">
      <div>Application</div>
      <ul className="mt-8 pl-3 grid gap-4">
        {items.map((item) => (
          <li key={item.title} className="mb-2 flex ">
            <Link
              to={item.url}
              className="flex items-center space-x-2 gap-2 hover:border-b-2 border-blue-500"
            >
              <item.icon />
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
