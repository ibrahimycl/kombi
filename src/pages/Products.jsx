import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal, X, Package } from 'lucide-react'
import ProductCard from '../components/ProductCard'

function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '')
  const [sortBy, setSortBy] = useState('name')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    fetch('/api/categories').then(r => r.json()).then(setCategories).catch(() => {})
  }, [])

  useEffect(() => {
    setLoading(true)
    const params = new URLSearchParams()
    if (searchTerm) params.set('search', searchTerm)
    if (selectedCategory) params.set('category', selectedCategory)
    if (sortBy) params.set('sort', sortBy)

    fetch(`/api/products?${params}`)
      .then(r => r.json())
      .then(data => {
        setProducts(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [searchTerm, selectedCategory, sortBy])

  const handleSearch = (e) => {
    e.preventDefault()
    const val = e.target.elements.search.value
    setSearchTerm(val)
    setSearchParams(prev => {
      if (val) prev.set('search', val)
      else prev.delete('search')
      return prev
    })
  }

  const handleCategoryChange = (catId) => {
    const val = selectedCategory === catId ? '' : catId
    setSelectedCategory(val)
    setSearchParams(prev => {
      if (val) prev.set('category', val)
      else prev.delete('category')
      return prev
    })
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('')
    setSortBy('name')
    setSearchParams({})
  }

  const hasFilters = searchTerm || selectedCategory

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Ürünler</h1>
        <p className="text-gray-500 mt-1">Tüm kombi ve klima yedek parçaları</p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-6 flex flex-col sm:flex-row gap-4">
        <form onSubmit={handleSearch} className="flex items-center flex-1 bg-gray-50 rounded-xl px-4">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            name="search"
            type="text"
            placeholder="Ürün adı veya marka ara..."
            defaultValue={searchTerm}
            className="w-full py-2.5 px-3 bg-transparent outline-none text-sm"
          />
          <button type="submit" className="text-primary-600 font-medium text-sm hover:text-primary-700">
            Ara
          </button>
        </form>

        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="px-4 py-2.5 bg-gray-50 rounded-xl text-sm text-gray-700 outline-none border-none cursor-pointer"
          >
            <option value="name">İsme Göre</option>
            <option value="price_asc">Fiyat (Düşük → Yüksek)</option>
            <option value="price_desc">Fiyat (Yüksek → Düşük)</option>
          </select>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              showFilters ? 'bg-primary-50 text-primary-700' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filtre
          </button>

          {hasFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors"
            >
              <X className="w-4 h-4" />
              Temizle
            </button>
          )}
        </div>
      </div>

      {/* Category Filters */}
      {showFilters && (
        <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Kategoriler</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="mb-4 text-sm text-gray-500">
        {loading ? 'Yükleniyor...' : `${products.length} ürün bulundu`}
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
              <div className="h-48 bg-gray-100" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-100 rounded w-2/3" />
                <div className="h-3 bg-gray-100 rounded w-full" />
                <div className="h-3 bg-gray-100 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Ürün bulunamadı</h3>
          <p className="text-gray-500">Farklı bir arama terimi veya filtre deneyin.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Products
