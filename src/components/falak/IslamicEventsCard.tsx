import React from "react";
import { Star } from "lucide-react";
import { type IslamicEvent } from "../../utils/falakCalculations";

interface Props {
  islamicEvents: IslamicEvent[];
  currentTime: Date;
}

const IslamicEventsCard: React.FC<Props> = ({ islamicEvents, currentTime }) => {
  // Ambil tanggal hari ini dalam format "dd/mm/yyyy"
  const today = currentTime.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  // Filter event yang jatuh pada hari ini
  const todaysEvents = islamicEvents.filter(event => event.date === today);

  return (
    <div className="border rounded-2xl p-6 shadow-md">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Star className="w-6 h-6" />
        Peristiwa Islam
      </h2>
      <ul className="list-disc list-inside">
        {todaysEvents.length > 0 ? (
          todaysEvents.map((event, idx) => (
            <li key={idx}>
              {event.name} – {event.date}
            </li>
          ))
        ) : (
          <li>Tidak ada peristiwa pada hari ini</li>
        )}
      </ul>
    </div>
  );
};

export default IslamicEventsCard;
