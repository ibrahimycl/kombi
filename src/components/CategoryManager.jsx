import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, Save, X, Tag, Flame, Wind, Thermometer, Droplets, Filter, Wrench, Zap, Settings } from 'lucide-react'

const iconMap = { Flame, Wind, Thermometer, Droplets, Filter, Wrench, Zap, Settings, Tag }
const iconOptions = Object.keys(iconMap)

const emptyCategory = { name: '', icon: 'Wrench', description: '' }

function CategoryManager() {
  const [categories, setCategories] = useState([])
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyCategory)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchData = () => {
    setLoading(true)
    fetch('/api/categories')
      .then(r => r.json())
      .then(data => {
        setCategories(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }

  useEffect(() => { fetchData() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const url = editing ? `/api/categories/${editing}` : '/api/categories'
      const method = editing ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Hata oluştu')
      }
      setShowForm(false)
      setEditing(null)
      setForm(emptyCategory)
      fetchData()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleEdit = (cat) => {
    setForm({ name: cat.name, icon: cat.icon || 'Wrench', description: cat.description || '' })
    setEditing(cat.id)
    setShowForm(true)
    setError('')
  }

  const handleDelete = async (id) => {
    if (!confirm('Bu kategoriyi silmek istediğinize emin misiniz?')) return
    try {
      const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error)
      }
      fetchData()
    } catch (err) {
      alert(err.message)
    }
  }

  const openNew = () => {
    setForm(emptyCategory)
    setEditing(null)
    setShowForm(true)
    setError('')
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Kategoriler</h2>
          <p className="text-sm text-gray-500 mt-0.5">Ürün kategorilerini yönetin</p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl transition-colors shadow-lg shadow-primary-500/20 text-sm"
        >
          <Plus className="w-4 h-4" /> Yeni Kategori
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">
                {editing ? 'Kategori Düzenle' : 'Yeni Kategori'}
              </h3>
              <button
                onClick={() => { setShowForm(false); setEditing(null); setError('') }}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-700">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kategori Adı</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10 text-sm"
                  placeholder="Örn: Termostat & Kontrol"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">İkon</label>
                <div className="grid grid-cols-5 gap-2">
                  {iconOptions.map(iconName => {
                    const Icon = iconMap[iconName]
                    return (
                      <button
                        type="button"
                        key={iconName}
                        onClick={() => setForm({ ...form, icon: iconName })}
                        className={`p-3 rounded-xl border-2 transition-all flex items-center justify-center ${
                          form.icon === iconName
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-100 hover:border-gray-300'
                        }`}
                        title={iconName}
                      >
                        <Icon className={`w-5 h-5 ${form.icon === iconName ? 'text-primary-600' : 'text-gray-500'}`} />
                      </button>
                    )
                  })}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Açıklama</label>
                <textarea
                  rows={2}
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10 text-sm resize-none"
                  placeholder="Kategori açıklaması..."
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => { setShowForm(false); setEditing(null); setError('') }}
                  className="flex-1 py-2.5 border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 text-sm"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl flex items-center justify-center gap-2 text-sm"
                >
                  <Save className="w-4 h-4" />
                  {editing ? 'Güncelle' : 'Kaydet'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Categories Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-2xl p-5 animate-pulse">
              <div className="h-10 w-10 bg-gray-100 rounded-xl mb-3" />
              <div className="h-4 bg-gray-100 rounded w-2/3 mb-2" />
              <div className="h-3 bg-gray-100 rounded w-full" />
            </div>
          ))}
        </div>
      ) : categories.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
          <Tag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">Henüz kategori eklenmemiş</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map(cat => {
            const Icon = iconMap[cat.icon] || Wrench
            return (
              <div key={cat.id} className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-lg hover:shadow-primary-500/5 transition-all group">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEdit(cat)}
                      className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id)}
                      className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{cat.name}</h3>
                <p className="text-sm text-gray-500 line-clamp-2 mb-2">{cat.description || 'Açıklama yok'}</p>
                <span className="inline-block px-2 py-0.5 bg-gray-50 text-gray-500 text-xs font-mono rounded">
                  {cat.id}
                </span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default CategoryManager
