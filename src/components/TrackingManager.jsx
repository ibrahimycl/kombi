import { useState, useEffect } from 'react'
import { ShoppingBag, Wrench, Clock, CheckCircle, XCircle, Phone, MapPin, Mail, Package, Trash2, ChevronDown, MessageCircle, Calendar, User } from 'lucide-react'

const STATUS_OPTIONS = [
  { value: 'pending', label: 'Beklemede', color: 'amber', icon: Clock },
  { value: 'contacted', label: 'İletişime Geçildi', color: 'blue', icon: Phone },
  { value: 'completed', label: 'Tamamlandı', color: 'green', icon: CheckCircle },
  { value: 'cancelled', label: 'İptal Edildi', color: 'red', icon: XCircle },
]

function StatusBadge({ status, onChange }) {
  const [open, setOpen] = useState(false)
  const current = STATUS_OPTIONS.find(s => s.value === status) || STATUS_OPTIONS[0]
  const Icon = current.icon

  const colorClasses = {
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    green: 'bg-green-50 text-green-700 border-green-200',
    red: 'bg-red-50 text-red-700 border-red-200',
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border ${colorClasses[current.color]} hover:opacity-80 transition-opacity`}
      >
        <Icon className="w-3.5 h-3.5" />
        {current.label}
        <ChevronDown className="w-3 h-3" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute top-full left-0 mt-1 w-44 bg-white border border-gray-100 rounded-xl shadow-xl z-20 py-1">
            {STATUS_OPTIONS.map(opt => {
              const OptIcon = opt.icon
              return (
                <button
                  key={opt.value}
                  onClick={() => { onChange(opt.value); setOpen(false) }}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 text-left ${
                    opt.value === status ? 'bg-gray-50 font-medium' : ''
                  }`}
                >
                  <OptIcon className={`w-4 h-4 text-${opt.color}-600`} />
                  {opt.label}
                </button>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}

function formatDate(iso) {
  if (!iso) return '-'
  const d = new Date(iso)
  return d.toLocaleString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

function OrderCard({ order, onStatusChange, onDelete }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-gray-200/50 transition-all">
      <div className="p-5">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex items-start gap-3 min-w-0">
            <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <ShoppingBag className="w-5 h-5 text-primary-600" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <h3 className="font-semibold text-gray-900">Sipariş</h3>
                <span className="text-xs text-gray-400 font-mono">#{order.id.slice(0, 8)}</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {formatDate(order.createdAt)}
                </span>
                <span>•</span>
                <span>{order.items.length} ürün</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <StatusBadge status={order.status} onChange={s => onStatusChange(order.id, s)} />
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
          <div>
            <span className="text-xs text-gray-500">Toplam Tutar</span>
            <p className="text-lg font-bold text-gray-900">{order.total.toLocaleString('tr-TR')} ₺</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setExpanded(!expanded)}
              className="px-3 py-1.5 text-xs font-medium text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
            >
              {expanded ? 'Detayı Gizle' : 'Detayı Gör'}
            </button>
            <button
              onClick={() => onDelete(order.id)}
              className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {expanded && (
          <div className="mt-4 pt-4 border-t border-gray-50 space-y-2">
            <p className="text-xs font-semibold text-gray-600 mb-2">Ürünler:</p>
            {order.items.map((item, i) => (
              <div key={i} className="flex items-center justify-between gap-3 p-3 bg-gray-50 rounded-xl text-sm">
                <div className="flex items-center gap-2 min-w-0">
                  <Package className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="font-medium text-gray-900 truncate">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.brand} • {item.quantity} adet</p>
                  </div>
                </div>
                <span className="font-semibold text-gray-900 flex-shrink-0">
                  {(item.price * item.quantity).toLocaleString('tr-TR')} ₺
                </span>
              </div>
            ))}
            <div className="flex justify-between text-xs text-gray-500 pt-2">
              <span>Ara Toplam: {order.subtotal.toLocaleString('tr-TR')} ₺</span>
              <span>Kargo: {order.shipping === 0 ? 'Ücretsiz' : order.shipping + ' ₺'}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function ServiceCard({ service, onStatusChange, onDelete }) {
  const [expanded, setExpanded] = useState(false)
  const deviceLabel = service.deviceType === 'kombi' ? 'Kombi' : service.deviceType === 'klima' ? 'Klima' : 'Diğer'

  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-gray-200/50 transition-all">
      <div className="p-5">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex items-start gap-3 min-w-0">
            <div className="w-10 h-10 bg-accent-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <Wrench className="w-5 h-5 text-accent-600" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <h3 className="font-semibold text-gray-900 truncate">{service.name}</h3>
                <span className="text-xs text-gray-400 font-mono">#{service.id.slice(0, 8)}</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {formatDate(service.createdAt)}
                </span>
                <span>•</span>
                <span className="font-medium">{deviceLabel}</span>
                {service.brand && <><span>•</span><span>{service.brand}</span></>}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <StatusBadge status={service.status} onChange={s => onStatusChange(service.id, s)} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
          <a href={`tel:${service.phone}`} className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-xl text-sm hover:bg-gray-100 transition-colors">
            <Phone className="w-4 h-4 text-primary-600" />
            <span className="font-medium text-gray-700">{service.phone}</span>
          </a>
          <a
            href={`https://wa.me/${service.phone.replace(/\D/g, '').replace(/^0/, '90')}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-3 py-2 bg-green-50 rounded-xl text-sm hover:bg-green-100 transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-green-600" />
            <span className="font-medium text-green-700">WhatsApp</span>
          </a>
        </div>

        <div className="flex items-center justify-end gap-2 mt-3">
          <button
            onClick={() => setExpanded(!expanded)}
            className="px-3 py-1.5 text-xs font-medium text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
          >
            {expanded ? 'Detayı Gizle' : 'Detayı Gör'}
          </button>
          <button
            onClick={() => onDelete(service.id)}
            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {expanded && (
          <div className="mt-4 pt-4 border-t border-gray-50 space-y-3">
            {service.email && (
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700">{service.email}</span>
              </div>
            )}
            <div className="flex items-start gap-2 text-sm">
              <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">{service.address}</span>
            </div>
            {service.preferredDate && (
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700">Tercih edilen tarih: {service.preferredDate}</span>
              </div>
            )}
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs font-semibold text-gray-600 mb-1">Arıza Açıklaması:</p>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{service.problem}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function TrackingManager() {
  const [tab, setTab] = useState('orders')
  const [orders, setOrders] = useState([])
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('all')

  const fetchData = () => {
    setLoading(true)
    Promise.all([
      fetch('/api/orders').then(r => r.json()),
      fetch('/api/services').then(r => r.json()),
    ]).then(([ords, srvs]) => {
      // Sort newest first
      setOrders(ords.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
      setServices(srvs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
      setLoading(false)
    }).catch(() => setLoading(false))
  }

  useEffect(() => { fetchData() }, [])

  const updateOrderStatus = async (id, status) => {
    await fetch(`/api/orders/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    fetchData()
  }

  const deleteOrder = async (id) => {
    if (!confirm('Bu siparişi silmek istediğinize emin misiniz?')) return
    await fetch(`/api/orders/${id}`, { method: 'DELETE' })
    fetchData()
  }

  const updateServiceStatus = async (id, status) => {
    await fetch(`/api/services/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    fetchData()
  }

  const deleteService = async (id) => {
    if (!confirm('Bu servis talebini silmek istediğinize emin misiniz?')) return
    await fetch(`/api/services/${id}`, { method: 'DELETE' })
    fetchData()
  }

  const list = tab === 'orders' ? orders : services
  const filtered = statusFilter === 'all' ? list : list.filter(i => i.status === statusFilter)

  const orderStats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    revenue: orders.filter(o => o.status === 'completed').reduce((s, o) => s + o.total, 0),
  }
  const serviceStats = {
    total: services.length,
    pending: services.filter(s => s.status === 'pending').length,
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Sipariş & Servis Takibi</h2>
          <p className="text-sm text-gray-500 mt-0.5">Gelen sipariş ve servis taleplerini yönetin</p>
        </div>
        <button
          onClick={fetchData}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl transition-colors"
        >
          Yenile
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="bg-white border border-gray-100 rounded-2xl p-4">
          <p className="text-xs text-gray-500">Toplam Sipariş</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{orderStats.total}</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-4">
          <p className="text-xs text-gray-500">Bekleyen Sipariş</p>
          <p className="text-2xl font-bold text-amber-600 mt-1">{orderStats.pending}</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-4">
          <p className="text-xs text-gray-500">Toplam Servis</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{serviceStats.total}</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-4">
          <p className="text-xs text-gray-500">Bekleyen Servis</p>
          <p className="text-2xl font-bold text-amber-600 mt-1">{serviceStats.pending}</p>
        </div>
      </div>

      {/* Sub-tabs */}
      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <div className="flex items-center gap-1 bg-white border border-gray-100 rounded-xl p-1">
          <button
            onClick={() => { setTab('orders'); setStatusFilter('all') }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              tab === 'orders' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <ShoppingBag className="w-4 h-4" /> Siparişler ({orders.length})
          </button>
          <button
            onClick={() => { setTab('services'); setStatusFilter('all') }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              tab === 'services' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Wrench className="w-4 h-4" /> Servis Talepleri ({services.length})
          </button>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              statusFilter === 'all' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            Tümü
          </button>
          {STATUS_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => setStatusFilter(opt.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                statusFilter === opt.value
                  ? `bg-${opt.color}-600 text-white`
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-2xl p-5 animate-pulse">
              <div className="h-4 bg-gray-100 rounded w-1/3 mb-2" />
              <div className="h-3 bg-gray-100 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 bg-white border border-gray-100 rounded-2xl">
          {tab === 'orders' ? (
            <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          ) : (
            <Wrench className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          )}
          <p className="text-gray-500">
            {statusFilter === 'all'
              ? `Henüz ${tab === 'orders' ? 'sipariş' : 'servis talebi'} yok`
              : 'Bu filtreye uyan kayıt bulunmadı'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(item =>
            tab === 'orders' ? (
              <OrderCard key={item.id} order={item} onStatusChange={updateOrderStatus} onDelete={deleteOrder} />
            ) : (
              <ServiceCard key={item.id} service={item} onStatusChange={updateServiceStatus} onDelete={deleteService} />
            )
          )}
        </div>
      )}
    </div>
  )
}

export default TrackingManager
