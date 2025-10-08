import React, { useState } from "react";
import { BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const doaList = [
  {
    title: "Doa Sebelum Belajar",
    arab: "رَبِّ زِدْنِي عِلْمًا وَارْزُقْنِي فَهْمًا",
    arti: "Ya Allah, tambahkanlah aku ilmu dan berilah aku pemahaman.",
  },
  {
    title: "Doa Sesudah Belajar",
    arab: "اَللّٰهُمَّ انْفَعْنِيْ بِمَا عَلَّمْتَنِيْ وَعَلِّمْنِيْ مَا يَنْفَعُنِيْ",
    arti: "Ya Allah, berikanlah manfaat atas ilmu yang Engkau ajarkan kepadaku dan ajarkanlah ilmu yang bermanfaat bagiku.",
  },
];

const DoaDropdown: React.FC = () => {
  const [showDoa, setShowDoa] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-end relative">
      {/* Toggle button */}
      <motion.button
        onClick={() => setShowDoa((prev) => !prev)}
        className="bg-yellow-400 hover:bg-yellow-500 text-white rounded-full shadow-lg w-14 h-14 flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-300 border-4 border-white"
        title="Kumpulan Doa"
        aria-label="Kumpulan Doa"
        whileTap={{ scale: 0.92, boxShadow: "0 0 0 16px #fde68a55" }}
      >
        <BookOpen className="w-7 h-7" />
      </motion.button>

      {/* Dropdown popup */}
      <AnimatePresence>
        {showDoa && (
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 28, scale: 0.92 }}
            transition={{ type: "spring", duration: 0.23 }}
            className="absolute bottom-16 right-0 mb-2 w-72 bg-white rounded-xl shadow-xl border border-yellow-300 px-5 py-4 z-50"
          >
            <div className="font-bold text-yellow-600 mb-2 text-lg flex items-center gap-2">
              <BookOpen className="w-5 h-5" /> Doa-Doa
            </div>

            <ul className="space-y-3 mb-3">
              {doaList.map((doa, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.2 }}
                >
                  <div className="font-semibold text-gray-800">{doa.title}</div>
                  <div className="text-right text-xl font-arabic text-gray-700">
                    {doa.arab}
                  </div>
                  <div className="text-xs text-gray-500 italic mt-1">{doa.arti}</div>
                </motion.li>
              ))}
            </ul>

            <motion.button
              className="w-full py-2 mt-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-white font-bold shadow transition-all"
              onClick={() => {
                setShowDoa(false);
                // Animasi transisi sebelum navigate
                setTimeout(() => navigate("/doa"), 180);
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Lihat Semua Doa
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DoaDropdown;
