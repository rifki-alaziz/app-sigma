import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, BookOpen, Eye, Tag, User, Calendar, MessageSquare } from 'lucide-react';
import { FiqihQA } from '../types';
import { FIQIH_CATEGORIES } from '../utils/constants';

const FiqihQAPage: React.FC = () => {
  const [questions, setQuestions] = useState<FiqihQA[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<FiqihQA[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadQuestions();
  }, []);

  useEffect(() => {
    filterQuestions();
  }, [questions, selectedCategory, searchTerm]);

  const loadQuestions = async () => {
    try {
      // Fallback data for demo
      const fallbackData: FiqihQA[] = [
        {
          id: '1',
          question: 'Bagaimana cara sholat yang benar menurut sunnah?',
          answer: 'Sholat yang benar dimulai dengan wudhu yang sempurna, menghadap kiblat, dan mengikuti tata cara yang diajarkan Rasulullah SAW. Dimulai dengan takbiratul ihram, membaca Al-Fatihah, ruku\', sujud, dan diakhiri dengan salam.',
          category: 'sholat',
          tags: ['sholat', 'sunnah', 'tata cara'],
          author: 'Ustadz Ahmad',
          isPublished: true,
          views: 245,
          createdAt: '2024-01-15T10:30:00Z',
          updatedAt: '2024-01-15T10:30:00Z'
        },
        {
          id: '2',
          question: 'Kapan waktu yang tepat untuk membayar zakat fitrah?',
          answer: 'Zakat fitrah wajib dibayarkan mulai dari terbenamnya matahari pada akhir bulan Ramadhan hingga sebelum sholat Ied. Namun, lebih utama dibayarkan sebelum sholat Ied agar dapat diterima oleh mustahiq.',
          category: 'zakat',
          tags: ['zakat fitrah', 'ramadhan', 'ied'],
          author: 'Ustadz Budi',
          isPublished: true,
          views: 189,
          createdAt: '2024-01-16T14:20:00Z',
          updatedAt: '2024-01-16T14:20:00Z'
        },
        {
          id: '3',
          question: 'Apa hukum berbuka puasa karena sakit?',
          answer: 'Islam memberikan keringanan bagi orang yang sakit untuk berbuka puasa. Jika sakit dapat membahayakan kesehatan atau memperlambat kesembuhan, maka diperbolehkan berbuka dan wajib mengqadha di hari lain setelah sembuh.',
          category: 'puasa',
          tags: ['puasa', 'sakit', 'rukhsah'],
          author: 'Ustadzah Siti',
          isPublished: true,
          views: 156,
          createdAt: '2024-01-17T09:15:00Z',
          updatedAt: '2024-01-17T09:15:00Z'
        },
        {
          id: '4',
          question: 'Bagaimana cara menentukan arah kiblat yang benar?',
          answer: 'Arah kiblat dapat ditentukan dengan beberapa cara: menggunakan kompas dengan perhitungan sudut, aplikasi smartphone, atau menggunakan bayangan matahari pada waktu tertentu. Yang terpenting adalah menghadap ke Ka\'bah di Makkah.',
          category: 'sholat',
          tags: ['kiblat', 'arah', 'kabah'],
          author: 'Ustadz Falak',
          isPublished: true,
          views: 203,
          createdAt: '2024-01-18T16:45:00Z',
          updatedAt: '2024-01-18T16:45:00Z'
        },
        {
          id: '5',
          question: 'Apa syarat dan rukun nikah dalam Islam?',
          answer: 'Rukun nikah ada 5: calon suami, calon istri, wali, dua saksi, dan ijab qabul. Syarat-syaratnya meliputi baligh, berakal, tidak ada halangan syar\'i, dan dilakukan dengan cara yang sesuai syariat.',
          category: 'nikah',
          tags: ['nikah', 'rukun', 'syarat'],
          author: 'Ustadz Keluarga',
          isPublished: true,
          views: 312,
          createdAt: '2024-01-19T11:30:00Z',
          updatedAt: '2024-01-19T11:30:00Z'
        }
      ];
      setQuestions(fallbackData);
    } catch (error) {
      console.error('Error loading questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterQuestions = () => {
    let filtered = questions.filter(q => q.isPublished);

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(question => question.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(question =>
        question.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        question.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        question.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredQuestions(filtered);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus Q&A ini?')) {
      const updatedQuestions = questions.filter(q => q.id !== id);
      setQuestions(updatedQuestions);
      localStorage.setItem('fiqihQuestions', JSON.stringify(updatedQuestions));
    }
  };

  const getCategoryCount = (category: string) => {
    return questions.filter(q => q.category === category && q.isPublished).length;
  };

  const categories = [
    { key: 'all', label: 'Semua Kategori', count: questions.filter(q => q.isPublished).length, emoji: '📚', color: 'bg-gray-600' },
    ...Object.entries(FIQIH_CATEGORIES).map(([key, category]) => ({
      key,
      label: category.label,
      count: getCategoryCount(key),
      emoji: category.emoji,
      color: category.color
    }))
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat tanya jawab fiqih...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Tanya Jawab Fiqih</h1>
        <button
          onClick={() => navigate('/fiqih/add')}
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-700 transition-colors"
        >
          <Plus size={20} />
          <span>Tambah Q&A</span>
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Cari pertanyaan fiqih..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      <div className="flex space-x-4 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category.key}
            onClick={() => setSelectedCategory(category.key)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category.key
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.emoji} {category.label} ({category.count})
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredQuestions.map((qa) => (
          <div
            key={qa.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`${FIQIH_CATEGORIES[qa.category].color} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                  {FIQIH_CATEGORIES[qa.category].emoji} {FIQIH_CATEGORIES[qa.category].label}
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Eye size={16} />
                    <span>{qa.views}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User size={16} />
                    <span>{qa.author}</span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-start space-x-2">
                  <MessageSquare className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span>{qa.question}</span>
                </h3>
              </div>

              <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
                <div className="flex items-start space-x-2">
                  <BookOpen className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-green-800 mb-2">Jawaban:</h4>
                    <p className="text-green-700 leading-relaxed">{qa.answer}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {qa.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center space-x-1 bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                    >
                      <Tag size={12} />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Calendar size={16} />
                    <span>{new Date(qa.createdAt).toLocaleDateString('id-ID')}</span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => navigate(`/fiqih/edit/${qa.id}`)}
                      className="text-blue-600 hover:text-blue-800 text-sm hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(qa.id)}
                      className="text-red-600 hover:text-red-800 text-sm hover:underline"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredQuestions.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <BookOpen size={48} className="mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-600 mb-2">Tidak ada pertanyaan ditemukan</h3>
          <p className="text-gray-500">Coba ubah filter atau kata kunci pencarian</p>
        </div>
      )}
    </div>
  );
};

export default FiqihQAPage;