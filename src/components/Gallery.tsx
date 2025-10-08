import React, { useState } from "react";
import { motion } from "framer-motion";

interface GalleryProps {
  images: string[];
  nextUrl: string;
}

const Gallery: React.FC<GalleryProps> = ({ images, nextUrl }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentPage] = useState(1);
  const imagesPerPage = 6;

  const currentImages = images.slice((currentPage - 1) * imagesPerPage, currentPage * imagesPerPage);

  const openPreview = (image: string) => {
    setSelectedImage(image);
  };

  const closePreview = () => {
    setSelectedImage(null);
  };

  const goToNextGallery = () => {
    window.location.href = nextUrl;
  };

  return (
    <div className="my-10">
      <h2 className="text-2xl font-bold text-center mb-4">Galeri Foto</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {currentImages.map((image, index) => {
          const isLargeImage = index % 3 === 0;
          return (
            <div
              key={index}
              className={`relative overflow-hidden rounded-lg shadow-md ${
                isLargeImage ? "col-span-2 row-span-2" : ""
              }`}
            >
              <motion.img
                src={image}
                alt={`Gallery ${index + 1}`}
                className="w-full h-full object-cover transition-transform transform hover:scale-105 cursor-pointer"
                onClick={() => openPreview(image)}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            </div>
          );
        })}
      </div>

      {currentImages.length === imagesPerPage && (
        <div className="text-center mt-6">
          <button
            onClick={goToNextGallery}
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all"
          >
            Lihat Galeri Selanjutnya
          </button>
        </div>
      )}

      {selectedImage && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closePreview}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div
            className="relative bg-white p-4 rounded-lg max-w-3xl mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.img
              src={selectedImage}
              alt="Selected Preview"
              className="w-full h-full object-contain"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
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
