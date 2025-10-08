import React, { useEffect, useState } from "react";
import { type PrayerTimes } from "../../utils/falakCalculations";

interface Props {
  prayerTimes: PrayerTimes | null;
  location: { latitude: number; longitude: number };
  sahurTime: string;
  iftarTime: string;
}

const PrayerTimesCard: React.FC<Props> = ({ prayerTimes, sahurTime, iftarTime }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!prayerTimes) return null;

  const formatTime = (t: string | Date): string =>
    typeof t === "string"
      ? t
      : t.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  const nextPrayer = (() => {
    const curr = formatTime(currentTime).slice(0, 5);
    const times = [
      { name: "Subuh", time: prayerTimes.fajr },
      { name: "Terbit", time: prayerTimes.sunrise },
      { name: "Dzuhur", time: prayerTimes.dhuhr },
      { name: "Ashar", time: prayerTimes.asr },
      { name: "Maghrib", time: prayerTimes.maghrib },
      { name: "Isya", time: prayerTimes.isha },
    ];
    for (const p of times) if (p.time > curr) return p;
    return times[0];
  })();

  const isTimeForPrayer = (current: string, prayer: string) => current === prayer;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Jadwal Sholat</h2>

      {nextPrayer && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4 text-center">
          <p className="text-sm text-green-600">Sholat Selanjutnya</p>
          <p className="text-2xl font-bold text-green-800">{nextPrayer.name}</p>
          <p className="text-lg text-green-700">{nextPrayer.time}</p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-3">
        {[
          { name: "Subuh", time: prayerTimes.fajr, icon: "🌅" },
          { name: "Terbit", time: prayerTimes.sunrise, icon: "☀️" },
          { name: "Dzuhur", time: prayerTimes.dhuhr, icon: "🌞" },
          { name: "Ashar", time: prayerTimes.asr, icon: "🌤️" },
          { name: "Maghrib", time: prayerTimes.maghrib, icon: "🌅" },
          { name: "Isya", time: prayerTimes.isha, icon: "🌙" },
        ].map((prayer) => (
          <div
            key={prayer.name}
            className={`flex items-center justify-between p-3 rounded-lg ${
              isTimeForPrayer(formatTime(currentTime).slice(0, 5), prayer.time)
                ? "bg-blue-100 border border-blue-300"
                : "bg-gray-50"
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{prayer.icon}</span>
              <span className="font-medium text-gray-800">{prayer.name}</span>
            </div>
            <span className="font-bold text-lg text-gray-700">{prayer.time}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg text-center">
        <p className="text-sm text-blue-600">
          Waktu Sahur: <span className="font-bold text-blue-800">{sahurTime}</span>
        </p>
        <p className="text-sm text-blue-600">
          Waktu Berbuka: <span className="font-bold text-blue-800">{iftarTime}</span>
        </p>
      </div>
    </div>
  );
};

export default PrayerTimesCard;
