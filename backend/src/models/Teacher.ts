export interface Teacher {
  id?: number;
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
  createdAt?: string;
}
