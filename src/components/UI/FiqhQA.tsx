import { useState } from 'react';
import { Plus, Search, Filter, MessageCircle, User, Clock, CheckCircle, AlertCircle, Eye } from 'lucide-react';

const qaData = [
  {
    id: 1,
    question: 'Bagaimana hukum sholat berjamaah di masjid saat hujan deras?',
    category: 'Sholat',
    asker: 'Ahmad Fauzi',
    askDate: '2024-01-20',
    status: 'answered',
    priority: 'medium',
    answer: 'Sholat berjamaah tetap disunnahkan meski hujan deras. Namun jika kondisi sangat berbahaya...',
    answeredBy: 'Ustadz Ahmad Syaiful',
    answerDate: '2024-01-20'
  },
  {
    id: 2,
    question: 'Apakah boleh menggunakan parfum yang mengandung alkohol?',
    category: 'Thaharah',
    asker: 'Siti Aminah',
    askDate: '2024-01-21',
    status: 'pending',
    priority: 'high',
    answer: '',
    answeredBy: '',
    answerDate: ''
  },
  {
    id: 3,
    question: 'Bagaimana cara menghitung zakat penghasilan untuk freelancer?',
    category: 'Zakat',
    asker: 'Muhammad Rizal',
    askDate: '2024-01-19',
    status: 'answered',
    priority: 'medium',
    answer: 'Zakat penghasilan freelancer dihitung dari penghasilan bersih setelah dikurangi kebutuhan pokok...',
    answeredBy: 'Ustadzah Fatimah',
    answerDate: '2024-01-19'
  },
  {
    id: 4,
    question: 'Hukum trading forex dalam Islam?',
    category: 'Muamalah',
    asker: 'Budi Santoso',
    askDate: '2024-01-22',
    status: 'pending',
    priority: 'high',
    answer: '',
    answeredBy: '',
    answerDate: ''
  }
];

const categories = ['Semua', 'Sholat', 'Thaharah', 'Zakat', 'Muamalah', 'Nikah', 'Jinayat'];

export default function FiqhQA() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Semua');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedQuestion, setSelectedQuestion] = useState<any>(null);

  const filteredData = qaData.filter(qa => {
    const matchesSearch = qa.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         qa.asker.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'Semua' || qa.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || qa.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    if (status === 'answered') {
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        <CheckCircle className="w-3 h-3 mr-1" />
        Terjawab
      </span>;
    }
    return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
      <AlertCircle className="w-3 h-3 mr-1" />
      Menunggu
    </span>;
  };

  const getPriorityBadge = (priority: string) => {
    const colors = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800'
    };
    
    return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[priority as keyof typeof colors]}`}>
      {priority === 'high' ? 'Tinggi' : priority === 'medium' ? 'Sedang' : 'Rendah'}
    </span>;
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Fiqh Q&A</h2>
          <p className="text-gray-600 mt-1">Manajemen pertanyaan dan jawaban fiqh</p>
        </div>
        <button className="mt-4 sm:mt-0 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Tambah Pertanyaan</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <MessageCircle className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">156</p>
              <p className="text-sm text-gray-600">Total Pertanyaan</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <CheckCircle className="w-8 h-8 text-green-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">142</p>
              <p className="text-sm text-gray-600">Terjawab</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <AlertCircle className="w-8 h-8 text-yellow-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">14</p>
              <p className="text-sm text-gray-600">Menunggu Jawaban</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <User className="w-8 h-8 text-purple-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">89</p>
              <p className="text-sm text-gray-600">Penanya Aktif</p>
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
              placeholder="Cari pertanyaan..."
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
              <option value="answered">Terjawab</option>
              <option value="pending">Menunggu</option>
            </select>
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          {filteredData.map((qa) => (
            <div key={qa.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  {getPriorityBadge(qa.priority)}
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {qa.category}
                  </span>
                </div>
                {getStatusBadge(qa.status)}
              </div>
              
              <h3 className="text-lg font-medium text-gray-900 mb-3 line-clamp-2">
                {qa.question}
              </h3>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    {qa.asker}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {qa.askDate}
                  </div>
                </div>
              </div>

              {qa.status === 'answered' && (
                <div className="bg-emerald-50 p-3 rounded-lg mb-4">
                  <p className="text-sm text-gray-700 line-clamp-2">{qa.answer}</p>
                  <p className="text-xs text-emerald-600 mt-2">Dijawab oleh: {qa.answeredBy}</p>
                </div>
              )}

              <div className="flex items-center justify-between">
                <button
                  onClick={() => setSelectedQuestion(qa)}
                  className="text-emerald-600 hover:text-emerald-800 text-sm font-medium flex items-center space-x-1"
                >
                  <Eye className="w-4 h-4" />
                  <span>Lihat Detail</span>
                </button>
                
                {qa.status === 'pending' && (
                  <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm">
                    Jawab
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Detail Panel */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          {selectedQuestion ? (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Detail Pertanyaan</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Pertanyaan:</h4>
                  <p className="text-gray-700">{selectedQuestion.question}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Penanya:</span>
                    <p className="font-medium">{selectedQuestion.asker}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Kategori:</span>
                    <p className="font-medium">{selectedQuestion.category}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Tanggal:</span>
                    <p className="font-medium">{selectedQuestion.askDate}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Prioritas:</span>
                    <div className="mt-1">{getPriorityBadge(selectedQuestion.priority)}</div>
                  </div>
                </div>

                {selectedQuestion.answer && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Jawaban:</h4>
                    <div className="bg-emerald-50 p-4 rounded-lg">
                      <p className="text-gray-700 mb-2">{selectedQuestion.answer}</p>
                      <p className="text-sm text-emerald-600">
                        Dijawab oleh: {selectedQuestion.answeredBy} pada {selectedQuestion.answerDate}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex space-x-2">
                  <button className="flex-1 bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition-colors">
                    {selectedQuestion.status === 'pending' ? 'Berikan Jawaban' : 'Edit Jawaban'}
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    Arsip
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500">
              <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Pilih pertanyaan untuk melihat detail</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}