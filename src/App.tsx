import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { motion } from 'framer-motion';

const Layout = lazy(() => import('./components/Layout'));
const AdminLayout = lazy(() => import('./components/admin/AdminLayout'));
const Login = lazy(() => import('./pages/Login'));
const Home = lazy(() => import('./pages/Home'));
const Students = lazy(() => import('./pages/Students'));
const Teachers = lazy(() => import('./pages/Teachers'));
const StudentDetail = lazy(() => import('./pages/StudentDetail'));
const TeacherDetail = lazy(() => import('./pages/TeacherDetail'));
const StudentForm = lazy(() => import('./components/StudentForm'));
const TeacherForm = lazy(() => import('./components/TeacherForm'));
const DigitalFalak = lazy(() => import('./pages/DigitalFalak'));
const KalkulatorZakat = lazy(() => import('./pages/Zakat'));
const DoaPage = lazy(() => import('./pages/DoaPage'));
const Istigosah = lazy(() => import('./pages/Istigosah'));
const StorePage = lazy(() => import('./pages/StorePage'));
const ArticlePage = lazy(() => import('./pages/ArticlePage'));
const FiqihQA = lazy(() => import('./pages/FiqihQA'));
const AdminPage = lazy(() => import('./pages/AdminPage'));
const MahasantriManagement = lazy(() => import('./components/UI/MahasantriManagement'));
const MustahiqManagement = lazy(() => import('./components/UI/MustahiqManagement'));
const TokoManagement = lazy(() => import('./components/UI/TokoManagement'));
const VideoManagement = lazy(() => import('./components/UI/VideoManagement'));
const FiqhQAAdmin = lazy(() => import('./components/UI/FiqhQA'));
const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.div>
);

const AppRoutes: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={<Navigate to="/" replace />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="students" element={<PageWrapper><Students /></PageWrapper>} />
        <Route path="students/:id" element={<PageWrapper><StudentDetail /></PageWrapper>} />
        <Route
          path="students/add"
          element={
            <ProtectedRoute adminOnly>
              <PageWrapper><StudentForm /></PageWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="students/edit/:id"
          element={
            <ProtectedRoute adminOnly>
              <PageWrapper><StudentForm isEdit /></PageWrapper>
            </ProtectedRoute>
          }
        />
        <Route path="teachers" element={<PageWrapper><Teachers /></PageWrapper>} />
        <Route path="teachers/:id" element={<PageWrapper><TeacherDetail /></PageWrapper>} />
        <Route
          path="teachers/add"
          element={
            <ProtectedRoute adminOnly>
              <PageWrapper><TeacherForm /></PageWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="teachers/edit/:id"
          element={
            <ProtectedRoute adminOnly>
              <PageWrapper><TeacherForm isEdit /></PageWrapper>
            </ProtectedRoute>
          }
        />
        <Route path="falak" element={<PageWrapper><DigitalFalak /></PageWrapper>} />
        <Route path="zakat" element={<PageWrapper><KalkulatorZakat /></PageWrapper>} />
        <Route path="doa" element={<PageWrapper><DoaPage /></PageWrapper>} />
        <Route path="istigosah" element={<PageWrapper><Istigosah /></PageWrapper>} />
        <Route path="store" element={<PageWrapper><StorePage /></PageWrapper>} />
        <Route path="article/:articleId" element={<PageWrapper><ArticlePage /></PageWrapper>} />
        <Route path="fiqih" element={<PageWrapper><FiqihQA /></PageWrapper>} />
      </Route>

      <Route
        path="/admin"
        element={
          <ProtectedRoute adminOnly>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<PageWrapper><AdminPage /></PageWrapper>} />
        <Route path="mahasantri" element={<PageWrapper><MahasantriManagement /></PageWrapper>} />
        <Route path="mustahiq" element={<PageWrapper><MustahiqManagement /></PageWrapper>} />
        <Route path="toko" element={<PageWrapper><TokoManagement /></PageWrapper>} />
        <Route path="video" element={<PageWrapper><VideoManagement /></PageWrapper>} />
        <Route path="fiqh" element={<PageWrapper><FiqhQAAdmin /></PageWrapper>} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const App: React.FC = () => (
  <AuthProvider>
    <Router>
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            <div className="spinner"></div>
            <div className="text-blue-700 text-xl ml-4">Loading...</div>
          </div>
        }
      >
        <AppRoutes />
      </Suspense>
    </Router>
  </AuthProvider>
);

export default App;
