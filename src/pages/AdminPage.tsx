import React, { Suspense, lazy } from 'react';

// Lazy-load komponen admin
const MahasantriManagement = lazy(() => import('../components/UI/MahasantriManagement'));
const MustahiqManagement = lazy(() => import('../components/UI/MustahiqManagement'));
const TokoManagement = lazy(() => import('../components/UI/TokoManagement'));
const VideoManagement = lazy(() => import('../components/UI/VideoManagement'));
const FiqhQAAdmin = lazy(() => import('../components/UI/FiqhQA'));

const AdminPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <Suspense fallback={<div>Loading Admin Components...</div>}>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Mahasantri Management</h2>
          <MahasantriManagement />
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Mustahiq Management</h2>
          <MustahiqManagement />
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Toko Management</h2>
          <TokoManagement />
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Video Management</h2>
          <VideoManagement />
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Fiqh Q&A (Admin)</h2>
          <FiqhQAAdmin />
        </section>
      </Suspense>
    </div>
  );
};

export default AdminPage;
