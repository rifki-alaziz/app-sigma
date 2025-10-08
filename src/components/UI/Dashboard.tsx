import { Users, Store, MessageCircle, Video, TrendingUp, ShoppingCart, BookOpen, FileText } from 'lucide-react';

const stats = [
  {
    title: 'Total Mustahiq',
    value: '245',
    change: '+12%',
    changeType: 'positive' as const,
    icon: Users,
    color: 'bg-blue-500'
  },
  {
    title: 'Produk Toko',
    value: '89',
    change: '+8%',
    changeType: 'positive' as const,
    icon: Store,
    color: 'bg-emerald-500'
  },
  {
    title: 'Pertanyaan Fiqh',
    value: '156',
    change: '+23%',
    changeType: 'positive' as const,
    icon: MessageCircle,
    color: 'bg-purple-500'
  },
  {
    title: 'Artikel Published',
    value: '89',
    change: '+5%',
    changeType: 'positive' as const,
    icon: FileText,
    color: 'bg-purple-500'
  },
  {
    title: 'Video Pembelajaran',
    value: '67',
    change: '+3%',
    changeType: 'positive' as const,
    icon: Video,
    color: 'bg-red-500'
  }
];

const recentActivities = [
  {
    id: 1,
    type: 'mahasantri',
    title: 'Ahmad Fauzi menyelesaikan hafalan Juz 15',
    time: '1 menit yang lalu',
    icon: BookOpen,
    color: 'text-emerald-600'
  },
  {
    id: 2,
    type: 'mustahiq',
    title: 'Ustadz Ahmad bergabung sebagai mustahiq baru',
    time: '2 menit yang lalu',
    icon: Users,
    color: 'text-blue-600'
  },
  {
    id: 3,
    type: 'article',
    title: 'Artikel "Panduan Tajwid" dipublikasikan',
    time: '10 menit yang lalu',
    icon: FileText,
    color: 'text-purple-600'
  },
  {
    id: 4,
    type: 'toko',
    title: 'Produk "Kitab Hadist" ditambahkan ke toko',
    time: '15 menit yang lalu',
    icon: ShoppingCart,
    color: 'text-emerald-600'
  },
  {
    id: 5,
    type: 'fiqh',
    title: 'Pertanyaan baru tentang hukum wudhu',
    time: '1 jam yang lalu',
    icon: MessageCircle,
    color: 'text-purple-600'
  },
  {
    id: 6,
    type: 'video',
    title: 'Video "Tajwid Dasar" diunggah',
    time: '2 jam yang lalu',
    icon: Video,
    color: 'text-red-600'
  }
];

export default function Dashboard() {
  return (
    <div className="p-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <p className={`text-sm font-medium ${
                    stat.changeType === 'positive' ? 'text-emerald-600' : 'text-red-600'
                  } flex items-center mt-1`}>
                    <TrendingUp className="w-4 h-4 mr-1" />
                    {stat.change}
                  </p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Aktivitas Terbaru</h3>
            <p className="text-sm text-gray-600">Pembaruan terbaru di sistem</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-start space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className={`w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center`}>
                      <Icon className={`w-4 h-4 ${activity.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Aksi Cepat</h3>
            <p className="text-sm text-gray-600">Tindakan yang sering dilakukan</p>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-blue-50 rounded-lg transition-colors border border-blue-200">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">Tambah Mahasantri</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-emerald-50 rounded-lg transition-colors border border-emerald-200">
                <Users className="w-5 h-5 text-emerald-600" />
                <span className="text-sm font-medium text-emerald-700">Tambah Mustahiq</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-green-50 rounded-lg transition-colors border border-green-200">
                <Store className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-green-700">Tambah Produk</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-purple-50 rounded-lg transition-colors border border-purple-200">
                <MessageCircle className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium text-purple-700">Jawab Pertanyaan</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-indigo-50 rounded-lg transition-colors border border-indigo-200">
                <FileText className="w-5 h-5 text-indigo-600" />
                <span className="text-sm font-medium text-indigo-700">Tulis Artikel</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-red-50 rounded-lg transition-colors border border-red-200">
                <Video className="w-5 h-5 text-red-600" />
                <span className="text-sm font-medium text-red-700">Upload Video</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}