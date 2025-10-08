import { StudentCategory } from '../types';

export const STUDENT_CATEGORIES: Record<StudentCategory, { label: string; color: string; description: string }> = {
  'luar-negeri': {
    label: 'Luar Negeri',
    color: 'bg-purple-500',
    description: 'Siswa dari berbagai negara'
  },
  'luar-jawa': {
    label: 'Luar Jawa',
    color: 'bg-green-500',
    description: 'Siswa dari luar Pulau Jawa'
  },
  'banten': {
    label: 'Banten',
    color: 'bg-blue-500',
    description: 'Siswa dari Provinsi Banten'
  },
  'jabodetabek': {
    label: 'Jabodetabek',
    color: 'bg-red-500',
    description: 'Jakarta, Bogor, Depok, Tangerang, Bekasi'
  },
  'jawa-barat': {
    label: 'Jawa Barat',
    color: 'bg-indigo-500',
    description: 'Siswa dari Provinsi Jawa Barat'
  },
  'jawa-tengah': {
    label: 'Jawa Tengah',
    color: 'bg-yellow-500',
    description: 'Siswa dari Provinsi Jawa Tengah'
  },
  'yogyakarta': {
    label: 'Yogyakarta',
    color: 'bg-orange-500',
    description: 'Siswa dari Daerah Istimewa Yogyakarta'
  },
  'jawa-timur': {
    label: 'Jawa Timur',
    color: 'bg-teal-500',
    description: 'Siswa dari Provinsi Jawa Timur'
  }
};

export const FIQIH_CATEGORIES: Record<string, { label: string; emoji: string; color: string; description: string }> = {
  'sholat': {
    label: 'Sholat',
    emoji: '🕌',
    color: 'bg-green-500',
    description: 'Tata cara dan hukum sholat'
  },
  'puasa': {
    label: 'Puasa',
    emoji: '🌙',
    color: 'bg-blue-500',
    description: 'Hukum dan adab puasa'
  },
  'zakat': {
    label: 'Zakat',
    emoji: '💰',
    color: 'bg-yellow-500',
    description: 'Perhitungan dan distribusi zakat'
  },
  'haji': {
    label: 'Haji & Umrah',
    emoji: '🕋',
    color: 'bg-purple-500',
    description: 'Manasik haji dan umrah'
  },
  'muamalah': {
    label: 'Muamalah',
    emoji: '🤝',
    color: 'bg-indigo-500',
    description: 'Transaksi dan ekonomi Islam'
  },
  'nikah': {
    label: 'Nikah & Keluarga',
    emoji: '💑',
    color: 'bg-pink-500',
    description: 'Hukum pernikahan dan keluarga'
  },
  'jinayah': {
    label: 'Jinayah',
    emoji: '⚖️',
    color: 'bg-red-500',
    description: 'Hukum pidana Islam'
  },
  'aqidah': {
    label: 'Aqidah',
    emoji: '☪️',
    color: 'bg-teal-500',
    description: 'Keyakinan dan tauhid'
  },
  'akhlaq': {
    label: 'Akhlaq',
    emoji: '✨',
    color: 'bg-orange-500',
    description: 'Etika dan moral Islam'
  },
  'lainnya': {
    label: 'Lainnya',
    emoji: '📚',
    color: 'bg-gray-500',
    description: 'Pertanyaan fiqih lainnya'
  }
};