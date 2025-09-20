import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Star, Truck, Shield, RotateCcw } from 'lucide-react'
import useStore from '../store/useStore'

const Home = () => {
  const { categories, products, setProducts } = useStore()

  // Sample products data
  const sampleProducts = [
    {
      id: 1,
      name: 'iPhone 14 Pro',
      price: 99999,
      originalPrice: 109999,
      discount: 9,
      rating: 4.5,
      reviews: 1250,
      image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=300&h=300&fit=crop',
      category: 'Electronics',
      brand: 'Apple'
    },
    {
      id: 2,
      name: 'Samsung Galaxy S23',
      price: 79999,
      originalPrice: 89999,
      discount: 11,
      rating: 4.3,
      reviews: 890,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop',
      category: 'Electronics',
      brand: 'Samsung'
    },
    {
      id: 3,
      name: 'Nike Air Max 270',
      price: 12999,
      originalPrice: 15999,
      discount: 19,
      rating: 4.7,
      reviews: 2100,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
      category: 'Fashion',
      brand: 'Nike'
    },
    {
      id: 4,
      name: 'MacBook Air M2',
      price: 99999,
      originalPrice: 119999,
      discount: 17,
      rating: 4.8,
      reviews: 560,
      image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=300&h=300&fit=crop',
      category: 'Electronics',
      brand: 'Apple'
    },
    {
      id: 5,
      name: 'Sony WH-1000XM4',
      price: 24999,
      originalPrice: 29999,
      discount: 17,
      rating: 4.6,
      reviews: 1800,
      image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300&h=300&fit=crop',
      category: 'Electronics',
      brand: 'Sony'
    },
    {
      id: 6,
      name: 'Adidas Ultraboost 22',
      price: 15999,
      originalPrice: 18999,
      discount: 16,
      rating: 4.4,
      reviews: 950,
      image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&h=300&fit=crop',
      category: 'Fashion',
      brand: 'Adidas'
    }
  ]

  useEffect(() => {
    if (products.length === 0) {
      setProducts(sampleProducts)
    }
  }, [products.length, setProducts])

  const featuredProducts = products.slice(0, 6)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-flipkart-blue to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to Flipkart
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              India's Largest Online Shopping Destination
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="bg-flipkart-orange hover:bg-orange-600 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors inline-flex items-center justify-center"
              >
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/products?category=electronics"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-flipkart-blue px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
              >
                Electronics
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/products?category=${category.name.toLowerCase()}`}
                className="group text-center p-6 rounded-lg hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-flipkart-blue"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <h3 className="text-sm font-medium text-gray-900 group-hover:text-flipkart-blue">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Featured Products
            </h2>
            <Link
              to="/products"
              className="text-flipkart-blue hover:text-blue-700 font-medium flex items-center"
            >
              View All
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group"
              >
                <Link to={`/product/${product.id}`}>
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 text-sm mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 ml-1">
                        ({product.reviews})
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-lg font-bold text-gray-900">
                        ₹{product.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                      <span className="text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded">
                        {product.discount}% off
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">{product.brand}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-flipkart-blue bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-flipkart-blue" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Free Delivery
              </h3>
              <p className="text-gray-600 text-sm">
                Free delivery on orders above ₹500
              </p>
            </div>
            <div className="text-center">
              <div className="bg-flipkart-green bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-flipkart-green" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Secure Payment
              </h3>
              <p className="text-gray-600 text-sm">
                100% secure payment options
              </p>
            </div>
            <div className="text-center">
              <div className="bg-flipkart-orange bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <RotateCcw className="h-8 w-8 text-flipkart-orange" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Easy Returns
              </h3>
              <p className="text-gray-600 text-sm">
                30-day return policy
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Best Quality
              </h3>
              <p className="text-gray-600 text-sm">
                Authentic products guaranteed
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
