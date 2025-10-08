import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn, User, Lock } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import sigmaLogo from "../assets/sigma.png";
import arabicPattern from "../assets/bg.jpg";
import { motion, AnimatePresence } from "framer-motion";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showSplash, setShowSplash] = useState(false);
  const [initialSplash, setInitialSplash] = useState(true);
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Splash pertama kali buka aplikasi
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialSplash(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";
      const res = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.message || "Username atau password salah");
      }

      const data = await res.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);

      setShowSplash(true);

      timeoutRef.current = setTimeout(() => {
        if (data.user.role === "admin") {
          navigate("/admin"); // 👉 Admin ke dashboard
        } else {
          navigate("/"); // 👉 User biasa ke home
        }
      }, 2500);
    } catch (err: any) {
      setError(err.message || "Gagal login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <>
      {/* Splashscreen Modern - Pertama Kali Buka App */}
      <AnimatePresence>
        {initialSplash && (
          <motion.div
            key="initial-splash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
            style={{
              backgroundImage: `url(${arabicPattern})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundAttachment: "fixed",
            }}
          >
            <motion.img
              src={sigmaLogo}
              alt="SIGMA Logo"
              className="w-28 h-28 mb-6 drop-shadow-2xl"
              initial={{ scale: 0, rotate: -180, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              style={{ filter: "drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.5))" }}
            />
            <motion.h1
              className="text-3xl font-bold text-yellow-500"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              SIGMA App
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Splashscreen Modern - Setelah Login */}
      <AnimatePresence mode="wait">
        {showSplash && (
          <motion.div
            key="splash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
            style={{
              backgroundImage: `url(${arabicPattern})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundAttachment: "fixed",
            }}
          >
            <motion.img
              src={sigmaLogo}
              alt="SIGMA Logo"
              className="w-24 h-24 mb-4 drop-shadow-2xl"
              draggable={false}
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ duration: 1 }}
              style={{ filter: "drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.5))" }}
            />
            <motion.h1
              className="text-4xl font-bold text-yellow-500 mb-2"
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Selamat Datang
            </motion.h1>
            <motion.span
              className="text-5xl font-extrabold text-yellow-300 tracking-wide mb-8 drop-shadow"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              di App SIGMA
            </motion.span>
            <motion.div
              className="w-12 h-12 border-4 border-white border-dashed rounded-full"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form Login */}
      {!initialSplash && (
        <div
          className="min-h-screen flex items-center justify-center px-4"
          style={{
            backgroundImage: `url(${arabicPattern})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
          }}
        >
          <div className="bg-white/70 rounded-2xl shadow-lg p-8 w-full max-w-md">
            <div className="text-center mb-8">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <LogIn className="w-8 h-8 text-blue-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Selamat Datang</h1>
              <p className="text-gray-600 mt-2">Silahkan Masuk Dulu Guys</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    autoComplete="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Masukkan username"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Masukkan password"
                    required
                  />
                </div>
              </div>

              {error && (
                <motion.div
                  className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {error}
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={loading || showSplash}
                className={`w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors ${
                  loading || showSplash
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
                whileTap={{ scale: 0.95 }}
                animate={{ opacity: loading ? 0.7 : 1 }}
                transition={{ duration: 0.3 }}
              >
                {loading ? (
                  <motion.div
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: "linear",
                      }}
                    />
                    Loading...
                  </motion.div>
                ) : (
                  "Masuk"
                )}
              </motion.button>
            </form>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Demo Account:</p>
              <div className="text-xs space-y-1">
                <p>
                  <strong>Admin:</strong> admin / admin123
                </p>
                <p>
                  <strong>User:</strong> user / user123
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
