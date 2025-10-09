import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Edit,
  Trash2,
  Instagram,
  MessageCircle,
  Calendar,
  User,
  StickyNote
} from 'lucide-react';
import { Teacher } from '../types';

const TeacherDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState<Teacher | null>(null);

  useEffect(() => {
    if (!id) return;
    
    const savedTeachers = localStorage.getItem('teachers');
    if (savedTeachers) {
      const teachers = JSON.parse(savedTeachers);
      const foundTeacher = teachers.find((t: Teacher) => t.id === id);
      if (foundTeacher) {
        setTeacher(foundTeacher);
      }
    }
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data guru ini?')) {
      try {
        const savedTeachers = localStorage.getItem('teachers');
        if (savedTeachers) {
          const teachers = JSON.parse(savedTeachers);
          const updatedTeachers = teachers.filter((t: Teacher) => t.id !== id);
          localStorage.setItem('teachers', JSON.stringify(updatedTeachers));
        }
        navigate('/teachers');
      } catch (err: any) {
        alert(err.message || err);
      }
    }
  };

  if (!teacher) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-600">Guru tidak ditemukan</h3>
      </div>
    );
  }

  const formatDate = (dateStr?: string) =>
    dateStr
      ? new Date(dateStr).toLocaleDateString('id-ID', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        })
      : '-';

  return (
    <div className="min-h-screen p-4 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigate('/teachers')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Kembali ke Daftar Guru</span>
        </button>

        <div className="flex space-x-2">
          <button
            onClick={() => navigate(`/teachers/edit/${teacher.id}`)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-700 transition-colors"
          >
            <Edit size={16} />
            <span>Edit</span>
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-red-700 transition-colors"
          >
            <Trash2 size={16} />
            <span>Hapus</span>
          </button>
        </div>
      </div>

      {/* Teacher Card */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="relative">
          <img
            src={
              teacher.photo ||
              'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=800'
            }
            alt={teacher.name}
            className="w-full h-64 object-cover"
          />
        </div>

        {/* Biodata + Quotes + Sosial Media + Catatan */}
        <div className="p-8 space-y-6">
          {/* Biodata */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gray-800">{teacher.name}</h1>

            <div className="flex items-center space-x-3">
              <User className="w-5 h-5 text-gray-400" />
              <p className="font-medium text-gray-800">
                Nama Ayah: {teacher.fatherName}
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <p className="font-medium text-gray-800">
                Tanggal Lahir: {formatDate(teacher.birthDate)}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 font-semibold mb-1">
                Alamat Lengkap
              </p>
              <p className="font-medium text-gray-800">{teacher.address}</p>
            </div>
          </div>

          {/* Quotes */}
          {teacher.quotes && (
            <div className="bg-green-50 p-6 rounded-xl">
              <h3 className="font-semibold text-green-800 mb-3">
                Quotes Inspiratif
              </h3>
              <blockquote className="text-green-700 italic text-lg leading-relaxed">
                "{teacher.quotes}"
              </blockquote>
            </div>
          )}

          {/* Catatan */}
          {teacher.catatan && (
            <div className="bg-yellow-50 p-6 rounded-xl">
              <h3 className="font-semibold text-yellow-800 mb-3 flex items-center space-x-2">
                <StickyNote className="w-5 h-5" />
                <span>Catatan</span>
              </h3>
              <p className="text-yellow-700 whitespace-pre-line">
                {teacher.catatan}
              </p>
            </div>
          )}

          {/* Sosial Media */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800">
              Kontak & Social Media
            </h3>

            {teacher.whatsapp && (
              <a
                href={`https://wa.me/${teacher.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
              >
                <MessageCircle className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-800">WhatsApp</p>
                  <p className="text-sm text-green-600">{teacher.whatsapp}</p>
                </div>
              </a>
            )}

            {teacher.instagram && (
              <a
                href={`https://instagram.com/${teacher.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-3 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors"
              >
                <Instagram className="w-5 h-5 text-pink-600" />
                <div>
                  <p className="font-medium text-pink-800">Instagram</p>
                  <p className="text-sm text-pink-600">
                    @{teacher.instagram}
                  </p>
                </div>
              </a>
            )}
          </div>

          {/* Info dibuat */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">
              Data dibuat pada:{' '}
              {teacher.createdAt && formatDate(teacher.createdAt)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDetail;
