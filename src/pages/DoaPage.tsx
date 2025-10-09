import React, { useState, useEffect } from 'react';
import { BookOpen, Plus, Edit, Trash2, Search } from 'lucide-react';

interface Doa {
  id: string;
  title: string;
  arab: string;
  arti: string;
  category: string;
  createdAt: string;
}

const DoaPage: React.FC = () => {
  const [doaList, setDoaList] = useState<Doa[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editingDoa, setEditingDoa] = useState<Doa | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    arab: '',
    arti: '',
    category: 'umum'
  });

  const categories = ['all', 'umum', 'belajar', 'makan', 'perjalanan', 'sholat', 'tidur'];

  useEffect(() => {
    loadDoa();
  }, []);

  const loadDoa = () => {
    const savedDoa = localStorage.getItem('doaList');
    if (savedDoa) {
      setDoaList(JSON.parse(savedDoa));
    } else {
      const defaultDoa: Doa[] = [
        {
          id: '1',
          title: 'Doa Sebelum Belajar',
          arab: 'رَبِّ زِدْنِي عِلْمًا وَارْزُقْنِي فَهْمًا',
          arti: 'Ya Allah, tambahkanlah aku ilmu dan berilah aku pemahaman.',
          category: 'belajar',
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Doa Sesudah Belajar',
          arab: 'اَللّٰهُمَّ انْفَعْنِيْ بِمَا عَلَّمْتَنِيْ وَعَلِّمْنِيْ مَا يَنْفَعُنِيْ',
          arti: 'Ya Allah, berikanlah manfaat atas ilmu yang Engkau ajarkan kepadaku dan ajarkanlah ilmu yang bermanfaat bagiku.',
          category: 'belajar',
          createdAt: new Date().toISOString()
        },
        {
          id: '3',
          title: 'Doa Sebelum Makan',
          arab: 'بِسْمِ اللهِ وَعَلَى بَرَكَةِ اللهِ',
          arti: 'Dengan nama Allah dan atas berkah Allah.',
          category: 'makan',
          createdAt: new Date().toISOString()
        },
        {
          id: '4',
          title: 'Doa Sesudah Makan',
          arab: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ',
          arti: 'Segala puji bagi Allah yang telah memberi kami makan dan minum serta menjadikan kami orang-orang muslim.',
          category: 'makan',
          createdAt: new Date().toISOString()
        }
      ];
      setDoaList(defaultDoa);
      localStorage.setItem('doaList', JSON.stringify(defaultDoa));
    }
  };

  const filteredDoa = doaList.filter(doa => {
    const matchesSearch = doa.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doa.arti.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || doa.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingDoa) {
      // Update existing doa
      const updatedDoa = doaList.map(doa =>
        doa.id === editingDoa.id ? { ...doa, ...formData } : doa
      );
      setDoaList(updatedDoa);
      localStorage.setItem('doaList', JSON.stringify(updatedDoa));
    } else {
      // Add new doa
      const newDoa: Doa = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString()
      };
      const updatedDoa = [...doaList, newDoa];
      setDoaList(updatedDoa);
      localStorage.setItem('doaList', JSON.stringify(updatedDoa));
    }
    
    resetForm();
  };

  const handleEdit = (doa: Doa) => {
    setEditingDoa(doa);
    setFormData({
      title: doa.title,
      arab: doa.arab,
      arti: doa.arti,
      category: doa.category
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus doa ini?')) {
      const updatedDoa = doaList.filter(doa => doa.id !== id);
      setDoaList(updatedDoa);
      localStorage.setItem('doaList', JSON.stringify(updatedDoa));
    }
  };

  const resetForm = () => {
    setFormData({ title: '', arab: '', arti: '', category: 'umum' });
    setEditingDoa(null);
    setShowForm(false);
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-yellow-500" />
          <h1 className="text-3xl font-bold text-blue-700 tracking-tight">Kumpulan Doa</h1>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Tambah Doa</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Cari doa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          />
        </div>
        
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category === 'all' ? 'Semua' : category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editingDoa ? 'Edit Doa' : 'Tambah Doa Baru'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Judul Doa"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                required
              />
              <textarea
                placeholder="Teks Arab"
                value={formData.arab}
                onChange={(e) => setFormData({...formData, arab: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 text-right"
                rows={3}
                required
              />
              <textarea
                placeholder="Arti/Terjemahan"
                value={formData.arti}
                onChange={(e) => setFormData({...formData, arti: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                rows={3}
                required
              />
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
              >
                {categories.filter(c => c !== 'all').map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="flex-1 bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition-colors"
                >
                  {editingDoa ? 'Update' : 'Simpan'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Doa List */}
      <div className="space-y-6">
        {filteredDoa.map((doa) => (
          <div key={doa.id} className="bg-white rounded-xl shadow p-5 border-l-4 border-yellow-400">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h2 className="text-lg font-bold text-yellow-600">{doa.title}</h2>
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                    {doa.category}
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(doa)}
                  className="text-blue-600 hover:text-blue-800 p-1"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(doa.id)}
                  className="text-red-600 hover:text-red-800 p-1"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <div className="text-2xl text-gray-700 font-arabic mb-2 text-right leading-relaxed">
              {doa.arab}
            </div>
            <div className="text-gray-600 text-sm italic">
              "{doa.arti}"
            </div>
          </div>
        ))}
      </div>

      {filteredDoa.length === 0 && (
        <div className="text-center py-12">
          <BookOpen size={48} className="text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">Tidak ada doa ditemukan</h3>
          <p className="text-gray-500">Coba ubah filter atau kata kunci pencarian</p>
        </div>
      )}
    </div>
  );
};

export default DoaPage;
