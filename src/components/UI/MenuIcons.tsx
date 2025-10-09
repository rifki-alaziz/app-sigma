import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  GraduationCap,
  BookOpen,
  Storefront,
} from "@phosphor-icons/react";
import { motion } from "framer-motion";

const MenuIcons: React.FC = () => {
  const navigate = useNavigate();
  const [isComingSoon, setIsComingSoon] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulasi loading 1.5 detik
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const cards = [
    {
      title: "Data Mahasantri",
      icon: Users,
      color: "from-blue-500 to-blue-400",
      path: "/students",
      size: "large",
    },
    {
      title: "Data Mustahiq",
      icon: GraduationCap,
      color: "from-green-500 to-emerald-400",
      path: "/teachers",
    },
    {
      title: "Kitab Ijazahan",
      icon: BookOpen,
      color: "from-purple-500 to-violet-400",
      path: "/istigosah",
    },
    {
      title: "Toko",
      icon: Storefront,
      color: "from-pink-500 to-rose-400",
      path: "/store",
    },
    {
      title: "Fiqih Q&A",
      icon: BookOpen,
      color: "from-amber-500 to-yellow-400",
      path: "/fiqih",
    },
  ];

  const handleCardClick = (card: { path: string; comingSoon?: boolean }) => {
    if (card.comingSoon) {
      setIsComingSoon(true);
    } else {
      navigate(card.path);
    }
  };

  return (
    <div className="relative z-20 -mt-10 px-4">
      {/* Popup Coming Soon */}
      {isComingSoon && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-sm z-30">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl p-6 rounded-3xl shadow-2xl text-center max-w-sm"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              🚧 Coming Soon
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Halaman ini sedang dalam pengembangan. Mohon ditunggu ya!
            </p>
            <button
              onClick={() => setIsComingSoon(false)}
              className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-5 py-2 rounded-xl shadow-md hover:scale-105 transition-transform"
            >
              Tutup
            </button>
          </motion.div>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-pulse">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div
              key={idx}
              className={`${
                idx === 0 ? "col-span-2 md:col-span-2 h-48" : "h-36"
              } rounded-[2rem] bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600`}
            ></div>
          ))}
        </div>
      ) : (
        /* Grid Cards */
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {cards.map((card, index) => {
            const Icon = card.icon;
            const isLarge = card.size === "large";

            return (
              <motion.div
                key={index}
                onClick={() => handleCardClick(card)}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                className={`${
                  isLarge ? "col-span-2 md:col-span-2 h-48" : "h-36"
                } flex flex-col justify-center items-center cursor-pointer 
                rounded-[2rem] shadow-xl bg-white/20 dark:bg-gray-800/30 
                backdrop-blur-2xl hover:shadow-2xl 
                border border-white/30 dark:border-gray-700/30
                transition-all relative overflow-hidden`}
              >
                {/* Efek glossy */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent rounded-[2rem] pointer-events-none" />

                {/* Ikon kecil glow */}
                <div
                  className={`p-3 rounded-xl bg-gradient-to-br ${card.color} shadow-md`}
                >
                  <Icon
                    size={isLarge ? 32 : 24} // kecil & clean
                    weight="fill"
                    color="white"
                  />
                </div>

                {/* Judul */}
                <h3
                  className={`mt-3 font-medium text-gray-900 dark:text-gray-100 text-center ${
                    isLarge ? "text-base md:text-lg" : "text-xs md:text-sm"
                  }`}
                >
                  {card.title}
                </h3>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MenuIcons;
