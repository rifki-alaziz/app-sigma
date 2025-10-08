import React, { useState } from "react";

// Interface untuk kitab
interface Kitab {
  id: number;
  title: string;
  author: string;
}

const Library: React.FC = () => {
  // State untuk daftar kitab
  const [kitabs] = useState<Kitab[]>([
    { id: 1, title: "Al-Qur'an", author: "Allah SWT" },
    { id: 2, title: "Tafsir Ibnu Katsir", author: "Ibnu Katsir" },
    { id: 3, title: "Fathul Bari", author: "Ibnu Hajar" },
  ]);

  const [] = useState({ title: "", author: "" });
  const [searchQuery, setSearchQuery] = useState("");

  const filteredKitabs = kitabs.filter(
    (kitab) =>
      kitab.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      kitab.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Daftar Kitab Ijazahan</h1>

      
      {/* Pencarian Kitab */}
      <div className="mb-6">
        <h2 className="text-xl mb-2">Cari Kitab</h2>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 w-full"
          placeholder="Cari berdasarkan judul atau pengarang"
        />
      </div>

      {/* Daftar Kitab */}
      <h2 className="text-xl mb-4">Daftar Kitab</h2>
      <ul className="space-y-4">
        {filteredKitabs.map((kitab) => (
          <li key={kitab.id} className="border p-4 rounded">
            <h3 className="text-lg font-semibold">{kitab.title}</h3>
            <p className="text-gray-600">{kitab.author}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Library;
