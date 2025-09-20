import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, ShoppingCart, User, Menu, X, Heart } from 'lucide-react'
import useStore from '../store/useStore'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  const { isAuthenticated, user, cartCount, logout } = useStore()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`)
      setSearchQuery('')
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="bg-flipkart-blue text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold">Flipkart</div>
            <div className="text-xs text-yellow-300">
              <div>Explore</div>
              <div className="text-orange-400">Plus</div>
            </div>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products, brands and more"
                className="w-full px-4 py-2 pl-10 pr-4 text-gray-900 rounded-sm focus:outline-none"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <button
                type="submit"
                className="absolute right-0 top-0 h-full px-6 bg-flipkart-orange text-white rounded-r-sm hover:bg-orange-600 transition-colors"
              >
                Search
              </button>
            </div>
          </form>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Login/User */}
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-1 hover:text-yellow-300 transition-colors">
                  <User className="h-5 w-5" />
                  <span className="hidden sm:block">{user?.name || 'Account'}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-1">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      My Profile
                    </Link>
                    <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      My Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link to="/login" className="flex items-center space-x-1 hover:text-yellow-300 transition-colors">
                <User className="h-5 w-5" />
                <span className="hidden sm:block">Login</span>
              </Link>
            )}

            {/* Wishlist */}
            <Link to="/wishlist" className="flex items-center space-x-1 hover:text-yellow-300 transition-colors">
              <Heart className="h-5 w-5" />
              <span className="hidden sm:block">Wishlist</span>
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative flex items-center space-x-1 hover:text-yellow-300 transition-colors">
              <ShoppingCart className="h-5 w-5" />
              <span className="hidden sm:block">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-flipkart-orange text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:text-yellow-300 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products, brands and more"
              className="w-full px-4 py-2 pl-10 pr-4 text-gray-900 rounded-sm focus:outline-none"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <button
              type="submit"
              className="absolute right-0 top-0 h-full px-4 bg-flipkart-orange text-white rounded-r-sm hover:bg-orange-600 transition-colors"
            >
              Search
            </button>
          </form>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-blue-600 py-4">
            <div className="space-y-2">
              {!isAuthenticated && (
                <Link
                  to="/signup"
                  className="block px-4 py-2 hover:bg-blue-700 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              )}
              <Link
                to="/wishlist"
                className="block px-4 py-2 hover:bg-blue-700 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Wishlist
              </Link>
              {isAuthenticated && (
                <>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-blue-700 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 hover:bg-blue-700 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout()
                      setIsMenuOpen(false)
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-blue-700 transition-colors"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
