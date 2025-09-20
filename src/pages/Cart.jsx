import React from 'react'
import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2, ArrowLeft } from 'lucide-react'
import useStore from '../store/useStore'

const Cart = () => {
  const { cart, cartCount, addToCart, removeFromCart, getCartTotal, clearCart } = useStore()

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="h-24 w-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
            <Link
              to="/products"
              className="bg-flipkart-blue text-white px-6 py-3 rounded-sm hover:bg-blue-700 transition-colors font-medium"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <Link
            to="/products"
            className="flex items-center text-flipkart-blue hover:text-blue-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-24 h-24 overflow-hidden rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{item.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{item.brand}</p>
                    <div className="flex items-center space-x-4">
                      <span className="text-xl font-bold text-gray-900">
                        ₹{item.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        ₹{item.originalPrice.toLocaleString()}
                      </span>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        {item.discount}% off
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center border border-gray-300 rounded-sm">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 hover:bg-gray-100"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-4 py-2 border-x border-gray-300">{item.quantity}</span>
                      <button
                        onClick={() => addToCart(item)}
                        className="p-2 hover:bg-gray-100"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => {
                        for (let i = 0; i < item.quantity; i++) {
                          removeFromCart(item.id)
                        }
                      }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal ({cartCount} items)</span>
                  <span className="font-medium">₹{getCartTotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery Charges</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">₹{(getCartTotal() * 0.18).toFixed(0)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>₹{(getCartTotal() * 1.18).toFixed(0)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Link
                  to="/checkout"
                  className="w-full bg-flipkart-blue text-white py-3 px-4 rounded-sm hover:bg-blue-700 transition-colors font-medium text-center block"
                >
                  Proceed to Checkout
                </Link>
                <button
                  onClick={clearCart}
                  className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-sm hover:bg-gray-50 transition-colors font-medium"
                >
                  Clear Cart
                </button>
              </div>

              <div className="mt-6 text-xs text-gray-500">
                <p>• Free delivery on orders above ₹500</p>
                <p>• 30-day return policy</p>
                <p>• Secure payment options</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
