import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Pencil, Trash2, Save, X, Package, LayoutDashboard, LogOut, User, Tag, ClipboardList } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import CategoryManager from '../components/CategoryManager'
import TrackingManager from '../components/TrackingManager'

const emptyProduct = {
  name: '',
  description: '',
  price: '',
  category: '',
  brand: '',
  stock: '',
  image: '',
  featured: false,
}

function Admin() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyProduct)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ total: 0, lowStock: 0, categories: 0 })
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('products')

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const fetchData = () => {
    setLoading(true)
    Promise.all([
      fetch('/api/products').then(r => r.json()),
      fetch('/api/categories').then(r => r.json()),
    ]).then(([prods, cats]) => {
      setProducts(prods)
      setCategories(cats)
      setStats({
        total: prods.length,
        lowStock: prods.filter(p => p.stock <= 5).length,
        categories: cats.length,
      })
      setLoading(false)
    }).catch(() => setLoading(false))
  }

  useEffect(() => { fetchData() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
    }

    try {
      if (editing) {
        await fetch(`/api/products/${editing}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      } else {
        await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      }
      setShowForm(false)
      setEditing(null)
      setForm(emptyProduct)
      fetchData()
    } catch (err) {
      alert('Hata oluştu: ' + err.message)
    }
  }

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      brand: product.brand,
      stock: product.stock,
      image: product.image || '',
      featured: product.featured || false,
    })
    setEditing(product.id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Bu ürünü silmek istediğinize emin misiniz?')) return
    await fetch(`/api/products/${id}`, { method: 'DELETE' })
    fetchData()
  }

  const openNew = () => {
    setForm(emptyProduct)
    setEditing(null)
    setShowForm(true)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <LayoutDashboard className="w-5 h-5 text-primary-600" />
          </div>
          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 truncate">Yönetim Paneli</h1>
            <p className="text-sm text-gray-500 hidden sm:block">Ürün ekle, düzenle ve yönet</p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {user && (
            <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-xl">
              <div className="w-7 h-7 bg-primary-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-primary-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">{user.name}</span>
            </div>
          )}
          {activeTab === 'products' && (
            <button
              onClick={openNew}
              className="flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl transition-colors shadow-lg shadow-primary-500/20 text-sm"
            >
              <Plus className="w-4 h-4" /> Yeni Ürün
            </button>
          )}
          <button
            onClick={handleLogout}
            title="Çıkış Yap"
            className="flex items-center gap-2 px-3 sm:px-4 py-2.5 bg-white border border-gray-200 hover:bg-red-50 hover:border-red-200 hover:text-red-600 text-gray-700 font-medium rounded-xl transition-colors text-sm"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Çıkış</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-6 bg-white border border-gray-100 rounded-2xl p-1.5 overflow-x-auto w-fit max-w-full">
        <button
          onClick={() => setActiveTab('products')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
            activeTab === 'products'
              ? 'bg-primary-600 text-white shadow-md shadow-primary-500/20'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Package className="w-4 h-4" /> Ürünler
        </button>
        <button
          onClick={() => setActiveTab('categories')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
            activeTab === 'categories'
              ? 'bg-primary-600 text-white shadow-md shadow-primary-500/20'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Tag className="w-4 h-4" /> Kategoriler
        </button>
        <button
          onClick={() => setActiveTab('tracking')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
            activeTab === 'tracking'
              ? 'bg-primary-600 text-white shadow-md shadow-primary-500/20'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <ClipboardList className="w-4 h-4" /> Takip
        </button>
      </div>

      {activeTab === 'tracking' ? (
        <TrackingManager />
      ) : activeTab === 'categories' ? (
        <CategoryManager />
      ) : (
      <>
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Toplam Ürün', value: stats.total, color: 'primary' },
          { label: 'Düşük Stok', value: stats.lowStock, color: 'red' },
          { label: 'Kategori', value: stats.categories, color: 'green' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5">
            <p className="text-sm text-gray-500">{s.label}</p>
            <p className={`text-3xl font-bold mt-1 text-${s.color === 'primary' ? 'primary-700' : s.color === 'red' ? 'red-600' : 'green-600'}`}>
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">
                {editing ? 'Ürün Düzenle' : 'Yeni Ürün Ekle'}
              </h2>
              <button
                onClick={() => { setShowForm(false); setEditing(null) }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ürün Adı</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10 text-sm"
                  placeholder="Örn: Kombi Eşanjör"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Açıklama</label>
                <textarea
                  required
                  rows={3}
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10 text-sm resize-none"
                  placeholder="Ürün açıklaması..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fiyat (₺)</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={form.price}
                    onChange={e => setForm({ ...form, price: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stok</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={form.stock}
                    onChange={e => setForm({ ...form, stock: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                  <select
                    required
                    value={form.category}
                    onChange={e => setForm({ ...form, category: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10 text-sm"
                  >
                    <option value="">Seçin...</option>
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Marka</label>
                  <input
                    type="text"
                    required
                    value={form.brand}
                    onChange={e => setForm({ ...form, brand: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10 text-sm"
                    placeholder="Örn: Vaillant"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Görsel URL</label>
                <input
                  type="text"
                  value={form.image}
                  onChange={e => setForm({ ...form, image: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10 text-sm"
                  placeholder="https://i.ibb.co/.../foto.jpg"
                />
                <p className="text-xs text-gray-500 mt-1.5">
                  💡 Fotoğrafı{' '}
                  <a href="https://imgbb.com" target="_blank" rel="noreferrer" className="text-primary-600 hover:underline font-medium">imgbb.com</a>
                  {' '}veya{' '}
                  <a href="https://postimages.org" target="_blank" rel="noreferrer" className="text-primary-600 hover:underline font-medium">postimages.org</a>
                  {' '}adresine yükleyin, <strong>"Direct link"</strong> seçeneğindeki URL'yi yapıştırın.
                </p>

                {form.image && /^https?:\/\/(www\.)?(ibb\.co|postimg\.cc|postimages\.org)\//i.test(form.image) && !/\.(jpg|jpeg|png|webp|gif)(\?|$)/i.test(form.image) && (
                  <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800">
                    ⚠️ Bu sayfa linki gibi görünüyor, fotoğrafın <strong>direct link</strong>'ini kullanman gerek. Doğru URL şöyle olmalı:{' '}
                    <code className="bg-white px-1 py-0.5 rounded font-mono">https://i.ibb.co/.../foto.jpg</code>
                  </div>
                )}

                {form.image && (
                  <div className="mt-3 border border-gray-200 rounded-xl overflow-hidden bg-gray-50 relative">
                    <img
                      src={form.image}
                      alt="Önizleme"
                      className="w-full h-40 object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none'
                        if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex'
                      }}
                      onLoad={(e) => {
                        e.target.style.display = 'block'
                        if (e.target.nextSibling) e.target.nextSibling.style.display = 'none'
                      }}
                    />
                    <div className="hidden h-40 w-full items-center justify-center text-center px-4 text-sm text-red-600">
                      ❌ Görsel yüklenemedi. URL'in doğru bir resim linki olduğundan emin ol (.jpg / .png / .webp ile bitmeli).
                    </div>
                  </div>
                )}
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={e => setForm({ ...form, featured: e.target.checked })}
                  className="w-4 h-4 rounded text-primary-600"
                />
                <span className="text-sm text-gray-700">Öne çıkan ürün olarak göster</span>
              </label>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => { setShowForm(false); setEditing(null) }}
                  className="flex-1 py-2.5 border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors text-sm"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <Save className="w-4 h-4" />
                  {editing ? 'Güncelle' : 'Kaydet'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Ürün</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Kategori</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Marka</th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-gray-600">Fiyat</th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-gray-600">Stok</th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-gray-600">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="border-b border-gray-50 animate-pulse">
                    <td className="py-4 px-6"><div className="h-4 bg-gray-100 rounded w-40" /></td>
                    <td className="py-4 px-6"><div className="h-4 bg-gray-100 rounded w-24" /></td>
                    <td className="py-4 px-6"><div className="h-4 bg-gray-100 rounded w-20" /></td>
                    <td className="py-4 px-6"><div className="h-4 bg-gray-100 rounded w-16 ml-auto" /></td>
                    <td className="py-4 px-6"><div className="h-4 bg-gray-100 rounded w-12 ml-auto" /></td>
                    <td className="py-4 px-6"><div className="h-4 bg-gray-100 rounded w-20 ml-auto" /></td>
                  </tr>
                ))
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center">
                    <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">Henüz ürün eklenmemiş</p>
                  </td>
                </tr>
              ) : products.map(product => (
                <tr key={product.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        {product.image ? (
                          <img src={product.image} alt="" className="w-10 h-10 object-cover rounded-lg" />
                        ) : (
                          <Package className="w-5 h-5 text-gray-300" />
                        )}
                      </div>
                      <span className="font-medium text-gray-900 text-sm">{product.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">{product.categoryName}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{product.brand}</td>
                  <td className="py-4 px-6 text-sm font-semibold text-gray-900 text-right">
                    {product.price.toLocaleString('tr-TR')} ₺
                  </td>
                  <td className="py-4 px-6 text-right">
                    <span className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-medium ${
                      product.stock > 10
                        ? 'bg-green-50 text-green-700'
                        : product.stock > 0
                        ? 'bg-amber-50 text-amber-700'
                        : 'bg-red-50 text-red-700'
                    }`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => handleEdit(product)}
                        className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </>
      )}
    </div>
  )
}

export default Admin
