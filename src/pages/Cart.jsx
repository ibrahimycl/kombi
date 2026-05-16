import { Link } from 'react-router-dom'
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft, Package, MessageCircle } from 'lucide-react'
import { useCart } from '../context/CartContext'

function Cart() {
  const { items, removeItem, updateQuantity, clearCart, totalPrice } = useCart()

  const handleCheckout = async () => {
    const shipping = totalPrice >= 500 ? 0 : 49
    const grandTotal = totalPrice + shipping

    // Siparişi backend'e kaydet
    try {
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(i => ({
            id: i.id,
            name: i.name,
            brand: i.brand,
            price: i.price,
            quantity: i.quantity,
          })),
          subtotal: totalPrice,
          shipping,
          total: grandTotal,
        }),
      })
    } catch (err) {
      console.error('Sipariş kaydedilemedi:', err)
    }

    let message = `*🛒 YENİ SİPARİŞ*

`
    message += `*📦 Ürünler:*
`
    items.forEach((item, i) => {
      message += `${i + 1}. ${item.name}
`
      message += `   Marka: ${item.brand}
`
      message += `   Adet: ${item.quantity} x ${item.price.toLocaleString('tr-TR')} ₺
`
      message += `   Tutar: ${(item.price * item.quantity).toLocaleString('tr-TR')} ₺

`
    })

    message += `*💰 Özet:*
`
    message += `Ara Toplam: ${totalPrice.toLocaleString('tr-TR')} ₺
`
    message += `Kargo: ${shipping === 0 ? 'Ücretsiz' : shipping + ' ₺'}
`
    message += `*Genel Toplam: ${grandTotal.toLocaleString('tr-TR')} ₺*`

    const whatsappUrl = `https://wa.me/905316466294?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <ShoppingBag className="w-20 h-20 text-gray-200 mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Sepetiniz Boş</h2>
        <p className="text-gray-500 mb-8">Henüz sepetinize ürün eklemediniz.</p>
        <Link
          to="/urunler"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Ürünlere Git
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sepet</h1>
          <p className="text-gray-500 mt-1">{items.length} ürün</p>
        </div>
        <button
          onClick={clearCart}
          className="text-sm text-red-600 hover:text-red-700 font-medium hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors"
        >
          Sepeti Temizle
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => (
            <div key={item.id} className="bg-white rounded-2xl border border-gray-100 p-4 flex gap-4">
              <div className="w-24 h-24 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-xl" />
                ) : (
                  <Package className="w-10 h-10 text-gray-300" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.brand}</p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 hover:bg-gray-50 transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-3 py-1.5 text-sm font-medium min-w-[2.5rem] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 hover:bg-gray-50 transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <span className="font-bold text-gray-900">
                    {(item.price * item.quantity).toLocaleString('tr-TR')} ₺
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Sipariş Özeti</h3>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Ara Toplam</span>
                <span className="font-medium">{totalPrice.toLocaleString('tr-TR')} ₺</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Kargo</span>
                <span className="font-medium text-green-600">
                  {totalPrice >= 500 ? 'Ücretsiz' : '49 ₺'}
                </span>
              </div>
              <div className="border-t border-gray-100 pt-3 flex justify-between">
                <span className="font-semibold text-gray-900">Toplam</span>
                <span className="text-xl font-bold text-gray-900">
                  {(totalPrice + (totalPrice >= 500 ? 0 : 49)).toLocaleString('tr-TR')} ₺
                </span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-green-500/20"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp ile Siparişi Tamamla
            </button>

            <Link
              to="/urunler"
              className="block text-center mt-3 text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              Alışverişe Devam Et
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
