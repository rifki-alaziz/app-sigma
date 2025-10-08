// File: src/pages/DigitalFalak.tsx
import React, { useState, useEffect } from "react";
import {
  calculatePrayerTimes,
  calculateQiblaDirection,
  gregorianToHijri,
  getIslamicEvents,
  getSahur,
  getIftar,
  type PrayerTimes,
  type QiblaDirection,
  type HijriDate,
  type IslamicEvent,
} from "../utils/falakCalculations";

import Header from "../components/falak/Header";
import CurrentTimeLocation from "../components/falak/CurrentTimeLocation";
import PrayerTimesCard from "../components/falak/PrayerTimesCard";
import QiblaDirectionCard from "../components/falak/QiblaDirectionCard";
import HijriCalendarCard from "../components/falak/HijriCalendarCard";
import IslamicEventsCard from "../components/falak/IslamicEventsCard";
import LocationSettings from "../components/falak/LocationSettings";

const DigitalFalak: React.FC = () => {
  // --- STATE ---
  const [location, setLocation] = useState({ latitude: -7.8281, longitude: 112.0146 }); // default Kediri
  const [locationName, setLocationName] = useState(
    "5XJV+F99, Lirboyo, Kec. Mojoroto, Kota Kediri, Jawa Timur 64117"
  );
  const [currentTime, setCurrentTime] = useState(new Date());

  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [qiblaDirection, setQiblaDirection] = useState<QiblaDirection | null>(null);
  const [hijriDate, setHijriDate] = useState<HijriDate | null>(null);
  const [islamicEvents, setIslamicEvents] = useState<IslamicEvent[]>([]);
  const [sahurTime, setSahurTime] = useState(getSahur(location.latitude, location.longitude));
  const [iftarTime, setIftarTime] = useState(getIftar(location.latitude, location.longitude));

  // --- UPDATE CURRENT TIME TIAP DETIK ---
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // --- UPDATE DATA REAL-TIME BERDASARKAN WAKTU DAN LOKASI ---
  useEffect(() => {
    setPrayerTimes(calculatePrayerTimes(location.latitude, location.longitude, currentTime));
    setQiblaDirection(calculateQiblaDirection(location.latitude, location.longitude));
    setHijriDate(gregorianToHijri(currentTime));
    setIslamicEvents(getIslamicEvents(currentTime));
    setSahurTime(getSahur(location.latitude, location.longitude, currentTime));
    setIftarTime(getIftar(location.latitude, location.longitude, currentTime));
  }, [location, currentTime]);

  // --- UPDATE LOKASI MELALUI GEOLOCATION ---
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setLocation({ latitude, longitude });
          setLocationName("Lokasi Saat Ini");
        },
        () => {
          console.warn("Tidak bisa mengakses lokasi. Pastikan GPS aktif dan izin diberikan.");
        }
      );
    }
  }, []);

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <Header />

      {/* CURRENT TIME & LOCATION */}
      <CurrentTimeLocation currentTime={currentTime} location={location} locationName={locationName} />

      {/* SHOLAT & KIBLAT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <PrayerTimesCard
          prayerTimes={prayerTimes}
          currentTime={currentTime}
          location={location}
          sahurTime={sahurTime}
          iftarTime={iftarTime}
        />
        <QiblaDirectionCard qiblaDirection={qiblaDirection} />
      </div>

      {/* KALENDER & PERISTIWA ISLAM */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <HijriCalendarCard hijriDate={hijriDate} />
        <IslamicEventsCard islamicEvents={islamicEvents} currentTime={currentTime} />
      </div>

      {/* PENGATURAN LOKASI */}
      <LocationSettings
        location={location}
        setLocation={setLocation}
        setLocationName={setLocationName}
      />
    </div>
  );
};

export default DigitalFalak;
