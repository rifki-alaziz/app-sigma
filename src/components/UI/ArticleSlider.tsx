import React from 'react';
import ArticleCard from '../ArticleCard';

// Data yang menggambarkan perkembangan satu angkatan
interface Tahap {
  id: number;
  tingkat: string;
  year: string;
  image: string;
  description: string;
  articleId: string;  // Menambahkan articleId
}

const perkembanganAngkatan: Tahap[] = [
  {
    id: 1,
    tingkat: 'Tingkat I: Tahap Adaptasi',
    year: 'Tahun Pertama',
    image: 'https://static.republika.co.id/uploads/images/inpicture_slide/ratusan-santri-berdoa-meminta-hujan-di-halaman-pondok-pesantren-_181026202134-254.jpg',
    description: 'Fokus pada pengenalan lingkungan pesantren, penguasaan dasar-dasar nahwu dan shorof.',
    articleId: '1', // Menambahkan articleId
  },
  {
    id: 2,
    tingkat: 'Tingkat II: Tahap Konsolidasi',
    year: 'Tahun Kedua',
    image: 'https://assets.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/radarkediri/2023/03/IMG_6169.jpg',
    description: 'Mendalami kitab-kitab dasar, aktif dalam organisasi, dan mulai mengembangkan minat dan bakat keilmuan.',
    articleId: '2', // Menambahkan articleId
  },
  {
    id: 3,
    tingkat: 'Tingkat III: Tahap Spesialisasi',
    year: 'Tahun Ketiga',
    image: 'https://img.merahputih.com/media/5c/d8/98/5cd89897787e21141322d189b47282bf.jpg',
    description: 'Santri mulai memilih spesialisasi ilmu (misalnya Fikih, Tafsir, atau Hadits) dan menorehkan prestasi di tingkat regional.',
    articleId: '3', // Menambahkan articleId
  },
  {
    id: 4,
    tingkat: 'Tingkat IV: Tahap Kepemimpinan',
    year: 'Tahun Keempat',
    image: 'https://images.unsplash.com/photo-1627448834789-f53835f8e56c',
    description: 'Diberi tanggung jawab sebagai asisten guru atau pengurus organisasi, melatih jiwa kepemimpinan dan pengabdian.',
    articleId: '4', // Menambahkan articleId
  },
  {
    id: 5,
    tingkat: 'Tingkat V: Tahap Pengabdian',
    year: 'Tahun Kelima',
    image: 'https://images.unsplash.com/photo-1627448834789-f53835f8e56c',
    description: 'Mempersiapkan diri untuk terjun ke masyarakat, mengamalkan ilmu yang sudah didapat, dan menjadi agen perubahan.',
    articleId: '5', // Menambahkan articleId
  },
];

const PerkembanganSlider: React.FC = () => {
  return (
    <section className="py-6"> {/* Menghapus bg-gray-50 */}
      <div className="max-w-6xl mx-auto px-4">
        {/* Judul utama yang lebih spesifik */}
        <h2 className="text-lg font-semibold text-gray-800 border-b-2 border-blue-400 inline-block mb-4">
          Kisah Kami
        </h2>

        <div className="flex space-x-4 overflow-x-auto pb-2 flex-nowrap p-2 scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-blue-100 scroll-smooth">
          {perkembanganAngkatan.map((tahap) => (
            <div
              key={tahap.id}
              className="flex-shrink-0 w-56 sm:w-52 md:w-56 lg:w-60 hover:scale-105 transition-transform duration-300"
            >
              <ArticleCard
                title={tahap.tingkat}
                subtitle={tahap.year}
                image={tahap.image}
                excerpt={tahap.description}
                articleId={tahap.articleId} // Menyertakan articleId
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PerkembanganSlider;
