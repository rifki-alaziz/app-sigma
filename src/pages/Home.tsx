import React from "react";
import MenuIcons from "../components/UI/MenuIcons";
import ArticleSlider from "../components/UI/ArticleSlider";
import VideoSlider from "../components/UI/VideoSlide";
import Gallery from "../components/Gallery";
import galleryData from "../data/galleryData.json";

const Home: React.FC = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="relative z-10 space-y-10 w-full px-2 pt-6 pb-10">
        <MenuIcons />
        <ArticleSlider />
        <VideoSlider />
        <Gallery
          images={galleryData.galleryImages}
          nextUrl="https://example.com/next-gallery"
        />
      </div>
    </div>
  );
};

export default Home;
