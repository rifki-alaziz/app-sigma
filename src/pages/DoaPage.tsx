import React from 'react';
import { BookOpen } from 'lucide-react';

const doaList = [
  {
    title: 'Doa Sebelum Belajar',
    arab: 'رَبِّ زِدْنِي عِلْمًا وَارْزُقْنِي فَهْمًا',
    arti: 'Ya Allah, tambahkanlah aku ilmu dan berilah aku pemahaman.',
  },
  {
    title: 'Doa Sesudah Belajar',
    arab: 'اَللّٰهُمَّ انْفَعْنِيْ بِمَا عَلَّمْتَنِيْ وَعَلِّمْنِيْ مَا يَنْفَعُنِيْ',
    arti: 'Ya Allah, berikanlah manfaat atas ilmu yang Engkau ajarkan kepadaku dan ajarkanlah ilmu yang bermanfaat bagiku.',
  },
  // Tambahkan doa lain di sini sesuai kebutuhan
];

const DoaPage: React.FC = () => (
  <div className="max-w-2xl mx-auto py-10 px-4">
    <div className="flex items-center gap-3 mb-6 justify-center">
      <BookOpen className="w-8 h-8 text-yellow-500" />
      <h1 className="text-3xl font-bold text-center text-blue-700 tracking-tight">Kumpulan Doa</h1>
    </div>
    <div className="space-y-6">
      {doaList.map((doa, idx) => (
        <div key={idx} className="bg-white rounded-xl shadow p-5 border-l-4 border-yellow-400">
          <h2 className="text-lg font-bold text-yellow-600 mb-1">{doa.title}</h2>
          <div className="text-2xl text-gray-700 font-arabic mb-2 text-right">{doa.arab}</div>
          <div className="text-gray-600 text-sm">{doa.arti}</div>
        </div>
      ))}
    </div>
  </div>
);

export default DoaPage;
