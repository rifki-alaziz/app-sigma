import { PrayerTimes as AdhanPrayerTimes, CalculationMethod, Coordinates } from "adhan";
import HijriDateLib from "hijri-date/lib/safe";

export type PrayerTimes = {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
};

export type QiblaDirection = {
  degrees: number; // arah kiblat dalam derajat
  distance: number; // jarak ke Ka'bah (km)
  location: string; // lokasi tujuan (Ka'bah)
};

export type HijriDate = {
  day: number;
  month: string;
  monthNumber: number;
  year: number;
  gregorianDate: string;
};

export type IslamicEvent = {
  name: string;
  date: string;
  hijriDate: string;
  description: string;
  type: "religious" | "other";
};

// ---- Hitung waktu sholat real-time
export function calculatePrayerTimes(
  lat: number,
  lon: number,
  date: Date = new Date()
): PrayerTimes {
  const coordinates = new Coordinates(lat, lon);
  const params = CalculationMethod.MuslimWorldLeague();
  const times = new AdhanPrayerTimes(coordinates, date, params);

  const format = (d: Date) =>
    d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });

  return {
    fajr: format(times.fajr),
    sunrise: format(times.sunrise),
    dhuhr: format(times.dhuhr),
    asr: format(times.asr),
    maghrib: format(times.maghrib),
    isha: format(times.isha),
  };
}

// ---- Hitung arah kiblat real-time
export function calculateQiblaDirection(lat: number, lon: number): QiblaDirection {
  const kaabaLat = 21.4225 * (Math.PI / 180);
  const kaabaLon = 39.8262 * (Math.PI / 180);
  const userLat = lat * (Math.PI / 180);
  const userLon = lon * (Math.PI / 180);

  const dLon = kaabaLon - userLon;

  const y = Math.sin(dLon);
  const x =
    Math.cos(userLat) * Math.tan(kaabaLat) - Math.sin(userLat) * Math.cos(dLon);

  let bearing = (Math.atan2(y, x) * 180) / Math.PI;
  if (bearing < 0) bearing += 360;

  const R = 6371;
  const dLat = kaabaLat - userLat;
  const dLon2 = kaabaLon - userLon;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(userLat) * Math.cos(kaabaLat) * Math.sin(dLon2 / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return { degrees: bearing, distance, location: "Ka'bah, Makkah" };
}

// ---- Konversi Gregorian ke Hijri (pakai library hijri-date)
export function gregorianToHijri(date: Date = new Date()): HijriDate {
  const hijri = new HijriDateLib(date);
  const months = [
    "Muharram",
    "Safar",
    "Rabi'ul Awal",
    "Rabi'ul Akhir",
    "Jumadal Awal",
    "Jumadal Akhir",
    "Rajab",
    "Sya'ban",
    "Ramadhan",
    "Syawal",
    "Dzulqa'dah",
    "Dzulhijjah",
  ];
  return {
    day: hijri.getDate(),
    month: months[hijri.getMonth()],
    monthNumber: hijri.getMonth() + 1,
    year: hijri.getFullYear(),
    gregorianDate: date.toLocaleDateString("id-ID"),
  };
}

// ---- Konversi Gregorian ke Hijri (pakai Intl API bawaan)
export function getHijriFromIntl(date: Date = new Date()): HijriDate {
  const formatter = new Intl.DateTimeFormat("ar-SA-u-ca-islamic", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const parts = formatter.formatToParts(date);

  const day = Number(parts.find((p) => p.type === "day")?.value || 1);
  const monthName = parts.find((p) => p.type === "month")?.value || "";
  const year = Number(parts.find((p) => p.type === "year")?.value || 1446);

  const monthMap: Record<string, string> = {
    محرم: "Muharram",
    صفر: "Safar",
    "ربيع الأول": "Rabi'ul Awal",
    "ربيع الآخر": "Rabi'ul Akhir",
    "جمادى الأولى": "Jumadal Awal",
    "جمادى الآخرة": "Jumadal Akhir",
    رجب: "Rajab",
    شعبان: "Sya'ban",
    رمضان: "Ramadhan",
    شوال: "Syawal",
    "ذو القعدة": "Dzulqa'dah",
    "ذو الحجة": "Dzulhijjah",
  };

  const month = monthMap[monthName] || monthName;
  const monthNumber =
    Object.keys(monthMap).indexOf(monthName) >= 0
      ? Object.keys(monthMap).indexOf(monthName) + 1
      : 0;

  return {
    day,
    month,
    monthNumber,
    year,
    gregorianDate: date.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };
}

// ---- Event Islam
export function getIslamicEvents(date: Date = new Date()): IslamicEvent[] {
  const hijri = gregorianToHijri(date);
  return [
    {
      name: "Tahun Baru Hijriah",
      date: date.toLocaleDateString("id-ID"),
      hijriDate: `${hijri.day} ${hijri.month} ${hijri.year} H`,
      description: "Awal tahun Hijriah",
      type: "religious",
    },
    {
      name: "Isra Miraj",
      date: date.toLocaleDateString("id-ID"),
      hijriDate: `${hijri.day} ${hijri.month} ${hijri.year} H`,
      description: "Peringatan Isra Miraj",
      type: "religious",
    },
  ];
}

// ---- Sahur & Iftar
export function getSahur(lat: number, lon: number, date: Date = new Date()): string {
  const times = calculatePrayerTimes(lat, lon, date);
  const [h, m] = times.fajr.split(":").map(Number);
  const dt = new Date(date);
  dt.setHours(h, m - 10, 0);
  return dt.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
}

export function getIftar(lat: number, lon: number, date: Date = new Date()): string {
  const times = calculatePrayerTimes(lat, lon, date);
  return times.maghrib;
}

// ---- Cek waktu sholat
export function isTimeForPrayer(current: string, prayer: string): boolean {
  return current === prayer;
}

// ---- Jadwal Tahunan
export function getYearlyPrayerTable(
  lat: number,
  lon: number,
  year: number
): Array<{
  date: string;
  hijri: string;
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}> {
  const results = [];
  for (let m = 0; m < 12; m++) {
    const daysInMonth = new Date(year, m + 1, 0).getDate();
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, m, d);
      const prayer = calculatePrayerTimes(lat, lon, date);
      const hijri = gregorianToHijri(date);
      results.push({
        date: date.toLocaleDateString("id-ID", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }),
        hijri: `${hijri.day} ${hijri.month} ${hijri.year} H`,
        fajr: prayer.fajr,
        sunrise: prayer.sunrise,
        dhuhr: prayer.dhuhr,
        asr: prayer.asr,
        maghrib: prayer.maghrib,
        isha: prayer.isha,
      });
    }
  }
  return results;
}
