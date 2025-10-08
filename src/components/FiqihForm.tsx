import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Eye, EyeOff, Plus, X } from 'lucide-react';
import { FiqihQA, FiqihCategory } from '../types';
import { FIQIH_CATEGORIES } from '../utils/constants';
import { BookOpen, User } from '@phosphor-icons/react';

interface FiqihFormProps {
  isEdit?: boolean;
}

const FiqihForm: React.FC<FiqihFormProps> = ({ isEdit = false }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [showPreview, setShowPreview] = useState(false);
  const [newTag, setNewTag] = useState('');
  
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: 'sholat' as FiqihCategory,
    tags: [] as string[],
    author: '',
    isPublished: true
  });

  useEffect(() => {
    if (isEdit && id) {
      const savedQuestions = localStorage.getItem('fiqihQuestions');
      if (savedQuestions) {
        const questions: FiqihQA[] = JSON.parse(savedQuestions);
        const question = questions.find(q => q.id === id);
        if (question) {
          setFormData({
            question: question.question,
            answer: question.answer,
            category: question.category,
            tags: question.tags,
            author: question.author,
            isPublished: question.isPublished
          });
        }
      }
    }
  }, [isEdit, id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const savedQuestions = localStorage.getItem('fiqihQuestions');
    const questions: FiqihQA[] = savedQuestions ? JSON.parse(savedQuestions) : [];
    
    if (isEdit && id) {
      const updatedQuestions = questions.map(question =>
        question.id === id
          ? { 
              ...question, 
              ...formData,
              updatedAt: new Date().toISOString()
            }
          : question
      );
      localStorage.setItem('fiqihQuestions', JSON.stringify(updatedQuestions));
    } else {
      const newQuestion: FiqihQA = {
        id: Date.now().toString(),
        ...formData,
        views: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      questions.push(newQuestion);
      localStorage.setItem('fiqihQuestions', JSON.stringify(questions));
    }
    
    navigate('/fiqih');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()]
      });
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/fiqih')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Kembali ke Tanya Jawab Fiqih</span>
        </button>
        
        <button
          onClick={() => setShowPreview(!showPreview)}
          className="flex items-center space-x-2 text-green-600 hover:text-green-800 transition-colors"
        >
          {showPreview ? <EyeOff size={20} /> : <Eye size={20} />}
          <span>{showPreview ? 'Sembunyikan Preview' : 'Tampilkan Preview'}</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          {isEdit ? 'Edit Tanya Jawab Fiqih' : 'Tambah Tanya Jawab Fiqih Baru'}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pertanyaan *
              </label>
              <textarea
                name="question"
                value={formData.question}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Masukkan pertanyaan fiqih..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Jawaban *
              </label>
              <textarea
                name="answer"
                value={formData.answer}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Masukkan jawaban lengkap dengan dalil jika ada..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kategori *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              >
                {Object.entries(FIQIH_CATEGORIES).map(([key, category]) => (
                  <option key={key} value={key}>
                    {category.emoji} {category.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Penulis/Ustadz *
              </label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Nama ustadz atau penulis jawaban"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <div className="flex space-x-2 mb-3">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Tambah tag..."
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center space-x-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                  >
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="text-green-600 hover:text-green-800"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="isPublished"
                name="isPublished"
                checked={formData.isPublished}
                onChange={handleChange}
                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <label htmlFor="isPublished" className="text-sm font-medium text-gray-700">
                Publikasikan Q&A ini
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Save size={20} />
              <span>{isEdit ? 'Update Q&A' : 'Simpan Q&A'}</span>
            </button>
          </form>

          {showPreview && (
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Preview</h3>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`${FIQIH_CATEGORIES[formData.category].color} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                      {FIQIH_CATEGORIES[formData.category].emoji} {FIQIH_CATEGORIES[formData.category].label}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Eye size={16} />
                        <span>0</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User size={16} />
                        <span>{formData.author || 'Penulis'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-start space-x-2">
                      <span>{formData.question || 'Pertanyaan akan muncul di sini...'}</span>
                    </h3>
                  </div>

                  <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
                    <div className="flex items-start space-x-2">
                      <BookOpen className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-green-800 mb-2">Jawaban:</h4>
                        <p className="text-green-700 leading-relaxed">
                          {formData.answer || 'Jawaban akan muncul di sini...'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center space-x-1 bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                      >
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FiqihForm;