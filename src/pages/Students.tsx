import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Users } from 'lucide-react';
import { Student, StudentCategory } from '../types';
import { STUDENT_CATEGORIES } from '../utils/constants';

const Students: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      // Coba ambil dari localStorage dulu
      const savedStudents = localStorage.getItem('students');
      if (savedStudents) {
        setStudents(JSON.parse(savedStudents));
      } else {
        // Jika tidak ada, gunakan data default
        const defaultStudents: Student[] = [
          {
            id: '1',
            name: 'Ahmad Fauzi',
            fatherName: 'Abdullah',
            birthDate: '2000-05-15',
            address: 'Jl. Masjid No. 123, Jakarta',
            category: 'jabodetabek',
            instagram: 'ahmad_fauzi',
            whatsapp: '081234567890',
            quotes: 'Menuntut ilmu adalah kewajiban setiap muslim',
            photo: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
            mapsUrl: 'https://maps.google.com/?q=-6.2088,106.8456',
            createdAt: '2024-01-15T10:30:00Z'
          },
          {
            id: '2',
            name: 'Muhammad Rizki',
            fatherName: 'Hasan',
            birthDate: '1999-08-22',
            address: 'Jl. Pondok Pesantren No. 45, Bandung',
            category: 'jawa-barat',
            instagram: 'rizki_muhammad',
            whatsapp: '081987654321',
            quotes: 'Barangsiapa yang menempuh jalan untuk mencari ilmu, maka Allah akan mudahkan baginya jalan menuju surga',
            photo: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
            mapsUrl: 'https://maps.google.com/?q=-6.9175,107.6191',
            createdAt: '2024-01-16T14:20:00Z'
          },
          {
            id: '3',
            name: 'Ali Akbar',
            fatherName: 'Omar',
            birthDate: '2001-03-10',
            address: 'Jl. Santri No. 67, Yogyakarta',
            category: 'yogyakarta',
            instagram: 'ali_akbar',
            whatsapp: '081122334455',
            quotes: 'Ilmu adalah cahaya yang menerangi kegelapan',
            photo: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
            mapsUrl: 'https://maps.google.com/?q=-7.7956,110.3695',
            createdAt: '2024-01-17T09:15:00Z'
          }
        ];
        setStudents(defaultStudents);
        localStorage.setItem('students', JSON.stringify(defaultStudents));
      }
    } catch (error) {
      console.error('Error loading students:', error);
    } finally {
      setLoading(false);
    }
  };
  const filteredStudents = students.filter((student) => {
    const matchesCategory = selectedCategory === 'all' || student.category === selectedCategory;
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.fatherName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryCount = (category: string) => {
    return students.filter((s) => s.category === category).length;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data mahasantri...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">Data Mahasantri</h1>
        <button
          onClick={() => navigate('/students/add')}
          className="bg-blue-600 text-white px-3 py-2 rounded-full flex items-center space-x-2 hover:bg-blue-700 transition-colors text-sm"
        >
          <Plus size={20} />
          <span>Tambah</span>
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Cari Mahasantri..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
        />
      </div>

      <div className="relative">
        <button
          className="w-full p-3 rounded-xl bg-white border border-gray-200 text-sm font-semibold text-gray-700 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          Pilih Kategori Mahasantri
        </button>

        {dropdownOpen && (
          <div className="absolute w-full bg-white border border-gray-200 mt-2 rounded-xl shadow-xl z-10 transition-opacity duration-500 opacity-100">
            <div className="flex justify-end p-2">
              <button
                onClick={() => setDropdownOpen(false)}
                className="text-sm text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                Tutup
              </button>
            </div>

            <div
              onClick={() => setSelectedCategory('all')}
              className={`p-3 cursor-pointer transition-all rounded-lg ${selectedCategory === 'all' ? 'bg-gray-800 text-white' : 'bg-white hover:bg-gray-100'}`}
            >
              <div className="flex items-center space-x-2">
                <div className="text-xl">📚</div>
                <div>
                  <h3 className="font-semibold text-sm">Semua Kategori</h3>
                  <p className="text-xs opacity-75">{students.length} Mahasantri</p>
                </div>
              </div>
            </div>

            {Object.entries(STUDENT_CATEGORIES).map(([key, category]) => (
              <div
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`p-3 cursor-pointer transition-all rounded-lg ${selectedCategory === key ? `${category.color} text-white` : 'bg-white hover:bg-gray-100'}`}
              >
                <div className="flex items-center space-x-2">
                  <div>
                    <h3 className="font-semibold text-sm">{category.label}</h3>
                    <p className="text-xs opacity-75">{getCategoryCount(key)} Mahasantri</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStudents.map((student) => {
          const cat = STUDENT_CATEGORIES[student.category as StudentCategory];
          return (
            <div
              key={student.id}
              onClick={() => navigate(`/students/${student.id}`)}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 overflow-hidden max-w-xs"
            >
              <div className="relative">
                <img
                  src={student.photo || 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400'}
                  alt={student.name}
                  className="w-full h-32 object-cover rounded-t-xl"
                />
                <div className={`absolute top-2 right-2 ${cat.color} text-white px-2 py-1 rounded-full text-xs font-medium`}>
                  {cat.label}
                </div>
              </div>

              <div className="p-3">
                <h3 className="text-base font-semibold text-gray-800 mb-2">{student.name}</h3>
              </div>
            </div>
          );
        })}
      </div>

      {filteredStudents.length === 0 && (
        <div className="text-center py-12">
          <Users size={48} className="text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">Tidak ada Mahasantri ditemukan</h3>
          <p className="text-gray-500">Coba ubah filter atau kata kunci pencarian</p>
        </div>
      )}
    </div>
  );
};

export default Students;
