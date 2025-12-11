import { useState, useEffect } from 'react';
import { ShoppingCart, Heart, Filter, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Product } from '../lib/types';
import { useCart } from '../contexts/CartContext';

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showFilters, setShowFilters] = useState(false);
  const { addToCart } = useCart();

  const categories = ['All', 'Traditional Wear', 'Modern Fusion', 'Accessories', 'Limited Editions'];

  useEffect(() => {
    loadProducts();
  }, [selectedCategory]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      let query = supabase.from('products').select('*');

      if (selectedCategory !== 'All') {
        query = query.eq('category', selectedCategory);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product: Product) => {
    addToCart({
      type: 'product',
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images[0],
      productId: product.id,
      size: product.sizes[0],
    });
  };

  return (
    <section className="min-h-screen bg-black pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">Shop Collection</h1>
            <p className="text-gray-400">
              {products.length} {products.length === 1 ? 'product' : 'products'}
            </p>
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-yellow-400 font-medium flex items-center space-x-2"
          >
            <Filter className="w-5 h-5" />
            <span>Filters</span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div
            className={`${
              showFilters ? 'block' : 'hidden'
            } lg:block lg:w-64 bg-gray-900 rounded-xl p-6 border border-gray-800 h-fit sticky top-24`}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white">Categories</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="lg:hidden text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setShowFilters(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-yellow-500 text-white font-semibold'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1">
            {loading ? (
              <div className="text-center text-gray-400 py-20">Loading products...</div>
            ) : products.length === 0 ? (
              <div className="text-center text-gray-400 py-20">
                No products found in this category.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="group relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden border border-gray-800 hover:border-yellow-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/10"
                  >
                    <div className="aspect-[3/4] overflow-hidden bg-gray-800">
                      <img
                        src='/images/olady-oa-roka-girl.jpeg'
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    <div className="absolute top-4 right-4">
                      <button className="w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-yellow-500 transition-colors duration-200">
                        <Heart className="w-5 h-5 text-white" />
                      </button>
                    </div>

                    <div className="p-6">
                      <div className="mb-2">
                        <span className="text-yellow-400 text-sm font-medium">{product.category}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{product.description}</p>

                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold text-white">R{product.price.toFixed(2)}</div>
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 flex items-center space-x-2"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          <span>Add</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
