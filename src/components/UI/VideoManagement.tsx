import { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Eye, Video, Play, Clock, User, ExternalLink } from 'lucide-react';

const videoData = [
  {
    id: 1,
    title: 'Belajar Tajwid Dasar - Hukum Nun Mati dan Tanwin',
    description: 'Pembelajaran lengkap tentang hukum bacaan nun mati dan tanwin dalam Al-Quran',
    url: 'https://youtube.com/watch?v=example1',
    thumbnail: 'https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?w=300',
    category: 'Tajwid',
    instructor: 'Ustadz Ahmad Syaiful',
    duration: '45:30',
    uploadDate: '2024-01-20',
    views: 1250,
    status: 'published',
    level: 'pemula'
  },
  {
    id: 2,
    title: 'Fiqh Sholat - Syarat dan Rukun Sholat',
    description: 'Penjelasan detail tentang syarat wajib, syarat sah, dan rukun sholat menurut mazhab Syafii',
    url: 'https://youtube.com/watch?v=example2',
    thumbnail: 'https://images.pexels.com/photos/8142228/pexels-photo-8142228.jpeg?w=300',
    category: 'Fiqh',
    instructor: 'Ustadzah Fatimah',
    duration: '32:15',
    uploadDate: '2024-01-19',
    views: 890,
    status: 'published',
    level: 'menengah'
  },
  {
    id: 3,
    title: 'Akhlaq Mulia dalam Kehidupan Sehari-hari',
    description: 'Bagaimana menerapkan akhlaq yang baik dalam interaksi sosial dan kehidupan bermasyarakat',
    url: 'https://youtube.com/watch?v=example3',
    thumbnail: 'https://images.pexels.com/photos/8142208/pexels-photo-8142208.jpeg?w=300',
    category: 'Akhlaq',
    instructor: 'Ustadz Muhammad Rizki',
    duration: '28:45',
    uploadDate: '2024-01-18',
    views: 2340,
    status: 'draft',
    level: 'pemula'
  }
];

const categories = ['Semua', 'Tajwid', 'Fiqh', 'Akhlaq', 'Hadits', 'Tafsir', 'Sejarah Islam'];
const levels = ['Semua', 'pemula', 'menengah', 'lanjutan'];

export default function VideoManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Semua');
  const [levelFilter, setLevelFilter] = useState('Semua');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredData = videoData.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'Semua' || video.category === categoryFilter;
    const matchesLevel = levelFilter === 'Semua' || video.level === levelFilter;
    const matchesStatus = statusFilter === 'all' || video.status === statusFilter;
    return matchesSearch && matchesCategory && matchesLevel && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    if (status === 'published') {
      return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Terbit</span>;
    }
    return <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">Draft</span>;
  };

  const getLevelBadge = (level: string) => {
    const colors = {
      pemula: 'bg-green-100 text-green-800',
      menengah: 'bg-yellow-100 text-yellow-800',
      lanjutan: 'bg-red-100 text-red-800'
    };
    
    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[level as keyof typeof colors]}`}>
      {level.charAt(0).toUpperCase() + level.slice(1)}
    </span>;
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Manajemen Video</h2>
          <p className="text-gray-600 mt-1">Kelola video pembelajaran dan materi edukasi</p>
        </div>
        <button className="mt-4 sm:mt-0 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Tambah Video</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Video className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">67</p>
              <p className="text-sm text-gray-600">Total Video</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Play className="w-8 h-8 text-emerald-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">45.2K</p>
              <p className="text-sm text-gray-600">Total Views</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Clock className="w-8 h-8 text-purple-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">28h 45m</p>
              <p className="text-sm text-gray-600">Total Durasi</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <User className="w-8 h-8 text-yellow-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">12</p>
              <p className="text-sm text-gray-600">Instruktur Aktif</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Cari video..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Level Filter */}
          <div className="flex items-center space-x-2">
            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              {levels.map(level => (
                <option key={level} value={level}>
                  {level === 'Semua' ? 'Semua Level' : level.charAt(0).toUpperCase() + level.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="all">Semua Status</option>
              <option value="published">Terbit</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.map((video) => (
          <div key={video.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            {/* Thumbnail */}
            <div className="relative">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <button className="bg-white bg-opacity-90 rounded-full p-3 hover:bg-opacity-100 transition-all">
                  <Play className="w-6 h-6 text-emerald-600" />
                </button>
              </div>
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                {video.duration}
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {video.category}
                </span>
                {getStatusBadge(video.status)}
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                {video.title}
              </h3>

              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {video.description}
              </p>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  {video.instructor}
                </div>
                {getLevelBadge(video.level)}
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  {video.views.toLocaleString()} views
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {video.uploadDate}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 hover:text-emerald-800 text-sm font-medium flex items-center space-x-1"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Lihat Video</span>
                </a>
                
                <div className="flex items-center space-x-2">
                  <button className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="text-emerald-600 hover:text-emerald-900 p-1 hover:bg-emerald-50 rounded">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}