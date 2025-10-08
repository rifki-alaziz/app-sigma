import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ArticlePage: React.FC = () => {
  const { articleId } = useParams(); // Mengambil articleId dari URL
  const [article, setArticle] = useState<any>(null);

  // Fungsi untuk mengambil detail artikel
  useEffect(() => {
    const fetchArticle = async () => {
      const articleData = {
        id: articleId,
        title: "Judul Artikel",
        image: "https://static.republika.co.id/uploads/images/inpicture_slide/ratusan-santri-berdoa-meminta-hujan-di-halaman-pondok-pesantren-_181026202134-254.jpg", // Gambar header besar
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras volutpat consectetur neque, 
                  sed consequat libero pharetra sit amet. Sed aliquam massa sit amet eros scelerisque, 
                  vel aliquam turpis elementum. Nam at augue lacus. Fusce aliquam suscipit sapien. Integer 
                  vitae ante vel neque facilisis vehicula non et erat. Etiam maximus augue at dictum auctor. 
                  Nulla facilisi. Ut volutpat, risus eu fringilla facilisis, eros velit vestibulum nulla, id 
                  consectetur enim lorem sed justo. Cras et erat sollicitudin, efficitur sapien non, venenatis 
                  metus.`
      };
      setArticle(articleData);
    };

    fetchArticle();
  }, [articleId]);

  if (!article) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Gambar penuh di bagian atas dengan radius di bagian bawah */}
      <div className="relative mb-6">
        <img
          src={article.image}
          alt={article.title}
          onError={(e) => {
            e.currentTarget.src = 'path_to_fallback_image.jpg'; // Fallback image jika gambar gagal
          }}
          className="w-full h-72 object-cover rounded-b-lg shadow-md"
        />
      </div>

      {/* Artikel dengan kotak transparan */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-2 space-y-4">
          <div className="bg-white bg-opacity-70 p-6 rounded-lg shadow-lg backdrop-blur-md">
            {/* Kotak transparan dengan padding, radius, dan efek blur */}
            <h1 className="text-[26px] font-bold text-gray-800">{article.title}</h1> {/* 26pt untuk judul */}
            <p className="text-[12px] text-gray-600">{article.content}</p> {/* 12pt untuk konten */}
          </div>
        </div>

        {/* Sidebar (jika diperlukan) */}
        <div className="space-y-4">
          <div className="bg-white bg-opacity-70 p-6 rounded-lg shadow-lg backdrop-blur-md">
            <h2 className="text-2xl font-semibold text-gray-700">Sidebar</h2>
            <p className="text-sm text-gray-500">
              This is a sidebar with related content or additional information. You can place links or
              any other relevant content here.
            </p>
          </div>
        </div>
      </div>

      {/* More Content */}
      <div className="space-y-4">
        <div className="bg-white bg-opacity-70 p-6 rounded-lg shadow-lg backdrop-blur-md">
          <h3 className="text-2xl font-semibold text-gray-700">More Content</h3>
          <p className="text-sm text-gray-500">
            You can add more paragraphs, images, or even videos to make the page more engaging. This section
            can be used for additional information that complements the main article.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
