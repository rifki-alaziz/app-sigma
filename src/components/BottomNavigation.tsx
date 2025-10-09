import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  Users,
  GraduationCap,
  Compass,
  Calculator,
  X,
} from "lucide-react";

const BottomNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [visible, setVisible] = useState(true);

  const [popup, setPopup] = useState<null | "member" | "hisab">(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentY = window.scrollY;
      setVisible(currentY < lastScrollY || currentY < 10);
      lastScrollY = currentY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Users, label: "Member", path: "", popup: "member" },
    { icon: Compass, label: "Falak", path: "/falak" },
    { icon: Calculator, label: "Hisab", path: "", popup: "hisab" },
  ];

  return (
    <>
      <div
        className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 
        bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl 
        rounded-2xl shadow-lg px-6 py-2 border border-white/30 
        transition-all duration-300 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div className="flex space-x-6 items-center">
          {navItems.map(({ icon: Icon, label, path, popup }) => (
            <button
              key={label}
              onClick={() =>
                popup ? setPopup(popup as "member" | "hisab") : navigate(path)
              }
              className={`flex flex-col items-center text-[11px] transition-colors ${
                location.pathname === path
                  ? "text-blue-600 font-semibold"
                  : "text-gray-500 hover:text-blue-500"
              }`}
            >
              <Icon size={22} />
              <span className="mt-0.5">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {popup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-80 max-w-sm p-5 relative">
            <button
              onClick={() => setPopup(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>

            {popup === "member" && (
              <div className="space-y-3">
                <h2 className="text-lg font-semibold mb-3 text-center">Pilih Member</h2>
                <button
                  onClick={() => {
                    navigate("/students");
                    setPopup(null);
                  }}
                  className="w-full py-2 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 flex items-center justify-center space-x-2"
                >
                  <Users className="w-5 h-5" /> <span>Mahasantri</span>
                </button>
                <button
                  onClick={() => {
                    navigate("/teachers");
                    setPopup(null);
                  }}
                  className="w-full py-2 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 flex items-center justify-center space-x-2"
                >
                  <GraduationCap className="w-5 h-5" /> <span>Mustahiq</span>
                </button>
              </div>
            )}

            {popup === "hisab" && (
              <div className="space-y-3">
                <h2 className="text-lg font-semibold mb-3 text-center">Pilih Hisab</h2>
                <button
                  onClick={() => {
                    navigate("/falak");
                    setPopup(null);
                  }}
                  className="w-full py-2 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 flex items-center justify-center space-x-2"
                >
                  <Compass className="w-5 h-5" /> <span>Falak</span>
                </button>
                <button
                  onClick={() => {
                    navigate("/zakat");
                    setPopup(null);
                  }}
                  className="w-full py-2 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 flex items-center justify-center space-x-2"
                >
                  <Calculator className="w-5 h-5" /> <span>Zakat</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default BottomNavigation;
