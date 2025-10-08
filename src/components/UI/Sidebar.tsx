import React from "react";
import { X, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface MenuItem {
  label: string;
  icon: React.ElementType;
  path: string;
}

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  menus: MenuItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose, menus }) => {
  const navigate = useNavigate();

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${open ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={onClose}
      />
      {/* Sidebar */}
      <nav
        className={`fixed top-0 right-0 h-full w-64 z-50 bg-white shadow-lg border-l border-blue-200 transform transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="font-bold text-blue-700 text-lg">Menu</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-blue-600" />
          </button>
        </div>

        <ul className="py-4 space-y-2 max-h-full overflow-y-auto">
          {menus.map((menu, i) => (
            <li key={i}>
              <button
                className="w-full flex items-center px-6 py-3 text-blue-800 hover:bg-blue-50 rounded-lg space-x-3 text-base font-medium transition-all"
                onClick={() => {
                  onClose();
                  navigate(menu.path);
                }}
              >
                <menu.icon className="w-5 h-5" />
                <span>{menu.label}</span>
              </button>
            </li>
          ))}

          <li className="mt-6 border-t pt-4 mx-4">
            <button
              className="w-full flex items-center px-2 py-2 text-red-700 hover:bg-red-100 rounded-lg space-x-3 text-base font-medium transition-all"
              onClick={() => {
                onClose();
                navigate("/logout");
              }}
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
