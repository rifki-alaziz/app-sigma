import React, { useState, useEffect } from "react";
import { Navigation } from "lucide-react";
import { type QiblaDirection } from "../../utils/falakCalculations";

interface Props {
  qiblaDirection: QiblaDirection | null;
}

const QiblaDirectionCard: React.FC<Props> = ({ qiblaDirection }) => {
  const [needleRotation, setNeedleRotation] = useState(qiblaDirection?.degrees ?? 0);

  useEffect(() => {
    if (!qiblaDirection) return;

    const handleOrientation = (event: DeviceOrientationEvent) => {
      const alpha = event.alpha ?? 0;
      const bearing = qiblaDirection.degrees - alpha;
      setNeedleRotation(bearing);
    };

    window.addEventListener("deviceorientationabsolute", handleOrientation, true);
    return () => {
      window.removeEventListener("deviceorientationabsolute", handleOrientation);
    };
  }, [qiblaDirection]);

  if (!qiblaDirection) return null;

  return (
    <div className="border rounded-2xl p-6 shadow-md flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Navigation className="w-6 h-6" />
        Arah Kiblat
      </h2>
      <div className="w-40 h-40 rounded-full border-4 border-gray-300 flex items-center justify-center relative">
        <Navigation
          className="w-12 h-12 text-green-600 absolute"
          style={{ transform: `rotate(${needleRotation}deg)` }}
        />
      </div>
      <p className="mt-4">Sudut: {needleRotation.toFixed(2)}°</p>
    </div>
  );
};

export default QiblaDirectionCard;
