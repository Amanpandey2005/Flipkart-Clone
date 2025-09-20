import React, { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Filter, Grid, List, Star, ChevronDown } from 'lucide-react'
import useStore from '../store/useStore'

const ProductList = () => {
  const [searchParams] = useSearchParams()
  const { products, addToCart } = useStore()
  const [filteredProducts, setFilteredProducts] = useState([])
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    rating: '',
    sortBy: 'relevance'
  })
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState('grid')

  const categories = [
    'Electronics', 'Fashion', 'Home & Furniture', 'Books', 'Sports', 'Beauty'
  ]

  const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Customer Rating' },
    { value: 'newest', label: 'Newest First' }
  ]

  useEffect(() => {
    let filtered = [...products]

    // Apply search filter
    const search = searchParams.get('search')
    if (search) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.brand.toLowerCase().includes(search.toLowerCase())
      )
    }

    // Apply category filter
    const category = searchParams.get('category')
    if (category) {
      filtered = filtered.filter(product =>
        product.category.toLowerCase() === category.toLowerCase()
      )
    }

    // Apply price filters
    if (filters.minPrice) {
      filtered = filtered.filter(product => product.price >= parseInt(filters.minPrice))
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(product => product.price <= parseInt(filters.maxPrice))
    }

    // Apply rating filter
    if (filters.rating) {
      filtered = filtered.filter(product => product.rating >= parseFloat(filters.rating))
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        filtered.sort((a, b) => b.id - a.id)
        break
      default:
        // Keep original order for relevance
        break
    }

    setFilteredProducts(filtered)
  }, [products, searchParams, filters])

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      category: '',
      minPrice: '',
      maxPrice: '',
      rating: '',
      sortBy: 'relevance'
    })
  }

  const handleAddToCart = (product) => {
    addToCart(product)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {searchParams.get('search') ? `Search Results for "${searchParams.get('search')}"` : 'All Products'}
          </h1>
          <p className="text-gray-600">
            {filteredProducts.length} products found
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-flipkart-blue hover:text-blue-700"
                >
                  Clear All
                </button>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Category</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={filters.category === category}
                        onChange={(e) => handleFilterChange('category', e.target.value)}
                        className="mr-2 text-flipkart-blue focus:ring-flipkart-blue"
                      />
                      <span className="text-sm text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Price Range</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Min Price</label>
                    <input
                      type="number"
                      placeholder="0"
                      value={filters.minPrice}
                      onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-flipkart-blue"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Max Price</label>
                    <input
                      type="number"
                      placeholder="100000"
                      value={filters.maxPrice}
                      onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-flipkart-blue"
                    />
                  </div>
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Customer Rating</h4>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map((rating) => (
                    <label key={rating} className="flex items-center">
                      <input
                        type="radio"
                        name="rating"
                        value={rating}
                        checked={filters.rating === rating.toString()}
                        onChange={(e) => handleFilterChange('rating', e.target.value)}
                        className="mr-2 text-flipkart-blue focus:ring-flipkart-blue"
                      />
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="text-sm text-gray-700 ml-1">& up</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-sm hover:bg-gray-50"
                  >
                    <Filter className="h-4 w-4" />
                    Filters
                  </button>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-sm ${
                        viewMode === 'grid' ? 'bg-flipkart-blue text-white' : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Grid className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-sm ${
                        viewMode === 'list' ? 'bg-flipkart-blue text-white' : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Sort by:</span>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-flipkart-blue"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Filter className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600">Try adjusting your filters or search terms</p>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid'
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                  : 'grid-cols-1'
              }`}>
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group ${
                      viewMode === 'list' ? 'flex' : ''
                    }`}
                  >
                    <Link to={`/product/${product.id}`} className={viewMode === 'list' ? 'flex-1 flex' : ''}>
                      <div className={`overflow-hidden ${viewMode === 'list' ? 'w-48 h-48' : 'aspect-square'}`}>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                        <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
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
                    <div className={`p-4 ${viewMode === 'list' ? 'flex flex-col justify-center' : ''}`}>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-full bg-flipkart-blue text-white py-2 px-4 rounded-sm hover:bg-blue-700 transition-colors text-sm font-medium"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductList
