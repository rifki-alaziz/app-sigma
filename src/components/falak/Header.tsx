import React from "react";
import { Star, Moon } from "lucide-react";

const Header: React.FC = () => (
  <div className="text-center">
    <h1 className="text-3xl font-bold text-gray-800 mb-4 flex items-center justify-center space-x-3">
      <Star className="w-8 h-8 text-yellow-500" />
      <span>Digital Falak</span>
      <Moon className="w-8 h-8 text-blue-500" />
    </h1>
    <p className="text-gray-600 max-w-2xl mx-auto">
      Sistem perhitungan astronomi Islam untuk keperluan ibadah dan penanggalan
    </p>
  </div>
);

export default Header;
