import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Users } from 'lucide-react';
import { Student, StudentCategory } from '../types';
import { STUDENT_CATEGORIES } from '../utils/constants';
import { useAuth } from '../context/AuthContext';

const Students: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    fetch('http://localhost:3001/api/students', {
      headers: {
        Authorization: 'Bearer secret-token',
      },
    })
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error('Gagal mengambil data Mahasantri:', err));
  }, []);

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

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">Data Mahasantri</h1>
        {user?.role === 'admin' && (
          <button
            onClick={() => navigate('/students/add')}
            className="bg-blue-600 text-white px-3 py-2 rounded-full flex items-center space-x-2 hover:bg-blue-700 transition-colors text-sm"
          >
            <Plus size={20} />
            <span>Tambah</span>
          </button>
        )}
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
