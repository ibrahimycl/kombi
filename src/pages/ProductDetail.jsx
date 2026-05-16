import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ShoppingCart, Package, ArrowLeft, Minus, Plus, CheckCircle, AlertCircle, Truck } from 'lucide-react'
import { useCart } from '../context/CartContext'

function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const { addItem } = useCart()

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(r => r.json())
      .then(data => {
        setProduct(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [id])

  const handleAdd = () => {
    if (!product) return
    addItem(product, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="h-96 bg-gray-100 rounded-2xl" />
          <div className="space-y-4">
            <div className="h-6 bg-gray-100 rounded w-1/3" />
            <div className="h-8 bg-gray-100 rounded w-2/3" />
            <div className="h-4 bg-gray-100 rounded w-full" />
            <div className="h-4 bg-gray-100 rounded w-3/4" />
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Ürün bulunamadı</h2>
        <Link to="/urunler" className="text-primary-600 hover:text-primary-700 font-medium">
          ← Ürünlere dön
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <Link to="/urunler" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Ürünlere Dön
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image */}
        <div className="bg-white rounded-2xl border border-gray-100 h-96 flex items-center justify-center overflow-hidden">
          {product.image ? (
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          ) : (
            <Package className="w-24 h-24 text-gray-200" />
          )}
        </div>

        {/* Details */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 bg-primary-50 text-primary-700 text-sm font-medium rounded-lg">
              {product.brand}
            </span>
            <span className="text-sm text-gray-400">{product.categoryName}</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
          <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

          {/* Price */}
          <div className="mb-6">
            <span className="text-4xl font-bold text-gray-900">
              {product.price.toLocaleString('tr-TR')}
            </span>
            <span className="text-xl text-gray-500 ml-1">₺</span>
          </div>

          {/* Stock */}
          <div className="flex items-center gap-2 mb-6">
            {product.stock > 0 ? (
              <>
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium text-green-700">Stokta ({product.stock} adet)</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-5 h-5 text-red-500" />
                <span className="text-sm font-medium text-red-700">Stokta yok</span>
              </>
            )}
          </div>

          {/* Quantity & Add */}
          {product.stock > 0 && (
            <div className="flex items-center gap-3 sm:gap-4 mb-6 flex-wrap">
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden flex-shrink-0">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-gray-50 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-5 py-3 font-semibold text-gray-900 min-w-[3rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="p-3 hover:bg-gray-50 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleAdd}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 sm:px-8 py-3 rounded-xl font-semibold text-white transition-all shadow-lg ${
                  added
                    ? 'bg-green-500 shadow-green-500/20'
                    : 'bg-primary-600 hover:bg-primary-700 shadow-primary-500/20'
                }`}
              >
                {added ? (
                  <>
                    <CheckCircle className="w-5 h-5" /> Eklendi!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" /> Sepete Ekle
                  </>
                )}
              </button>
            </div>
          )}

          {/* Shipping info */}
          <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">
            <Truck className="w-5 h-5 text-primary-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">Hızlı Kargo</p>
              <p className="text-xs text-gray-500">500₺ üzeri siparişlerde ücretsiz kargo</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
