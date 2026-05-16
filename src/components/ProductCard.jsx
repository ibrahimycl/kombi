import { Link } from 'react-router-dom'
import { ShoppingCart, Package, Star } from 'lucide-react'
import { useCart } from '../context/CartContext'

function ProductCard({ product }) {
  const { addItem } = useCart()

  const handleAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
  }

  return (
    <Link
      to={`/urunler/${product.id}`}
      className="group bg-white rounded-2xl border border-gray-100 hover:border-primary-200 hover:shadow-xl hover:shadow-primary-500/5 transition-all duration-300 overflow-hidden flex flex-col"
    >
      {/* Image Area */}
      <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
        {product.image ? (
          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <Package className="w-16 h-16 text-gray-300 group-hover:text-primary-300 transition-colors" />
        )}
        {product.featured && (
          <div className="absolute top-3 left-3 px-2.5 py-1 bg-accent-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1">
            <Star className="w-3 h-3" /> Öne Çıkan
          </div>
        )}
        {product.stock <= 5 && product.stock > 0 && (
          <div className="absolute top-3 right-3 px-2.5 py-1 bg-red-500 text-white text-xs font-semibold rounded-lg">
            Son {product.stock} adet
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-0.5 rounded-md">
            {product.brand}
          </span>
          <span className="text-xs text-gray-400">{product.categoryName}</span>
        </div>

        <h3 className="font-semibold text-gray-900 group-hover:text-primary-700 transition-colors line-clamp-2 mb-2">
          {product.name}
        </h3>

        <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
          <div>
            <span className="text-xl font-bold text-gray-900">
              {product.price.toLocaleString('tr-TR')}
            </span>
            <span className="text-sm text-gray-500 ml-1">₺</span>
          </div>

          <button
            onClick={handleAdd}
            disabled={product.stock === 0}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 text-white text-sm font-medium rounded-xl transition-colors shadow-sm hover:shadow-md"
          >
            <ShoppingCart className="w-4 h-4" />
            Ekle
          </button>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
