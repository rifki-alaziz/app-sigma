import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Storefront, ShoppingCart, Plus, Search, Filter, Star, Eye, Edit, Trash2 } from "lucide-react";

// Interface untuk produk
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  stock: number;
  sold: number;
  rating: number;
  reviews: number;
  discount?: number;
  isNew?: boolean;
  isBestseller?: boolean;
}

const StorePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Semua");
  const [sortBy, setSortBy] = useState("name");
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    originalPrice: 0,
    image: '',
    category: 'Kitab',
    stock: 0
  });

  // Data produk
  const [products, setProducts] = useState<Product[]>([]);

  React.useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      const defaultProducts: Product[] = [
        {
          id: 1,
          name: "Mushaf Al-Quran Tajwid Premium",
          description: "Al-Quran dengan tajwid lengkap, cover kulit asli, ukuran A4",
          price: 125000,
          originalPrice: 150000,
          image: "https://images.pexels.com/photos/1730877/pexels-photo-1730877.jpeg?w=400",
          category: "Kitab",
          stock: 45,
          sold: 89,
          rating: 4.8,
          reviews: 67,
          discount: 17,
          isBestseller: true
        },
        {
          id: 2,
          name: "Tasbih Digital Counter LED",
          description: "Tasbih digital dengan counter otomatis dan lampu LED",
          price: 85000,
          image: "https://images.pexels.com/photos/8090196/pexels-photo-8090196.jpeg?w=400",
          category: "Aksesoris",
          stock: 23,
          sold: 156,
          rating: 4.6,
          reviews: 89,
          isNew: true
        },
        {
          id: 3,
          name: "Sajadah Premium Turki Motif Masjid Nabawi",
          description: "Sajadah import Turki dengan motif Masjid Nabawi, bahan berkualitas tinggi",
          price: 275000,
          originalPrice: 320000,
          image: "https://images.pexels.com/photos/8142208/pexels-photo-8142208.jpeg?w=400",
          category: "Sajadah",
          stock: 12,
          sold: 67,
          rating: 4.9,
          reviews: 45,
          discount: 14
        },
        {
          id: 4,
          name: "Buku Hadits Shahih Bukhari Terjemahan",
          description: "Kumpulan hadits shahih Bukhari dengan terjemahan bahasa Indonesia",
          price: 95000,
          image: "https://images.pexels.com/photos/1309240/pexels-photo-1309240.jpeg?w=400",
          category: "Kitab",
          stock: 0,
          sold: 234,
          rating: 4.7,
          reviews: 123
        },
        {
          id: 5,
          name: "Parfum Minyak Wangi Arab Non Alkohol",
          description: "Parfum minyak wangi khas Arab, tahan lama, halal dan berkualitas",
          price: 65000,
          image: "https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg?w=400",
          category: "Parfum",
          stock: 78,
          sold: 345,
          rating: 4.5,
          reviews: 234,
          isBestseller: true
        },
        {
          id: 6,
          name: "Gamis Syari Wanita Polos Elegant",
          description: "Gamis syari untuk wanita, bahan katun premium, nyaman dipakai",
          price: 185000,
          originalPrice: 220000,
          image: "https://images.pexels.com/photos/9558618/pexels-photo-9558618.jpeg?w=400",
          category: "Pakaian",
          stock: 34,
          sold: 78,
          rating: 4.4,
          reviews: 56,
          discount: 16,
          isNew: true
        }
      ];
      setProducts(defaultProducts);
      localStorage.setItem('products', JSON.stringify(defaultProducts));
    }
  };

  const categories = ["Semua", "Kitab", "Sajadah", "Aksesoris", "Parfum", "Pakaian"];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "Semua" || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "sold":
        return b.sold - a.sold;
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingProduct) {
      const updatedProducts = products.map(product =>
        product.id === editingProduct.id ? {
          ...product,
          ...formData,
          discount: formData.originalPrice > 0 ? Math.round(((formData.originalPrice - formData.price) / formData.originalPrice) * 100) : 0,
          rating: product.rating || 4.5,
          reviews: product.reviews || 0,
          sold: product.sold || 0
        } : product
      );
      setProducts(updatedProducts);
      localStorage.setItem('products', JSON.stringify(updatedProducts));
    } else {
      const newProduct: Product = {
        id: Date.now(),
        ...formData,
        discount: formData.originalPrice > 0 ? Math.round(((formData.originalPrice - formData.price) / formData.originalPrice) * 100) : 0,
        rating: 4.5,
        reviews: 0,
        sold: 0,
        isNew: true
      };
      const updatedProducts = [...products, newProduct];
      setProducts(updatedProducts);
      localStorage.setItem('products', JSON.stringify(updatedProducts));
    }
    
    resetForm();
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      originalPrice: product.originalPrice || 0,
      image: product.image,
      category: product.category,
      stock: product.stock
    });
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      const updatedProducts = products.filter(product => product.id !== id);
      setProducts(updatedProducts);
      localStorage.setItem('products', JSON.stringify(updatedProducts));
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: 0,
      originalPrice: 0,
      image: '',
      category: 'Kitab',
      stock: 0
    });
    setEditingProduct(null);
    setShowForm(false);
  };

  const handleAddToCart = (productId: number) => {
    const product = products.find(p => p.id === productId);
    if (product && product.stock > 0) {
      // Update stock
      const updatedProducts = products.map(p =>
        p.id === productId ? { ...p, stock: p.stock - 1, sold: p.sold + 1 } : p
      );
      setProducts(updatedProducts);
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      
      alert(`${product.name} ditambahkan ke keranjang!`);
    }
  };

  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(number);
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { text: "Habis", color: "text-red-600 bg-red-50" };
    if (stock < 20) return { text: "Stok Terbatas", color: "text-yellow-600 bg-yellow-50" };
    return { text: "Tersedia", color: "text-green-600 bg-green-50" };
  };

  return (
    <div className="px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-center flex items-center justify-center gap-3">
            <Storefront size={32} className="text-pink-600" />
            Toko Islami
          </h1>
          <p className="text-gray-600 mt-2">Produk-produk berkualitas untuk kebutuhan ibadah Anda</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Produk</span>
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {editingProduct ? 'Edit Produk' : 'Tambah Produk Baru'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Nama Produk"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                  required
                />
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                >
                  {categories.filter(c => c !== 'Semua').map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <input
                  type="number"
                  placeholder="Harga"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: parseInt(e.target.value)})}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                  required
                />
                <input
                  type="number"
                  placeholder="Harga Asli (opsional)"
                  value={formData.originalPrice}
                  onChange={(e) => setFormData({...formData, originalPrice: parseInt(e.target.value)})}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                />
                <input
                  type="number"
                  placeholder="Stok"
                  value={formData.stock}
                  onChange={(e) => setFormData({...formData, stock: parseInt(e.target.value)})}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                  required
                />
                <input
                  type="url"
                  placeholder="URL Gambar"
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                  required
                />
              </div>
              <textarea
                placeholder="Deskripsi Produk"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                rows={3}
                required
              />
              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="flex-1 bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition-colors"
                >
                  {editingProduct ? 'Update' : 'Simpan'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-gray-900">{products.length}</div>
          <div className="text-sm text-gray-600">Total Produk</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-gray-900">{products.filter(p => p.stock > 0).length}</div>
          <div className="text-sm text-gray-600">Tersedia</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-gray-900">{products.reduce((sum, p) => sum + p.sold, 0)}</div>
          <div className="text-sm text-gray-600">Terjual</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-gray-900">4.6</div>
          <div className="text-sm text-gray-600">Rating Rata-rata</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Cari produk..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
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
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div className="flex items-center space-x-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            >
              <option value="name">Nama A-Z</option>
              <option value="price-low">Harga Terendah</option>
              <option value="price-high">Harga Tertinggi</option>
              <option value="rating">Rating Tertinggi</option>
              <option value="sold">Terlaris</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => {
          const stockStatus = getStockStatus(product.stock);
          return (
            <div
              key={product.id}
              className="bg-white border rounded-lg shadow-sm hover:shadow-md transition-all transform hover:scale-105 overflow-hidden"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                
                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {product.discount && (
                    <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                      -{product.discount}%
                    </span>
                  )}
                  {product.isNew && (
                    <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
                      BARU
                    </span>
                  )}
                  {product.isBestseller && (
                    <span className="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-bold">
                      TERLARIS
                    </span>
                  )}
                </div>

                {/* Admin Actions */}
                <div className="absolute top-2 right-2 flex flex-col gap-1">
                  <button className="bg-white p-1 rounded shadow hover:bg-gray-50">
                    <Eye className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => handleEdit(product)}
                    className="bg-white p-1 rounded shadow hover:bg-gray-50"
                  >
                    <Edit className="w-4 h-4 text-blue-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-white p-1 rounded shadow hover:bg-gray-50"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {product.category}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${stockStatus.color}`}>
                    {stockStatus.text}
                  </span>
                </div>

                <h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {product.name}
                </h2>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>

                {/* Rating */}
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium ml-1">{product.rating}</span>
                  </div>
                  <span className="text-xs text-gray-500 ml-2">({product.reviews} ulasan)</span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-lg font-bold text-pink-600">
                      {formatRupiah(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through ml-2">
                        {formatRupiah(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">{product.sold} terjual</span>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => handleAddToCart(product.id)}
                  disabled={product.stock === 0}
                  className={`w-full py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors ${
                    product.stock === 0
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-pink-500 text-white hover:bg-pink-600"
                  }`}
                >
                  <ShoppingCart size={16} />
                  <span>{product.stock === 0 ? "Stok Habis" : "Tambah ke Keranjang"}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Storefront size={48} className="text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">Tidak ada produk ditemukan</h3>
          <p className="text-gray-500">Coba ubah filter atau kata kunci pencarian</p>
        </div>
      )}
    </div>
  );
};

export default StorePage;