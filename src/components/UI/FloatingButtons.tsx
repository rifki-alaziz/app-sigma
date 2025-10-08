import React from "react";
import DoaDropdown from "./DoaDropdown";
import ChatWidget from "./ChatWidget";

interface FloatingButtonsProps {
  /** Jarak dari atas layar (untuk desktop), default auto bottom */
  top?: string;
  /** Jarak dari kanan layar, default 1.5rem */
  right?: string;
  /** Jarak dari bawah layar (untuk mobile), default 5rem */
  bottom?: string;
}

const FloatingButtons: React.FC<FloatingButtonsProps> = ({
  top,
  right = "1.5rem",
  bottom = "5rem", // Menyesuaikan default jarak bawah agar lebih ke atas
}) => {
  // Menyesuaikan posisi dengan menggunakan `top` atau `bottom`
  const positionStyle = top ? { top, right } : { bottom, right };

  return (
    <div
      className="fixed flex flex-col items-end space-y-2 z-50"
      style={positionStyle}
    >
      <DoaDropdown />
      <ChatWidget />
    </div>
  );
};

export default FloatingButtons;
