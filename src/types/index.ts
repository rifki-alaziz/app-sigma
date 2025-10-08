export interface Student {
  id: string;
  name: string;
  fatherName: string;
  birthDate: string;
  address: string;
  category: string;
  instagram?: string;
  whatsapp?: string;
  quotes?: string;
  photo?: string;
  mapsUrl?: string;  // <--- tambahkan baris ini
  createdAt: string;
}


export interface Teacher {
  id: string;
  name: string;
  fatherName: string;
  birthDate: string;
  address: string;
  subject: string;
  instagram?: string;
  whatsapp?: string;
  quotes?: string;
  photo?: string;
  catatan?: string;   // ✅ catatan tambahan
  createdAt: string;
}

export type StudentCategory = 
  | 'luar-negeri' 
  | 'luar-jawa' 
  | 'banten' 
  | 'jabodetabek' 
  | 'jawa-barat' 
  | 'jawa-tengah' 
  | 'yogyakarta' 
  | 'jawa-timur';

export interface User {
  username: string;
  password: string;
  role: 'admin' | 'user';
}

export interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export type FeaturedSlide = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  buttonText?: string;
  buttonLink?: string;
  isActive: boolean;
  order: number;
  createdAt: string;
};

export interface FiqihQA {
  id: string;
  question: string;
  answer: string;
  category: FiqihCategory;
  tags: string[];
  author: string;
  isPublished: boolean;
  views: number;
  createdAt: string;
  updatedAt: string;
}

export type FiqihCategory = 
  | 'sholat' 
  | 'puasa' 
  | 'zakat' 
  | 'haji' 
  | 'muamalah' 
  | 'nikah' 
  | 'jinayah' 
  | 'aqidah' 
  | 'akhlaq' 
  | 'lainnya';
  