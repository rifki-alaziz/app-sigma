import React, { useState } from "react";
import { motion } from "framer-motion"; // Mengimpor Framer Motion

interface GalleryProps {
  images: string[];
  nextUrl: string; // Properti nextUrl ditambahkan
}

const Gallery: React.FC<GalleryProps> = ({ images, nextUrl }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentPage] = useState(1); // Halaman saat ini
  const imagesPerPage = 6; // Jumlah gambar yang ditampilkan per halaman

  // Menentukan gambar yang akan ditampilkan berdasarkan halaman
  const currentImages = images.slice((currentPage - 1) * imagesPerPage, currentPage * imagesPerPage);

  // Fungsi untuk membuka popup dengan gambar yang dipilih
  const openPreview = (image: string) => {
    setSelectedImage(image);
  };

  // Fungsi untuk menutup popup
  const closePreview = () => {
    setSelectedImage(null);
  };

  // Fungsi untuk melanjutkan ke galeri berikutnya

  // Fungsi untuk mengarahkan ke URL yang ditentukan
  const goToNextGallery = () => {
    window.location.href = nextUrl; // Arahkan ke URL berikutnya
  };

  return (
    <div className="my-10">
      <h2 className="text-2xl font-bold text-center mb-4">Galeri Foto</h2>
      
      {/* Menampilkan gambar dalam grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {currentImages.map((image, index) => {
          const isLargeImage = index % 3 === 0; // Menentukan gambar besar setiap 3 gambar
          return (
            <div
              key={index}
              className={`relative overflow-hidden rounded-lg shadow-md ${
                isLargeImage ? "col-span-2 row-span-2" : "" // Gambar besar menggunakan col-span-2 dan row-span-2
              }`}
            >
              <motion.img
                src={image}
                alt={`Gallery ${index + 1}`}
                className="w-full h-full object-cover transition-transform transform hover:scale-105 cursor-pointer"
                onClick={() => openPreview(image)} // Mengaktifkan preview saat gambar diklik
                whileHover={{ scale: 1.05 }} // Efek pembesaran saat hover
                transition={{ type: "spring", stiffness: 300 }}
              />
            </div>
          );
        })}
      </div>

      {/* Tombol Lihat Galeri Selanjutnya */}
      {currentImages.length === imagesPerPage && (
        <div className="text-center mt-6">
          <button
            onClick={goToNextGallery} // Arahkan ke URL berikutnya
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all"
          >
            Lihat Galeri Selanjutnya
          </button>
        </div>
      )}

      {/* Modal untuk preview gambar */}
      {selectedImage && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closePreview} // Menutup modal saat klik di luar gambar
          initial={{ opacity: 0 }} // Animasi awal opacity modal
          animate={{ opacity: 1 }} // Animasi masuk modal
          exit={{ opacity: 0 }} // Animasi keluar modal
          transition={{ duration: 0.3 }} // Durasi animasi
        >
          <div
            className="relative bg-white p-4 rounded-lg max-w-3xl mx-auto"
            onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup saat klik di dalam modal
          >
            <motion.img
              src={selectedImage}
              alt="Selected Preview"
              className="w-full h-full object-contain"
              initial={{ scale: 0.8 }} // Animasi awal gambar kecil
              animate={{ scale: 1 }} // Animasi gambar besar
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            />
            <button
              onClick={closePreview}
              className="absolute top-2 right-2 text-white bg-gray-800 p-2 rounded-full"
            >
              X
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Gallery;
