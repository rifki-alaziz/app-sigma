import React from "react";
import { useNavigate } from "react-router-dom";
import { Storefront, ShoppingCart } from "@phosphor-icons/react";

// Data produk
const products = [
  {
    id: 1,
    name: "Produk A",
    description: "Deskripsi produk A",
    price: 100000,
    image: "/path/to/image.jpg", // Ganti dengan URL gambar produk
  },
  {
    id: 2,
    name: "Produk B",
    description: "Deskripsi produk B",
    price: 150000,
    image: "/path/to/image.jpg", // Ganti dengan URL gambar produk
  },
  // Tambahkan produk lainnya
];

const StorePage: React.FC = () => {
  const navigate = useNavigate(); // Declared navigate hook

  const handleAddToCart = (productId: number) => {
    // Logic untuk menambahkan produk ke keranjang belanja
    alert(`Produk ${productId} ditambahkan ke keranjang!`);
    navigate("/cart"); // Navigate to the cart page after adding the product
  };

  return (
    <div className="px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 flex items-center justify-center">
        <Storefront size={32} className="mr-2" />
        Toko
      </h1>

      {/* Daftar Produk */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg shadow-md p-4 transition-transform transform hover:scale-105"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded-lg"
            />
            <div className="mt-4">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-600 text-sm">{product.description}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-lg font-bold">Rp {product.price}</span>
                <button
                  onClick={() => handleAddToCart(product.id)}
                  className="bg-pink-500 text-white py-2 px-4 rounded-lg flex items-center space-x-2"
                >
                  <ShoppingCart size={16} />
                  <span>Tambah ke Keranjang</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StorePage;
