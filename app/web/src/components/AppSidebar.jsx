import {
  CirclePoundSterling,
  Home,
  Inbox,
  MapIcon,
  PanelLeftClose,
  PanelLeftOpen,
  PanelRightClose,
  Settings,
  User,
  Workflow,
  LogOut,
} from "lucide-react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

// Menu items with icons
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
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth/login");
  };

  return (
    <div
      className={`
        h-screen border-r shadow-sm 
        transition-all duration-300 
        flex flex-col
        bg-white dark:bg-neutral-900 
        ${collapsed ? "w-20" : "w-64"}
      `}
    >
      {/* COLLAPSE BUTTON */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="p-3 hover:bg-blue-50 dark:hover:bg-neutral-800 transition flex justify-end"
      >
        {collapsed ? (
          <PanelLeftOpen className="h-6 w-6 text-gray-700 dark:text-gray-300" />
        ) : (
          <PanelLeftClose className="h-6 w-6 text-gray-700 dark:text-gray-300" />
        )}
      </button>

      {/* PROFILE SECTION */}
      <div
        className={`
          flex items-center gap-4 p-4 rounded-xl 
          bg-blue-50 dark:bg-neutral-800 
          mx-3 mb-6 transition-all 
          ${collapsed ? "flex-col text-center" : "flex-row"}
        `}
      >
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-semibold">
          M
        </div>

        {/* User Info */}
        {!collapsed && (
          <div className="transition-opacity pt-3 ">
            <p className="font-semibold text-gray-800 dark:text-gray-200">
              Milad Noori
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              admin@company.com
            </p>
          </div>
        )}
      </div>

      {/* MENU ITEMS */}
      <ul className="space-y-2 px-3 flex-1">
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
                    : "text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-neutral-800 hover:text-blue-600"
                }`}
              >
                <item.icon
                  className={`h-5 w-5 ${
                    isActive ? "text-white" : "text-gray-500 dark:text-gray-400"
                  }`}
                />

                {!collapsed && <span>{item.title}</span>}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* LOGOUT BUTTON */}
      <div className="pt-4 border-t dark:border-neutral-800 mx-3 mb-4">
        <button
          onClick={handleLogout}
          className={`flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sm font-medium 
            text-red-600 dark:text-red-400 
            hover:bg-red-100 dark:hover:bg-neutral-800 transition-all
            ${collapsed ? "justify-center" : ""}
          `}
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && "Logout"}
        </button>
      </div>
    </div>
  );
}
