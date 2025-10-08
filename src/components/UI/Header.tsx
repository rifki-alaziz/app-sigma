import React from "react";
import { ChevronDown } from "lucide-react"; // icon panah
import logo from "../../assets/sigma.png"; // ganti sesuai path logo kamu

const Header: React.FC = () => {
  // fungsi scroll otomatis
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <header className="w-full h-screen bg-white/50 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex flex-col items-center justify-center h-full text-center px-6 relative">
        {/* Nama App */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 mb-6 drop-shadow-md">
          Sigma App
        </h1>

        {/* Logo */}
        <img
          src={logo}
          alt="Logo"
          className="h-32 w-32 object-contain rounded-full shadow-lg mb-8 border-4 border-white/70"
        />

        {/* Scroll ke bawah */}
        <button
          onClick={scrollToContent}
          className="absolute bottom-10 flex flex-col items-center animate-bounce focus:outline-none"
        >
          <p className="text-gray-700 text-sm mb-2">Scroll ke bawah</p>
          <ChevronDown size={32} className="text-gray-700" />
        </button>
      </div>
    </header>
  );
};

export default Header;
