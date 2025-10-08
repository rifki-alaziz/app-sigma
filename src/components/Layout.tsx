import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Outlet } from "react-router-dom";
import BottomNavigation from "./BottomNavigation";
import Footer from "./Footer";
import Header from "./UI/Header";
import DoaDropdown from "./UI/DoaDropdown";
import ChatWidget from "./UI/ChatWidget";
import arabicPattern from "../assets/bg.jpg"; // Gambar latar belakang tetap

type LayoutProps = React.PropsWithChildren<{
  isPopup?: boolean;
}>;

const Layout: React.FC<LayoutProps> = ({ isPopup, children }) => {
  const [showHeader, setShowHeader] = useState(true);

  // Header hide/show saat scroll
  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      setShowHeader(current < 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen pb-20">
      {/* Background tetap */}
      <div
        className="absolute inset-0 opacity-50 pointer-events-none bg-cover bg-center"
        style={{
          backgroundImage: `url(${arabicPattern})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      />

      {/* Header */}
      <motion.div
        initial={{ y: 0, opacity: 1 }}
        animate={showHeader ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="sticky top-0 z-50 bg-white/70 backdrop-blur-md shadow-sm"
      >
        <Header />
      </motion.div>

      {/* Floating widgets */}
      <motion.div
        className="fixed bottom-6 right-6 z-40 flex flex-col items-end space-y-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <DoaDropdown />
        <ChatWidget />
      </motion.div>

      {/* Konten utama */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 py-8 space-y-8">
        {children ?? <Outlet />}
      </main>

      {/* Footer & Bottom Navigation */}
      {!isPopup && (
        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <BottomNavigation />
          <Footer />
        </motion.div>
      )}
    </div>
  );
};

export default Layout;
