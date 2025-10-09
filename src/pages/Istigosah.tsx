import React, { useState } from "react";
import { BookOpen, Search, Plus, Eye, Edit, Trash2, Download, Upload } from "lucide-react";

// Interface untuk kitab
interface Kitab {
  id: number;
  title: string;
  author: string;
  description: string;
  category: string;
  pages: number;
  language: string;
  publishYear: number;
  status: 'available' | 'borrowed' | 'maintenance';
  borrowedBy?: string;
  borrowedDate?: string;
  returnDate?: string;
}

const Library: React.FC = () => {
  // State untuk daftar kitab
  const [kitabs, setKitabs] = useState<Kitab[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingKitab, setEditingKitab] = useState<Kitab | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    category: 'Al-Quran',
    pages: 0,
    language: 'Arab',
    publishYear: new Date().getFullYear(),
    status: 'available' as 'available' | 'borrowed' | 'maintenance'
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Semua");
  const [statusFilter, setStatusFilter] = useState("all");

  React.useEffect(() => {
    loadKitabs();
  }, []);

  const loadKitabs = () => {
    const savedKitabs = localStorage.getItem('kitabs');
    if (savedKitabs) {
      setKitabs(JSON.parse(savedKitabs));
    } else {
      const defaultKitabs: Kitab[] = [
        { 
          id: 1, 
          title: "Al-Qur'an Al-Karim", 
          author: "Allah SWT", 
          description: "Kitab suci umat Islam yang diturunkan kepada Nabi Muhammad SAW",
          category: "Al-Quran",
          pages: 604,
          language: "Arab",
          publishYear: 610,
          status: 'available'
        },
        { 
          id: 2, 
          title: "Tafsir Ibnu Katsir", 
          author: "Ibnu Katsir", 
          description: "Tafsir Al-Quran yang komprehensif dan mudah dipahami",
          category: "Tafsir",
          pages: 2400,
          language: "Arab",
          publishYear: 1365,
          status: 'available'
        },
        { 
          id: 3, 
          title: "Fathul Bari Syarh Shahih Bukhari", 
          author: "Ibnu Hajar Al-Asqalani", 
          description: "Syarah lengkap terhadap Shahih Bukhari",
          category: "Hadits",
          pages: 5000,
          language: "Arab",
          publishYear: 1449,
          status: 'borrowed',
          borrowedBy: 'Ahmad Fauzi',
          borrowedDate: '2024-01-15',
          returnDate: '2024-02-15'
        },
        { 
          id: 4, 
          title: "Riyadhus Shalihin", 
          author: "Imam An-Nawawi", 
          description: "Kumpulan hadits pilihan tentang akhlaq dan adab",
          category: "Hadits",
          pages: 800,
          language: "Arab",
          publishYear: 1277,
          status: 'available'
        },
        { 
          id: 5, 
          title: "Minhajul Muslim", 
          author: "Abu Bakar Jabir Al-Jazairi", 
          description: "Panduan lengkap kehidupan seorang muslim",
          category: "Fiqh",
          pages: 600,
          language: "Arab",
          publishYear: 1976,
          status: 'maintenance'
        },
        { 
          id: 6, 
          title: "Bulughul Maram", 
          author: "Ibnu Hajar Al-Asqalani", 
          description: "Kumpulan hadits hukum yang menjadi rujukan para fuqaha",
          category: "Hadits",
          pages: 450,
          language: "Arab",
          publishYear: 1449,
          status: 'available'
        }
      ];
      setKitabs(defaultKitabs);
      localStorage.setItem('kitabs', JSON.stringify(defaultKitabs));
    }
  };
  const categories = ["Semua", "Al-Quran", "Tafsir", "Hadits", "Fiqh", "Akhlaq", "Sejarah"];

  const filteredKitabs = kitabs.filter(
    (kitab) => {
      const matchesSearch = kitab.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           kitab.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === "Semua" || kitab.category === categoryFilter;
      const matchesStatus = statusFilter === "all" || kitab.status === statusFilter;
      return matchesSearch && matchesCategory && matchesStatus;
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingKitab) {
      const updatedKitabs = kitabs.map(kitab =>
        kitab.id === editingKitab.id ? { ...kitab, ...formData } : kitab
      );
      setKitabs(updatedKitabs);
      localStorage.setItem('kitabs', JSON.stringify(updatedKitabs));
    } else {
      const newKitab: Kitab = {
        id: Date.now(),
        ...formData
      };
      const updatedKitabs = [...kitabs, newKitab];
      setKitabs(updatedKitabs);
      localStorage.setItem('kitabs', JSON.stringify(updatedKitabs));
    }
    
    resetForm();
  };

  const handleEdit = (kitab: Kitab) => {
    setEditingKitab(kitab);
    setFormData({
      title: kitab.title,
      author: kitab.author,
      description: kitab.description,
      category: kitab.category,
      pages: kitab.pages,
      language: kitab.language,
      publishYear: kitab.publishYear,
      status: kitab.status
    });
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus kitab ini?')) {
      const updatedKitabs = kitabs.filter(kitab => kitab.id !== id);
      setKitabs(updatedKitabs);
      localStorage.setItem('kitabs', JSON.stringify(updatedKitabs));
    }
  };

  const handleBorrow = (id: number) => {
    const borrowerName = prompt('Masukkan nama peminjam:');
    if (borrowerName) {
      const updatedKitabs = kitabs.map(kitab =>
        kitab.id === id ? {
          ...kitab,
          status: 'borrowed' as const,
          borrowedBy: borrowerName,
          borrowedDate: new Date().toISOString().split('T')[0],
          returnDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        } : kitab
      );
      setKitabs(updatedKitabs);
      localStorage.setItem('kitabs', JSON.stringify(updatedKitabs));
    }
  };

  const handleReturn = (id: number) => {
    const updatedKitabs = kitabs.map(kitab =>
      kitab.id === id ? {
        ...kitab,
        status: 'available' as const,
        borrowedBy: undefined,
        borrowedDate: undefined,
        returnDate: undefined
      } : kitab
    );
    setKitabs(updatedKitabs);
    localStorage.setItem('kitabs', JSON.stringify(updatedKitabs));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      author: '',
      description: '',
      category: 'Al-Quran',
      pages: 0,
      language: 'Arab',
      publishYear: new Date().getFullYear(),
      status: 'available'
    });
    setEditingKitab(null);
    setShowForm(false);
  };

  const exportData = () => {
    const dataStr = JSON.stringify(kitabs, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'kitab-data.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target?.result as string);
          setKitabs(importedData);
          localStorage.setItem('kitabs', JSON.stringify(importedData));
          alert('Data berhasil diimpor!');
        } catch (error) {
          alert('Error importing data: ' + error);
        }
      };
      reader.readAsText(file);
    }
  };
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Tersedia</span>;
      case 'borrowed':
        return <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">Dipinjam</span>;
      case 'maintenance':
        return <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">Perbaikan</span>;
      default:
        return null;
    }
  };

  const getStatusCount = (status: string) => {
    return kitabs.filter(k => k.status === status).length;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-blue-600" />
            Perpustakaan Kitab Ijazahan
          </h1>
          <p className="text-gray-600 mt-1">Koleksi kitab-kitab klasik dan rujukan utama</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={exportData}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <label className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors flex items-center space-x-2 cursor-pointer">
            <Upload className="w-4 h-4" />
            <span>Import</span>
            <input
              type="file"
              accept=".json"
              onChange={importData}
              className="hidden"
            />
          </label>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Kitab</span>
          </button>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {editingKitab ? 'Edit Kitab' : 'Tambah Kitab Baru'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Judul Kitab"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Pengarang"
                  value={formData.author}
                  onChange={(e) => setFormData({...formData, author: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {categories.filter(c => c !== 'Semua').map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <input
                  type="number"
                  placeholder="Jumlah Halaman"
                  value={formData.pages}
                  onChange={(e) => setFormData({...formData, pages: parseInt(e.target.value)})}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Bahasa"
                  value={formData.language}
                  onChange={(e) => setFormData({...formData, language: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="number"
                  placeholder="Tahun Terbit"
                  value={formData.publishYear}
                  onChange={(e) => setFormData({...formData, publishYear: parseInt(e.target.value)})}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="available">Tersedia</option>
                  <option value="borrowed">Dipinjam</option>
                  <option value="maintenance">Perbaikan</option>
                </select>
              </div>
              <textarea
                placeholder="Deskripsi Kitab"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                rows={3}
                required
              />
              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingKitab ? 'Update' : 'Simpan'}
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <BookOpen className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{kitabs.length}</p>
              <p className="text-sm text-gray-600">Total Kitab</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-green-600 font-bold text-sm">✓</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{getStatusCount('available')}</p>
              <p className="text-sm text-gray-600">Tersedia</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-yellow-600 font-bold text-sm">📖</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{getStatusCount('borrowed')}</p>
              <p className="text-sm text-gray-600">Dipinjam</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-red-600 font-bold text-sm">🔧</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{getStatusCount('maintenance')}</p>
              <p className="text-sm text-gray-600">Perbaikan</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Cari berdasarkan judul atau pengarang"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-2">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Semua Status</option>
              <option value="available">Tersedia</option>
              <option value="borrowed">Dipinjam</option>
              <option value="maintenance">Perbaikan</option>
            </select>
          </div>
        </div>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredKitabs.map((kitab) => (
          <div key={kitab.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{kitab.title}</h3>
                  <p className="text-sm text-gray-600 mb-1">Pengarang: {kitab.author}</p>
                  <p className="text-sm text-gray-500 mb-3">{kitab.description}</p>
                </div>
                {getStatusBadge(kitab.status)}
              </div>

              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex justify-between">
                  <span>Kategori:</span>
                  <span className="font-medium">{kitab.category}</span>
                </div>
                <div className="flex justify-between">
                  <span>Halaman:</span>
                  <span className="font-medium">{kitab.pages}</span>
                </div>
                <div className="flex justify-between">
                  <span>Bahasa:</span>
                  <span className="font-medium">{kitab.language}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tahun:</span>
                  <span className="font-medium">{kitab.publishYear}</span>
                </div>
                {kitab.status === 'borrowed' && kitab.borrowedBy && (
                  <>
                    <div className="flex justify-between">
                      <span>Dipinjam oleh:</span>
                      <span className="font-medium">{kitab.borrowedBy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tanggal kembali:</span>
                      <span className="font-medium">{kitab.returnDate}</span>
                    </div>
                  </>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleEdit(kitab)}
                    className="text-green-600 hover:text-green-900 p-1 hover:bg-green-50 rounded"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(kitab.id)}
                    className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                {kitab.status === 'available' && (
                  <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                    onClick={() => handleBorrow(kitab.id)}
                    Pinjam
                  </button>
                )}
                {kitab.status === 'borrowed' && (
                  <button
                    onClick={() => handleReturn(kitab.id)}
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
                  >
                    Kembalikan
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredKitabs.length === 0 && (
        <div className="text-center py-12">
          <BookOpen size={48} className="text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">Tidak ada kitab ditemukan</h3>
          <p className="text-gray-500">Coba ubah filter atau kata kunci pencarian</p>
        </div>
      )}
    </div>
  );
};

export default Library;