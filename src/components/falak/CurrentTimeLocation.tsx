// File: src/components/CurrentTimeHijri.tsx
import React, { useEffect, useState } from "react";
import { Clock, MapPin, BookOpen } from "lucide-react";
import { HijriDate, getHijriFromIntl } from "../../utils/falakCalculations";

interface Props {
  location: { latitude: number; longitude: number };
  locationName: string;
}

const CurrentTimeHijri: React.FC<Props> = ({ location, locationName }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [hijriDate, setHijriDate] = useState<HijriDate | null>(null);

  // Update waktu dan hijri tiap detik
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentTime(now);
      setHijriDate(getHijriFromIntl(now));
    };

    update(); // langsung update awal
    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (t: Date) =>
    t.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  if (!hijriDate) return null;

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="text-center">
          <Clock className="w-8 h-8 mx-auto mb-2" />
          <h3 className="text-lg font-semibold mb-2">Waktu Sekarang</h3>
          <div className="text-3xl font-bold">{formatTime(currentTime)}</div>
          <div className="text-sm opacity-90">
            {currentTime.toLocaleDateString("id-ID", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
        <div className="text-center">
          <MapPin className="w-8 h-8 mx-auto mb-2" />
          <h3 className="text-lg font-semibold mb-2">Lokasi</h3>
          <div className="text-lg font-medium">{locationName}</div>
          <div className="text-sm opacity-90">
            {location.latitude.toFixed(4)}°, {location.longitude.toFixed(4)}°
          </div>
        </div>
      </div>

      <div className="text-center border-t border-white/30 pt-4">
        <BookOpen className="w-6 h-6 mx-auto mb-2" />
        <h3 className="text-lg font-semibold mb-2">Kalender Hijriah</h3>
        <div className="text-2xl font-bold">
          {hijriDate.day} {hijriDate.month} {hijriDate.year} H
        </div>
        <div className="text-sm opacity-90">({hijriDate.gregorianDate})</div>
      </div>
    </div>
  );
};

export default CurrentTimeHijri;
