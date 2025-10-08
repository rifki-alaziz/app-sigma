// src/components/HijriCalendarCard.tsx
import React, { useEffect, useState } from "react";
import { BookOpen } from "lucide-react";
import { HijriDate, getHijriFromIntl } from "../../utils/falakCalculations";

const HijriCalendarCard: React.FC = () => {
  const [hijriDate, setHijriDate] = useState<HijriDate | null>(null);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const hijri = getHijriFromIntl(now);
      setHijriDate(hijri);
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!hijriDate) return null;

  return (
    <div className="border rounded-2xl p-6 shadow-md">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <BookOpen className="w-6 h-6" />
        Kalender Hijriah
      </h2>
      <p className="text-lg">
        {hijriDate.day} {hijriDate.month} {hijriDate.year} H
      </p>
      <p className="text-sm text-gray-500">({hijriDate.gregorianDate})</p>
    </div>
  );
};

export default HijriCalendarCard;
