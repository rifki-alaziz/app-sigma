import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, GraduationCap } from 'lucide-react';
import { Teacher } from '../types';

const Teachers: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadTeachers();
  }, []);

  const loadTeachers = async () => {
    try {
      // Coba ambil dari localStorage dulu
      const savedTeachers = localStorage.getItem('teachers');
      if (savedTeachers) {
        setTeachers(JSON.parse(savedTeachers));
      } else {
        // Jika tidak ada, gunakan data default
        const defaultTeachers: Teacher[] = [
          {
            id: '1',
            name: 'Ustadz Ahmad Syaiful',
            fatherName: 'Muhammad',
            birthDate: '1980-07-12',
            address: 'Jl. Ulama No. 88, Jakarta',
            subject: 'Fiqh & Hadits',
            instagram: 'ustadz_ahmad',
            whatsapp: '081234567890',
            quotes: 'Mengajar adalah ibadah yang mulia',
            photo: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400',
            catatan: 'Spesialis dalam bidang fiqh muamalah dan hadits',
            createdAt: '2024-01-10T08:00:00Z'
          },
          {
            id: '2',
            name: 'Ustadzah Fatimah',
            fatherName: 'Ibrahim',
            birthDate: '1985-11-25',
            address: 'Jl. Muslimah No. 45, Bandung',
            subject: 'Akhlaq & Adab',
            instagram: 'ustadzah_fatimah',
            whatsapp: '081987654321',
            quotes: 'Akhlaq yang baik adalah perhiasan seorang muslimah',
            photo: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400',
            catatan: 'Ahli dalam pendidikan akhlaq dan adab islami',
            createdAt: '2024-01-11T10:30:00Z'
          },
          {
            id: '3',
            name: 'Ustadz Muhammad Rizki',
            fatherName: 'Ali',
            birthDate: '1978-04-18',
            address: 'Jl. Qurra No. 22, Yogyakarta',
            subject: 'Tajwid & Qiraat',
            instagram: 'ustadz_rizki',
            whatsapp: '081122334455',
            quotes: 'Al-Quran adalah pedoman hidup yang sempurna',
            photo: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400',
            catatan: 'Hafidz 30 juz dengan sanad qiraat yang kuat',
            createdAt: '2024-01-12T15:45:00Z'
          }
        ];
        setTeachers(defaultTeachers);
        localStorage.setItem('teachers', JSON.stringify(defaultTeachers));
      }
    } catch (error) {
      console.error('Error loading teachers:', error);
    } finally {
      setLoading(false);
    }
  };
  const filteredTeachers = teachers.filter(teacher =>
    (teacher.name || '').toLowerCase().includes((searchTerm || '').toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data mustahiq...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">Data Mustahiq</h1>
        <button
          onClick={() => navigate('/teachers/add')}
          className="bg-green-600 text-white px-3 py-2 rounded-md flex items-center space-x-2 hover:bg-green-700 transition-colors text-sm"
        >
          <Plus size={20} />
          <span>Tambah</span>
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Cari guru..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTeachers.map((teacher) => (
          <div
            key={teacher.id}
            onClick={() => navigate(`/teachers/${teacher.id}`)}
            className="bg-white rounded-md shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer transform hover:-translate-y-1 overflow-hidden max-w-xs"
          >
            <div className="relative">
              <img
                src={teacher.photo || 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400'}
                alt={teacher.name}
                className="w-full h-32 object-cover rounded-t-md"
              />
            </div>

            <div className="p-3">
              <h3 className="text-base font-semibold text-gray-800 mb-2">{teacher.name}</h3>
            </div>
          </div>
        ))}
      </div>

      {filteredTeachers.length === 0 && (
        <div className="text-center py-12">
          <GraduationCap size={48} className="text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">Tidak ada guru ditemukan</h3>
          <p className="text-gray-500">Coba ubah kata kunci pencarian</p>
        </div>
      )}
    </div>
  );
};

export default Teachers;
