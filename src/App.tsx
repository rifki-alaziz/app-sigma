import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';

const Layout = lazy(() => import('./components/Layout'));
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

const App: React.FC = () => (
  <Router>
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-blue-700 text-xl ml-4">Loading...</div>
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="students" element={<PageWrapper><Students /></PageWrapper>} />
          <Route path="students/:id" element={<PageWrapper><StudentDetail /></PageWrapper>} />
          <Route path="students/add" element={<PageWrapper><StudentForm /></PageWrapper>} />
          <Route path="students/edit/:id" element={<PageWrapper><StudentForm isEdit /></PageWrapper>} />
          <Route path="teachers" element={<PageWrapper><Teachers /></PageWrapper>} />
          <Route path="teachers/:id" element={<PageWrapper><TeacherDetail /></PageWrapper>} />
          <Route path="teachers/add" element={<PageWrapper><TeacherForm /></PageWrapper>} />
          <Route path="teachers/edit/:id" element={<PageWrapper><TeacherForm isEdit /></PageWrapper>} />
          <Route path="falak" element={<PageWrapper><DigitalFalak /></PageWrapper>} />
          <Route path="zakat" element={<PageWrapper><KalkulatorZakat /></PageWrapper>} />
          <Route path="doa" element={<PageWrapper><DoaPage /></PageWrapper>} />
          <Route path="istigosah" element={<PageWrapper><Istigosah /></PageWrapper>} />
          <Route path="store" element={<PageWrapper><StorePage /></PageWrapper>} />
          <Route path="article/:articleId" element={<PageWrapper><ArticlePage /></PageWrapper>} />
          <Route path="fiqih" element={<PageWrapper><FiqihQA /></PageWrapper>} />
        </Route>
      </Routes>
    </Suspense>
  </Router>
);

export default App;