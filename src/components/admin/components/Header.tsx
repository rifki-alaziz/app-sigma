import { Menu, Bell, Search, User } from 'lucide-react';

interface HeaderProps {
  onMenuToggle: () => void;
  activeTab: string;
}

const tabTitles: Record<string, string> = {
  dashboard: 'Dashboard',
  mahasantri: 'Manajemen Mahasantri',
  mustahiq: 'Manajemen Mustahiq',
  toko: 'Manajemen Toko',
  'fiqh-qa': 'Fiqh Q&A',
  articles: 'Manajemen Artikel',
  video: 'Manajemen Video',
  analytics: 'Analytics',
  settings: 'Pengaturan',
};

export default function Header({ onMenuToggle, activeTab }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 lg:px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {tabTitles[activeTab] || 'Dashboard'}
            </h1>
            <p className="text-sm text-gray-500">
              Sistem Manajemen Mahasantri Mustahiq
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="hidden md:block relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Cari..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 w-64"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          {/* Profile */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-900">Administrator</p>
              <p className="text-xs text-gray-500">admin@mahasantri.com</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}