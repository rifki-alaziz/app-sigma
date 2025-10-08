import React, { useState } from "react";
import Sidebar from "../admin/components/Sidebar";
import Header from "../admin/components/Header";
import Dashboard from "../UI/Dashboard";
import MahasantriManagement from "../UI/MahasantriManagement";
import MustahiqManagement from "../UI/MustahiqManagement";
import TokoManagement from "../UI/TokoManagement";
import FiqhQA from "../UI/FiqhQA";
import ArticleManagement from "../UI/ArticleManagement";
import VideoManagement from "../UI/VideoManagement";

const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSidebarOpen(false); // close sidebar after choosing
  };

  const renderContent = () => {
    switch (activeTab) {
      case "mahasantri":
        return <MahasantriManagement />;
      case "mustahiq":
        return <MustahiqManagement />;
      case "toko":
        return <TokoManagement />;
      case "fiqh-qa":
        return <FiqhQA />;
      case "articles":
        return <ArticleManagement />;
      case "video":
        return <VideoManagement />;
      case "analytics":
        return (
          <div className="p-6">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Analytics</h2>
              <p className="text-gray-600">Analytics dashboard akan segera hadir</p>
            </div>
          </div>
        );
      case "settings":
        return (
          <div className="p-6">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Pengaturan</h2>
              <p className="text-gray-600">Halaman pengaturan akan segera hadir</p>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={toggleSidebar}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      <div className="lg:ml-64">
        <Header onMenuToggle={toggleSidebar} activeTab={activeTab} />
        <main className="min-h-[calc(100vh-theme(spacing.16))]">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
