import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Eye, EyeOff } from 'lucide-react';
import { StudentCategory } from '../types';
import { STUDENT_CATEGORIES } from '../utils/constants';

interface StudentFormProps {
  isEdit?: boolean;
}

const StudentForm: React.FC<StudentFormProps> = ({ isEdit = false }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [showPreview, setShowPreview] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    birthDate: '',
    address: '',
    category: 'jabodetabek' as StudentCategory,
    instagram: '',
    whatsapp: '',
    quotes: '',
    photo: '',
    mapsUrl: '',
  });

  useEffect(() => {
    if (isEdit && id) {
      // Mock data untuk edit
      const mockData = {
        name: 'Ahmad Fauzi',
        fatherName: 'Abdullah',
        birthDate: '2000-05-15',
        address: 'Jl. Masjid No. 123, Jakarta',
        category: 'jabodetabek' as StudentCategory,
        instagram: 'ahmad_fauzi',
        whatsapp: '081234567890',
        quotes: 'Menuntut ilmu adalah kewajiban setiap muslim',
        photo: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=800',
        mapsUrl: 'https://maps.google.com/?q=-6.2088,106.8456',
      };
      setFormData(mockData);
    }
  }, [isEdit, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Mock save - dalam implementasi nyata akan menyimpan ke database
      console.log('Menyimpan data mahasiswa:', formData);
      alert(isEdit ? 'Data berhasil diupdate!' : 'Data berhasil disimpan!');
      navigate('/students');
    } catch (err) {
      alert(err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  function getEmbedUrl(url: string): string {
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname.includes('google.com')) {
        if (urlObj.pathname.startsWith('/maps/place/')) {
          return `https://www.google.com/maps/embed${urlObj.pathname}${urlObj.search}`;
        }
        if (urlObj.searchParams.has('q')) {
          const q = urlObj.searchParams.get('q');
          return `https://www.google.com/maps?q=${encodeURIComponent(q!)}&output=embed`;
        }
      }
      return `https://www.google.com/maps?q=${encodeURIComponent(url)}&output=embed`;
    } catch {
      return 'about:blank';
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <button onClick={() => navigate('/students')} className="flex items-center space-x-2 text-gray-600 hover:text-gray-800">
          <ArrowLeft size={20} />
          <span>Kembali ke Daftar Mahasantri</span>
        </button>
        <button onClick={() => setShowPreview(!showPreview)} className="flex items-center space-x-2 text-blue-600 hover:text-blue-800">
          {showPreview ? <EyeOff size={20} /> : <Eye size={20} />}
          <span>{showPreview ? 'Sembunyikan Preview' : 'Tampilkan Preview'}</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          {isEdit ? 'Edit Data Mahasantri' : 'Tambah Mahasantri Baru'}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Nama Lengkap" className="input" />
          <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} required placeholder="Nama Ayah" className="input" />
          <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} required className="input" />
          <input type="url" name="photo" value={formData.photo} onChange={handleChange} placeholder="URL Foto" className="input" />
          <input type="url" name="mapsUrl" value={formData.mapsUrl} onChange={handleChange} placeholder="Link Google Maps (https://maps.google.com/...)" className="input" />
          <input type="text" name="instagram" value={formData.instagram} onChange={handleChange} placeholder="Instagram" className="input" />
          <input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleChange} placeholder="WhatsApp" className="input" />
          <select name="category" value={formData.category} onChange={handleChange} required className="input">
            {Object.entries(STUDENT_CATEGORIES).map(([key, val]) => (
              <option key={key} value={key}>
                {val.label}
              </option>
            ))}
          </select>
          <textarea name="address" value={formData.address} onChange={handleChange} required placeholder="Alamat lengkap" className="input col-span-2" />
          <textarea name="quotes" value={formData.quotes} onChange={handleChange} placeholder="Quotes" className="input col-span-2" />
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium">
          <Save size={20} className="inline mr-2" />
          {isEdit ? 'Update Data' : 'Simpan Data'}
        </button>
      </form>

      {showPreview && (
        <div className="rounded-xl p-6 mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Preview</h3>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {formData.photo && (
              <img
                src={formData.photo}
                alt="Preview"
                className="w-full h-48 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            )}

            <div className="p-4">
              <div className={`inline-block ${STUDENT_CATEGORIES[formData.category].color} text-white px-2 py-1 rounded-full text-xs font-medium mb-3`}>
                {STUDENT_CATEGORIES[formData.category].label}
              </div>

              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                {formData.name || 'Nama Mahasantri'}
              </h4>

              <p className="text-gray-600 text-sm mb-2">
                Ayah: {formData.fatherName || 'Nama Ayah'}
              </p>

              <p className="text-gray-500 text-sm mb-3">
                {formData.address || 'Alamat lengkap'}
                {formData.mapsUrl && (
                  <>
                    <br />
                    <a
                      href={formData.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-1 text-blue-600 hover:underline text-sm"
                    >
                      📍 Lihat di Google Maps
                    </a>
                  </>
                )}
              </p>

              {formData.mapsUrl && (
                <div className="w-full my-2 rounded-md overflow-hidden" style={{ height: 200 }}>
                  <iframe
                    title="Lokasi Google Maps"
                    src={getEmbedUrl(formData.mapsUrl)}
                    width="100%"
                    height="100%"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    style={{ border: 0 }}
                    allowFullScreen
                  ></iframe>
                </div>
              )}

              {formData.quotes && (
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-blue-800 text-sm italic">"{formData.quotes}"</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentForm;
