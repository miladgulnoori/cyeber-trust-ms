import {
  Calendar,
  CirclePoundSterling,
  Home,
  Inbox,
  MapIcon,
  PanelRightClose,
  Settings,
  User,
  Workflow,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

// Menu items
const items = [
  { title: "Home", url: "dashboard", icon: Home },
  { title: "Employees", url: "employees", icon: User },
  { title: "Departments", url: "departments", icon: PanelRightClose },
  { title: "Tasks", url: "tasks", icon: Workflow },
  { title: "Projects", url: "projects", icon: MapIcon },
  { title: "Quotations", url: "quotations", icon: Inbox },
  { title: "Cost Tracking", url: "cost-tracking", icon: CirclePoundSterling },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <div className="w-64 min-h-screen bg-white border-r shadow-sm px-4 py-6 flex flex-col">
      {/* Sidebar Header */}
      <div className="font-bold text-2xl text-gray-800 mb-8 pl-2 tracking-tight">
        CyberTrust MS
      </div>

      {/* Sidebar Menu List */}
      <ul className="space-y-2">
        {items.map((item) => {
          const isActive = location.pathname.includes(item.url);

          return (
            <li key={item.title}>
              <Link
                to={item.url}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all 
                  ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  }
                `}
              >
                <item.icon
                  className={`h-5 w-5 ${
                    isActive ? "text-white" : "text-gray-500"
                  }`}
                />
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Footer (optional) */}
      <div className="mt-auto pt-6 border-t">
        <Link
          to="settings"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all"
        >
          <Settings className="h-5 w-5 text-gray-500" /> Settings
        </Link>
      </div>
    </div>
  );
}
