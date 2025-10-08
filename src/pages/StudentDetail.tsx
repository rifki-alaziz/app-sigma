import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, Instagram, MessageCircle, MapPin, Calendar, User } from 'lucide-react';
import { Student, StudentCategory } from '../types';
import { STUDENT_CATEGORIES } from '../utils/constants';
import { useAuth } from '../context/AuthContext';

// Helper function for Google Maps embed

const StudentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [student, setStudent] = useState<Student | null>(null);
  const [overlayVisible, setOverlayVisible] = useState(false); // Untuk overlay transparan

  useEffect(() => {
    // Fetch student data
    fetch(`http://localhost:3001/api/students/${id}`, {
      headers: {
        Authorization: 'Bearer secret-token'
      }
    })
      .then(res => res.json())
      .then(data => setStudent(data))
      .catch(err => console.error('Gagal mengambil data Mahasantri:', err));

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'PrintScreen') {
        setOverlayVisible(true);  // Tampilkan overlay jika PrintScreen ditekan
        setTimeout(() => setOverlayVisible(false), 1000); // Sembunyikan overlay setelah 1 detik
        event.preventDefault(); // Mencegah aksi default PrintScreen
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data Mahasantri ini?')) {
      try {
        const res = await fetch(`http://localhost:3001/api/students/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: 'Bearer secret-token'
          }
        });
        if (!res.ok) throw new Error('Gagal menghapus data Mahasantri');
        navigate('/students');
      } catch (err) {
        alert(err);
      }
    }
  };

  if (!student) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-600">Mahasantri tidak ditemukan</h3>
      </div>
    );
  }

  const category = STUDENT_CATEGORIES[student.category as StudentCategory];

  return (
    <div className="min-h-screen p-4">
      {/* Back Button and Actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/students')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Kembali ke Daftar Mahasantri</span>
        </button>

        {user?.role === 'admin' && (
          <div className="flex space-x-2">
            <button
              onClick={() => navigate(`/students/edit/${student.id}`)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
            >
              <Edit size={16} />
              <span>Edit</span>
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-red-700 transition-colors"
            >
              <Trash2 size={16} />
              <span>Hapus</span>
            </button>
          </div>
        )}
      </div>

      {/* Student Detail Card */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="relative">
          <img
            src={student.photo || 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=800'}
            alt={student.name}
            className="w-full h-64 object-cover"
          />
          <div className={`absolute top-4 right-4 ${category.color} text-white px-4 py-2 rounded-full font-medium`}>
            {category.label}
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{student.name}</h1>
                <p className="text-gray-600">{category.description}</p>
              </div>

              <div className="space-y-4">
                {/* Father's Name */}
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Nama Ayah</p>
                    <p className="font-medium text-gray-800">{student.fatherName}</p>
                  </div>
                </div>

                {/* Birth Date */}
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Tanggal Lahir</p>
                    <p className="font-medium text-gray-800">{new Date(student.birthDate).toLocaleDateString('id-ID')}</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start space-x-3">
                  <MapPin className="w-6 h-6 text-blue-500 mt-1" />
                  <div className="w-full">
                    <p className="text-sm text-gray-500 font-semibold mb-1 flex items-center gap-1">
                      Alamat Lengkap
                      {student.mapsUrl && (
                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full bg-blue-100 text-xs font-medium text-blue-700 animate-pulse">
                          <MapPin className="w-4 h-4 mr-1" /> Maps Tersedia
                        </span>
                      )}
                    </p>
                    <p className="font-medium text-gray-800 mb-2">{student.address}</p>

                    {/* Tampilkan Ikon Lokasi jika URL ada */}
                    {student.mapsUrl && (
                      <div className="bg-blue-50 rounded-xl shadow-lg p-4 mb-3 border border-blue-100">
                        <a
                          href={student.mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-900 hover:underline font-semibold mb-3 transition-colors"
                        >
                          <MapPin className="w-5 h-5" />
                          <span>Lihat di Google Maps</span>
                        </a>
                      </div>
                    )}

                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {student.quotes && (
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="font-semibold text-blue-800 mb-3">Quotes Inspiratif</h3>
                  <blockquote className="text-blue-700 italic text-lg leading-relaxed">
                    "{student.quotes}"
                  </blockquote>
                </div>
              )}

              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800">Kontak & Social Media</h3>

                {student.whatsapp && (
                  <a
                    href={`https://wa.me/${student.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium text-green-800">WhatsApp</p>
                      <p className="text-sm text-green-600">{student.whatsapp}</p>
                    </div>
                  </a>
                )}

                {student.instagram && (
                  <a
                    href={`https://instagram.com/${student.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-3 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors"
                  >
                    <Instagram className="w-5 h-5 text-pink-600" />
                    <div>
                      <p className="font-medium text-pink-800">Instagram</p>
                      <p className="text-sm text-pink-600">@{student.instagram}</p>
                    </div>
                  </a>
                )}
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">
                  Data dibuat pada: {new Date(student.createdAt).toLocaleDateString('id-ID')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menambahkan overlay transparan untuk menutupi konten saat PrintScreen terdeteksi */}
      {overlayVisible && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            zIndex: 1000,
          }}
        ></div>
      )}
    </div>
  );
};

export default StudentDetail;
