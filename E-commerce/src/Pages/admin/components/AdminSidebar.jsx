import React from "react";
import { MdAddBox } from "react-icons/md";
import { MdFormatListBulleted } from "react-icons/md";
import { MdShoppingBag } from "react-icons/md";

const SIDEBAR_ITEMS = [
  { id: "add", label: "Add Items", icon: MdAddBox },
  { id: "list", label: "List Items", icon: MdFormatListBulleted },
  { id: "orders", label: "Orders", icon: MdShoppingBag },
];

const AdminSidebar = ({ activeTab, onTabChange }) => {
  return (
    <aside className="w-full md:w-64 shrink-0 md:border-r border-gray-200 md:min-h-[calc(100vh-80px)]">
      <nav className="flex flex-col gap-2 pt-6 pl-6 max-md:flex-row max-md:px-4 max-md:py-3 max-md:overflow-x-auto max-md:border-b border-gray-200">
        {SIDEBAR_ITEMS.map(({ id, label, icon: Icon }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onTabChange(id)}
              className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200 rounded-l-md max-md:rounded-md ${
                isActive
                  ? "bg-[#ffebf0] text-[#ff4e70] border-r-4 border-[#ff4e70] max-md:border-r-0 max-md:border-b-4"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-r-4 border-transparent"
              }`}
            >
              <Icon className="text-xl shrink-0" />
              <span className="whitespace-nowrap">{label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
