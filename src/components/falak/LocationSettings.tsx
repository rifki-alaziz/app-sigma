import React, { useState } from "react";
import { Globe, ExternalLink } from "lucide-react";

interface Props {
  location: { latitude: number; longitude: number };
  setLocation: React.Dispatch<React.SetStateAction<{ latitude: number; longitude: number }>>;
  setLocationName: React.Dispatch<React.SetStateAction<string>>;
}

const LocationSettings: React.FC<Props> = ({ location, setLocation, setLocationName }) => {
  // Lokasi default Kediri
  const defaultLocation = {
    latitude: -7.817,
    longitude: 112.018,
    name: "5XJV+F99, Lirboyo, Kec. Mojoroto, Kota Kediri, Jawa Timur 64117",
  };

  const [lat, setLat] = useState(location.latitude.toString());
  const [lon, setLon] = useState(location.longitude.toString());

  // Update dari input manual
  const handleUpdate = () => {
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lon);
    setLocation({ latitude, longitude });
    setLocationName(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
  };

  // Gunakan lokasi GPS
  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setLocation({ latitude, longitude });
          setLocationName("Lokasi Saat Ini");
          setLat(latitude.toString());
          setLon(longitude.toString());
        },
        () => alert("Tidak bisa mengakses lokasi. Pastikan GPS aktif dan izin diberikan.")
      );
    } else {
      alert("Browser Anda tidak mendukung geolocation.");
    }
  };

  // Reset ke lokasi default Kediri
  const handleResetDefault = () => {
    setLocation({ latitude: defaultLocation.latitude, longitude: defaultLocation.longitude });
    setLocationName(defaultLocation.name);
    setLat(defaultLocation.latitude.toString());
    setLon(defaultLocation.longitude.toString());
  };

  // Link Google Maps otomatis
  const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;

  return (
    <div className="border rounded-2xl p-6 shadow-md">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Globe className="w-6 h-6" />
        Pengaturan Lokasi
      </h2>
      <div className="flex flex-col gap-2">
        <input
          type="text"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          placeholder="Latitude"
          className="border px-2 py-1 rounded"
        />
        <input
          type="text"
          value={lon}
          onChange={(e) => setLon(e.target.value)}
          placeholder="Longitude"
          className="border px-2 py-1 rounded"
        />
        <div className="flex gap-2 mt-2">
          <button
            onClick={handleUpdate}
            className="bg-green-600 text-white px-4 py-2 rounded-lg flex-1"
          >
            Update Lokasi
          </button>
          <button
            onClick={handleUseCurrentLocation}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex-1"
          >
            Gunakan Lokasi Saat Ini
          </button>
          <button
            onClick={handleResetDefault}
            className="bg-yellow-600 text-white px-4 py-2 rounded-lg flex-1"
          >
            Reset Lokasi Default
          </button>
        </div>

        <a
          href={googleMapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-blue-600 font-medium hover:underline"
        >
          <ExternalLink className="w-4 h-4" />
          Buka Lokasi di Google Maps
        </a>
      </div>
    </div>
  );
};

export default LocationSettings;
