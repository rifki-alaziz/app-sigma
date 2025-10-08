import React from 'react';
import { useNavigate } from 'react-router-dom';

// Perbarui interface props untuk menambahkan 'subtitle'
interface ArticleCardProps {
  title: string;
  subtitle: string; // Properti baru untuk subtitle/tahun
  image: string;
  excerpt: string;
  articleId: string; // ID artikel untuk rute dinamis
}

const ArticleCard: React.FC<ArticleCardProps> = ({ title, subtitle, image, excerpt, articleId }) => {
  const navigate = useNavigate(); // Hook untuk navigasi

  // Fungsi untuk menangani klik pada kartu artikel
  const handleClick = () => {
    navigate(`/article/${articleId}`); // Mengarahkan ke halaman artikel dengan ID dinamis
  };

  return (
    <div
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 group cursor-pointer"
      onClick={handleClick} // Menambahkan event klik untuk navigasi
    >
      <div className="overflow-hidden rounded-t-xl">
        <img
          src={image}
          alt={title}
          className="w-full h-40 sm:h-36 md:h-40 lg:h-44 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        {/* Menampilkan subtitle di bawah judul */}
        <p className="text-sm text-gray-500 mb-1">{subtitle}</p> {/* Menambahkan subtitle */}
        <h3 className="text-md font-semibold text-gray-800 mb-2 line-clamp-2">{title}</h3>
        <p className="text-sm text-gray-600 line-clamp-3">{excerpt}</p>
      </div>
    </div>
  );
};

export default ArticleCard;
