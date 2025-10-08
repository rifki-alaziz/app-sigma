import React, { useState } from "react";
import { motion } from "framer-motion"; // Mengimpor Framer Motion

const VideoSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoVisible, setIsVideoVisible] = useState(false); // Menambahkan state untuk kontrol video

  // Daftar video YouTube dari channel Pondok Lirboyo
  const videos = [
    {
      id: 1,
      videoSrc: "https://www.youtube.com/embed/l8M8GJvabu0?autoplay=1", // Menambahkan ?autoplay=1
      thumbnailSrc: "https://img.youtube.com/vi/l8M8GJvabu0/0.jpg", // Thumbnail gambar
      title: "Takbiran Idul Adha 1446 H"
    },
    {
      id: 2,
      videoSrc: "https://www.youtube.com/embed/bipM0WUopRU?autoplay=1", // Menambahkan ?autoplay=1
      thumbnailSrc: "https://img.youtube.com/vi/bipM0WUopRU/0.jpg", // Thumbnail gambar
      title: "Kemeriahan Tahun Baru Hijriah 1446 H"
    },
    {
      id: 3,
      videoSrc: "https://www.youtube.com/embed/zvXSuwxYRq4?autoplay=1", // Menambahkan ?autoplay=1
      thumbnailSrc: "https://img.youtube.com/vi/zvXSuwxYRq4/0.jpg", // Thumbnail gambar
      title: "Kemeriahan Santri Lirboyo & Masyarakat Dalam Menyambut Tahun Baru Hijriyah 1445 H"
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % videos.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + videos.length) % videos.length
    );
  };

  const handleThumbnailClick = () => {
    setIsVideoVisible(true); // Menampilkan video ketika thumbnail diklik
  };

  const handleCloseModal = () => {
    setIsVideoVisible(false); // Menutup modal video
  };

  return (
    <div className="relative w-full max-w-xl mx-auto overflow-hidden rounded-xl shadow-lg">
      {/* Title with left alignment */}
      <div className="text-left mb-4 pl-4">
        <h2 className="text-xl font-semibold border-b-2 border-gray-400 inline-block pb-1">
          Video Playlist
        </h2>
      </div>

      {/* Video slider */}
      <div className="relative">
        {!isVideoVisible && (
          <motion.div
            className="relative"
            initial={{ opacity: 0 }} // Animasi awal
            animate={{ opacity: 1 }} // Animasi muncul
            exit={{ opacity: 0 }} // Animasi keluar
            transition={{ duration: 0.5 }} // Durasi animasi
          >
            <img
              src={videos[currentSlide].thumbnailSrc}
              alt={videos[currentSlide].title}
              className="w-full h-48 object-cover rounded-xl cursor-pointer transition-all duration-500 ease-in-out transform hover:scale-105"
              onClick={handleThumbnailClick} // Saat thumbnail diklik, video akan muncul
            />
            {/* Tombol Play */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.button
                onClick={handleThumbnailClick}
                className="bg-white p-4 rounded-full shadow-md hover:bg-gray-200 transition-all duration-300"
                whileHover={{ scale: 1.1 }} // Animasi tombol play saat hover
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7-7 7M5 5l7 7-7 7"
                  />
                </svg>
              </motion.button>
            </div>
          </motion.div>
        )}

        {isVideoVisible && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }} // Animasi awal opacity modal
            animate={{ opacity: 1 }} // Animasi modal muncul
            exit={{ opacity: 0 }} // Animasi modal hilang
            transition={{ duration: 0.5 }} // Durasi animasi
            onClick={handleCloseModal} // Menutup modal saat klik di luar gambar
          >
            <motion.div
              className="relative bg-white p-4 rounded-lg max-w-3xl mx-auto"
              onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup saat klik di dalam modal
              initial={{ y: "-100%" }} // Animasi awal keluar modal
              animate={{ y: "0" }} // Animasi modal muncul
              exit={{ y: "100%" }} // Animasi modal hilang ke bawah
              transition={{ type: "spring", stiffness: 300 }}
            >
              <iframe
                width="100%"
                height="100%"
                src={videos[currentSlide].videoSrc}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-64 object-cover rounded-xl"
              ></iframe>
              <h3 className="absolute bottom-5 left-5 text-white text-lg bg-black bg-opacity-50 px-4 py-2 rounded-md">
                {videos[currentSlide].title}
              </h3>
              {/* Tombol Tutup Modal */}
              <button
                onClick={handleCloseModal}
                className="absolute top-2 right-2 text-white bg-gray-800 p-2 rounded-full"
              >
                X
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Tombol navigasi */}
      <motion.button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 focus:outline-none transition-all duration-200"
        onClick={prevSlide}
        whileHover={{ scale: 1.1 }} // Animasi tombol saat hover
        transition={{ duration: 0.2 }}
      >
        &lt;
      </motion.button>
      <motion.button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 focus:outline-none transition-all duration-200"
        onClick={nextSlide}
        whileHover={{ scale: 1.1 }} // Animasi tombol saat hover
        transition={{ duration: 0.2 }}
      >
        &gt;
      </motion.button>
    </div>
  );
};

export default VideoSlider;
