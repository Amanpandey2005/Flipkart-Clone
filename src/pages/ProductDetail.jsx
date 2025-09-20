import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Star, Heart, Share2, Truck, Shield, RotateCcw, Minus, Plus } from 'lucide-react'
import useStore from '../store/useStore'

const ProductDetail = () => {
  const { id } = useParams()
  const { products, addToCart } = useStore()
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const product = products.find(p => p.id === parseInt(id))

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
          <Link to="/" className="text-flipkart-blue hover:text-blue-700">
            Go back to home
          </Link>
        </div>
      </div>
    )
  }

  const images = [
    product.image,
    'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop'
  ]

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-white p-4">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 ${
                    selectedImage === index ? 'border-flipkart-blue' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-gray-900">
                  ₹{product.price.toLocaleString()}
                </span>
                <span className="text-xl text-gray-500 line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                  {product.discount}% off
                </span>
              </div>

              <div className="text-sm text-gray-600">
                <p>Brand: <span className="font-medium">{product.brand}</span></p>
                <p>Category: <span className="font-medium">{product.category}</span></p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Key Features</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• High quality materials and construction</li>
                <li>• Excellent customer reviews and ratings</li>
                <li>• 1 year manufacturer warranty</li>
                <li>• Easy returns within 30 days</li>
                <li>• Free shipping on orders above ₹500</li>
              </ul>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-sm">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-100"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-flipkart-blue text-white py-3 px-6 rounded-sm hover:bg-blue-700 transition-colors font-medium"
                >
                  Add to Cart
                </button>
                <button className="p-3 border border-gray-300 rounded-sm hover:bg-gray-50">
                  <Heart className="h-5 w-5" />
                </button>
                <button className="p-3 border border-gray-300 rounded-sm hover:bg-gray-50">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Truck className="h-5 w-5 text-flipkart-blue" />
                  <span className="text-sm text-gray-600">Free Delivery</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-flipkart-green" />
                  <span className="text-sm text-gray-600">Secure Payment</span>
                </div>
                <div className="flex items-center space-x-2">
                  <RotateCcw className="h-5 w-5 text-flipkart-orange" />
                  <span className="text-sm text-gray-600">Easy Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="mt-12 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Product Description</h3>
          <div className="prose max-w-none text-gray-600">
            <p>
              This {product.name} from {product.brand} is a premium quality product that offers excellent value for money. 
              With a {product.rating}-star rating from {product.reviews} satisfied customers, this product has proven 
              to be reliable and high-performing.
            </p>
            <p className="mt-4">
              The product comes with a 1-year manufacturer warranty and includes all necessary accessories. 
              We offer free shipping on orders above ₹500 and easy returns within 30 days of purchase.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
