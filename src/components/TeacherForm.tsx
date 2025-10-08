import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Eye, EyeOff } from 'lucide-react';

interface TeacherFormProps {
  isEdit?: boolean;
}

const TeacherForm: React.FC<TeacherFormProps> = ({ isEdit = false }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [showPreview, setShowPreview] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    birthDate: '',
    address: '',
    instagram: '',
    whatsapp: '',
    quotes: '',
    photo: '',
    catatan: '' // ✅ field baru
  });

  // Ambil data guru saat edit
  useEffect(() => {
    if (isEdit && id) {
      fetch(`http://localhost:3001/api/teachers/${id}`, {
        headers: {
          Authorization: 'Bearer secret-token'
        }
      })
        .then(res => res.json())
        .then(data => {
          setFormData({
            ...data,
            birthDate: data.birthDate ? data.birthDate.split('T')[0] : '',
            catatan: data.catatan || '' // ✅ handle data lama yang belum ada catatan
          });
        })
        .catch(err => console.error('Gagal mengambil data guru:', err));
    }
  }, [isEdit, id]);

  // Submit data guru
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.fatherName || !formData.birthDate || !formData.address) {
      alert('Beberapa field wajib diisi!');
      return;
    }

    if (formData.whatsapp && !/^\d{10,15}$/.test(formData.whatsapp)) {
      alert('Nomor WhatsApp tidak valid!');
      return;
    }

    const method = isEdit ? 'PUT' : 'POST';
    const endpoint = isEdit
      ? `http://localhost:3001/api/teachers/${id}`
      : `http://localhost:3001/api/teachers`;

    const dataToSend = isEdit
      ? formData
      : {
          id: Date.now().toString(),
          createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
          ...formData
        };

    try {
      const res = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer secret-token'
        },
        body: JSON.stringify(dataToSend)
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Gagal menyimpan data guru');
      }

      navigate('/teachers');
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/teachers')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft size={20} />
          <span>Kembali ke Daftar Guru</span>
        </button>
        <button
          onClick={() => setShowPreview(!showPreview)}
          className="flex items-center space-x-2 text-green-600 hover:text-green-800"
        >
          {showPreview ? <EyeOff size={20} /> : <Eye size={20} />}
          <span>{showPreview ? 'Sembunyikan Preview' : 'Tampilkan Preview'}</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          {isEdit ? 'Edit Data Guru' : 'Tambah Guru Baru'}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Nama Lengkap" className="input" />
          <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} required placeholder="Nama Ayah" className="input" />
          <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} required className="input" />
          <input type="url" name="photo" value={formData.photo} onChange={handleChange} placeholder="URL Foto" className="input" />
          <input type="text" name="instagram" value={formData.instagram} onChange={handleChange} placeholder="Instagram" className="input" />
          <input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleChange} placeholder="WhatsApp" className="input" />
          <textarea name="address" value={formData.address} onChange={handleChange} required placeholder="Alamat lengkap" className="input col-span-2" />
          <textarea name="quotes" value={formData.quotes} onChange={handleChange} placeholder="Quotes" className="input col-span-2" />
          <textarea name="catatan" value={formData.catatan} onChange={handleChange} placeholder="Catatan tambahan" className="input col-span-2" /> {/* ✅ field baru */}
        </div>

        <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-lg font-medium">
          <Save size={20} className="inline mr-2" />
          {isEdit ? 'Update Data' : 'Simpan Data'}
        </button>
      </form>

      {showPreview && (
        <div className="rounded-xl p-6 mt-6 bg-gray-50 shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Preview</h3>
          {formData.photo && (
            <img src={formData.photo} alt="Foto Guru" className="w-full h-48 object-cover rounded-md mb-4" />
          )}
          <p><strong>Nama:</strong> {formData.name}</p>
          <p><strong>Ayah:</strong> {formData.fatherName}</p>
          <p><strong>Tanggal Lahir:</strong> {formData.birthDate}</p>
          <p><strong>Alamat:</strong> {formData.address}</p>
          {formData.instagram && <p><strong>Instagram:</strong> {formData.instagram}</p>}
          {formData.whatsapp && <p><strong>WhatsApp:</strong> {formData.whatsapp}</p>}
          {formData.quotes && <p className="italic">“{formData.quotes}”</p>}
          {formData.catatan && (
            <div className="bg-yellow-50 p-3 rounded-md mt-3">
              <p className="text-gray-700 text-sm">{formData.catatan}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TeacherForm;
