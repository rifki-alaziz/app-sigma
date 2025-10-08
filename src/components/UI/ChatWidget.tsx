import React, { useState } from "react";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion"; // Mengimpor Framer Motion

const ChatWidget: React.FC = () => {
  const [showChat, setShowChat] = useState(false);

  const adminWa = "6281234567890"; // ganti sesuai admin WA
  const adminName = "Admin SIGMA";

  return (
    <>
      {/* Panel chat admin */}
      {showChat && (
        <motion.div
          className="mb-2 bg-white rounded-xl shadow-xl border border-blue-100 p-4"
          initial={{ opacity: 0, y: 28 }} // Animasi awal panel chat
          animate={{ opacity: 1, y: 0 }} // Animasi panel chat muncul
          exit={{ opacity: 0, y: 28 }} // Animasi panel chat menghilang
          transition={{ type: "spring", duration: 0.5 }}
        >
          <div className="flex items-center space-x-3 mb-2">
            <MessageCircle className="w-6 h-6 text-green-500" />
            <span className="font-semibold text-blue-800">{adminName}</span>
          </div>
          <p className="text-sm text-gray-600 mb-2">
            Butuh bantuan? Chat admin langsung di WhatsApp:
          </p>
          <a
            href={`https://wa.me/${adminWa}?text=Halo%20Admin%20SIGMA,%20saya%20butuh%20bantuan`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-block bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold text-center transition-colors"
          >
            Chat via WhatsApp
          </a>
        </motion.div>
      )}

      {/* Tombol toggle chat */}
      <motion.button
        onClick={() => setShowChat((v) => !v)}
        className="bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg w-14 h-14 flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-300 border-4 border-white"
        title={showChat ? "Tutup chat admin" : "Chat admin"}
        aria-label="Chat Admin"
        animate={{ rotate: showChat ? 45 : 0 }} // Animasi rotasi tombol
        transition={{ duration: 0.3 }} // Durasi rotasi tombol
      >
        <MessageCircle className="w-8 h-8" />
      </motion.button>
    </>
  );
};

export default ChatWidget;
