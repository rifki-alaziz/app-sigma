import { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Eye, FileText, Calendar, User, Globe, TrendingUp, Target, Hash, ExternalLink } from 'lucide-react';

const articleData = [
  {
    id: 1,
    title: 'Panduan Lengkap Belajar Tajwid untuk Pemula',
    slug: 'panduan-lengkap-belajar-tajwid-pemula',
    excerpt: 'Pelajari dasar-dasar tajwid dengan mudah melalui panduan step-by-step yang komprehensif untuk pemula.',
    content: 'Artikel lengkap tentang pembelajaran tajwid...',
    author: 'Ustadz Ahmad Syaiful',
    category: 'Tajwid',
    tags: ['tajwid', 'pemula', 'al-quran', 'pembelajaran'],
    publishDate: '2024-01-20',
    lastModified: '2024-01-22',
    status: 'published',
    views: 2450,
    readTime: '8 menit',
    featured: true,
    seo: {
      metaTitle: 'Panduan Lengkap Belajar Tajwid untuk Pemula - Mudah & Praktis',
      metaDescription: 'Pelajari tajwid dari dasar dengan panduan lengkap dan praktis. Tutorial step-by-step untuk pemula yang ingin menguasai bacaan Al-Quran dengan benar.',
      focusKeyword: 'belajar tajwid pemula',
      seoScore: 85,
      readabilityScore: 78
    }
  },
  {
    id: 2,
    title: 'Hukum Zakat dalam Islam: Panduan Praktis',
    slug: 'hukum-zakat-islam-panduan-praktis',
    excerpt: 'Memahami kewajiban zakat, nisab, dan cara perhitungannya menurut syariat Islam.',
    content: 'Artikel tentang hukum zakat...',
    author: 'Ustadzah Fatimah',
    category: 'Fiqh',
    tags: ['zakat', 'fiqh', 'islam', 'kewajiban'],
    publishDate: '2024-01-18',
    lastModified: '2024-01-19',
    status: 'published',
    views: 1890,
    readTime: '12 menit',
    featured: false,
    seo: {
      metaTitle: 'Hukum Zakat dalam Islam: Panduan Praktis Lengkap',
      metaDescription: 'Pelajari hukum zakat dalam Islam, cara menghitung nisab, dan kewajiban zakat menurut syariat. Panduan praktis dan mudah dipahami.',
      focusKeyword: 'hukum zakat islam',
      seoScore: 92,
      readabilityScore: 82
    }
  },
  {
    id: 3,
    title: 'Adab Berinteraksi dalam Islam',
    slug: 'adab-berinteraksi-dalam-islam',
    excerpt: 'Pelajari etika dan adab yang baik dalam berinteraksi sesama muslim menurut ajaran Islam.',
    content: 'Artikel tentang adab berinteraksi...',
    author: 'Ustadz Muhammad Rizki',
    category: 'Akhlaq',
    tags: ['adab', 'akhlaq', 'interaksi', 'etika'],
    publishDate: '2024-01-15',
    lastModified: '2024-01-16',
    status: 'draft',
    views: 0,
    readTime: '6 menit',
    featured: false,
    seo: {
      metaTitle: 'Adab Berinteraksi dalam Islam - Etika Pergaulan Muslim',
      metaDescription: 'Pelajari adab dan etika berinteraksi dalam Islam. Panduan lengkap tentang cara bergaul yang baik menurut ajaran Rasulullah SAW.',
      focusKeyword: 'adab berinteraksi islam',
      seoScore: 76,
      readabilityScore: 85
    }
  }
];

const categories = ['Semua', 'Tajwid', 'Fiqh', 'Akhlaq', 'Hadits', 'Tafsir', 'Sejarah Islam'];

export default function ArticleManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Semua');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState<any>(null);

  const filteredData = articleData.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === 'Semua' || article.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || article.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    if (status === 'published') {
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        <Globe className="w-3 h-3 mr-1" />
        Terbit
      </span>;
    }
    return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
      <FileText className="w-3 h-3 mr-1" />
      Draft
    </span>;
  };

  const getSEOScoreBadge = (score: number) => {
    if (score >= 80) {
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        <Target className="w-3 h-3 mr-1" />
        Baik ({score})
      </span>;
    } else if (score >= 60) {
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
        <Target className="w-3 h-3 mr-1" />
        Sedang ({score})
      </span>;
    }
    return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
      <Target className="w-3 h-3 mr-1" />
      Perlu Perbaikan ({score})
    </span>;
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Manajemen Artikel</h2>
          <p className="text-gray-600 mt-1">Kelola artikel dan optimasi SEO</p>
        </div>
        <button className="mt-4 sm:mt-0 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Tulis Artikel</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <FileText className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">89</p>
              <p className="text-sm text-gray-600">Total Artikel</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Globe className="w-8 h-8 text-emerald-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">67</p>
              <p className="text-sm text-gray-600">Terbit</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <TrendingUp className="w-8 h-8 text-purple-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">125.4K</p>
              <p className="text-sm text-gray-600">Total Views</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Target className="w-8 h-8 text-yellow-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">84</p>
              <p className="text-sm text-gray-600">Rata-rata SEO Score</p>
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
              placeholder="Cari artikel, penulis, atau tag..."
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

      {/* Articles Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          {filteredData.map((article) => (
            <div key={article.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {article.category}
                  </span>
                  {article.featured && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Featured
                    </span>
                  )}
                </div>
                {getStatusBadge(article.status)}
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                {article.title}
              </h3>
              
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {article.excerpt}
              </p>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    {article.author}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {article.publishDate}
                  </div>
                </div>
                <div className="text-xs text-gray-400">
                  {article.readTime}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-3">
                {article.tags.slice(0, 3).map((tag, index) => (
                  <span key={index} className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-600">
                    <Hash className="w-3 h-3 mr-1" />
                    {tag}
                  </span>
                ))}
                {article.tags.length > 3 && (
                  <span className="text-xs text-gray-400">+{article.tags.length - 3} lainnya</span>
                )}
              </div>

              {/* SEO Score */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">SEO Score:</span>
                  {getSEOScoreBadge(article.seo.seoScore)}
                </div>
                {article.status === 'published' && (
                  <div className="flex items-center text-xs text-gray-500">
                    <Eye className="w-3 h-3 mr-1" />
                    {article.views.toLocaleString()} views
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => setSelectedArticle(article)}
                  className="text-emerald-600 hover:text-emerald-800 text-sm font-medium flex items-center space-x-1"
                >
                  <Eye className="w-4 h-4" />
                  <span>Lihat Detail</span>
                </button>
                
                <div className="flex items-center space-x-2">
                  <button className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded">
                    <ExternalLink className="w-4 h-4" />
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
          ))}
        </div>

        {/* Detail Panel */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          {selectedArticle ? (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Detail Artikel & SEO</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Informasi Artikel:</h4>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <p className="text-sm"><span className="font-medium">Judul:</span> {selectedArticle.title}</p>
                    <p className="text-sm"><span className="font-medium">Slug:</span> {selectedArticle.slug}</p>
                    <p className="text-sm"><span className="font-medium">Penulis:</span> {selectedArticle.author}</p>
                    <p className="text-sm"><span className="font-medium">Kategori:</span> {selectedArticle.category}</p>
                    <p className="text-sm"><span className="font-medium">Status:</span> {selectedArticle.status}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Optimasi SEO:</h4>
                  <div className="bg-emerald-50 p-4 rounded-lg space-y-3">
                    <div>
                      <span className="text-xs text-gray-600">Meta Title:</span>
                      <p className="text-sm font-medium">{selectedArticle.seo.metaTitle}</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-600">Meta Description:</span>
                      <p className="text-sm">{selectedArticle.seo.metaDescription}</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-600">Focus Keyword:</span>
                      <p className="text-sm font-medium text-emerald-700">{selectedArticle.seo.focusKeyword}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs text-gray-600">SEO Score:</span>
                        <div className="mt-1">{getSEOScoreBadge(selectedArticle.seo.seoScore)}</div>
                      </div>
                      <div>
                        <span className="text-xs text-gray-600">Readability:</span>
                        <p className="text-sm font-medium">{selectedArticle.seo.readabilityScore}/100</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Tags:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedArticle.tags.map((tag: string, index: number) => (
                      <span key={index} className="inline-flex items-center px-2.5 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                        <Hash className="w-3 h-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button className="flex-1 bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition-colors">
                    Edit Artikel
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    Optimasi SEO
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500">
              <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Pilih artikel untuk melihat detail dan pengaturan SEO</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}