import { useState } from 'react'
import { Wrench, CheckCircle, Phone, Clock, MapPin, MessageCircle } from 'lucide-react'

function ServiceRequest() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    deviceType: '',
    brand: '',
    problem: '',
    preferredDate: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      // WhatsApp mesajı oluştur
      const deviceLabel = form.deviceType === 'kombi' ? 'Kombi' : form.deviceType === 'klima' ? 'Klima' : 'Diğer'
      const message =
        `*🔧 YENİ SERVİS TALEBİ*\n\n` +
        `👤 *Ad Soyad:* ${form.name}\n` +
        `📞 *Telefon:* ${form.phone}\n` +
        (form.email ? `📧 *E-posta:* ${form.email}\n` : '') +
        `📍 *Adres:* ${form.address}\n\n` +
        `🛠️ *Cihaz Türü:* ${deviceLabel}\n` +
        (form.brand ? `🏷️ *Marka:* ${form.brand}\n` : '') +
        (form.preferredDate ? `📅 *Tercih Edilen Tarih:* ${form.preferredDate}\n` : '') +
        `\n📝 *Arıza Açıklaması:*\n${form.problem}`

      const whatsappUrl = `https://wa.me/905316466294?text=${encodeURIComponent(message)}`
      window.open(whatsappUrl, '_blank')

      setSubmitted(true)
    } catch (err) {
      alert('Hata oluştu, lütfen tekrar deneyin.')
    }
    setSubmitting(false)
  }

  if (submitted) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Talebiniz Alındı!</h2>
        <p className="text-gray-500 max-w-md mx-auto mb-8">
          Servis talebiniz başarıyla oluşturuldu. En kısa sürede sizinle iletişime geçeceğiz.
        </p>
        <button
          onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', email: '', address: '', deviceType: '', brand: '', problem: '', preferredDate: '' }) }}
          className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl transition-colors"
        >
          Yeni Talep Oluştur
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Info */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-accent-100 rounded-xl flex items-center justify-center">
              <Wrench className="w-5 h-5 text-accent-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Servis Talebi</h1>
              <p className="text-sm text-gray-500">Teknik destek formu</p>
            </div>
          </div>

          <p className="text-gray-600 mb-8 leading-relaxed">
            Kombi veya klimanız arızalandıysa, aşağıdaki formu doldurarak servis talebi oluşturabilirsiniz.
            Uzman ekibimiz en kısa sürede sizinle iletişime geçecektir.
          </p>

          <div className="space-y-4">
            {[
              { icon: Phone, title: 'Telefon', value: '0545 186 7203' },
              { icon: Clock, title: 'Çalışma Saatleri', value: 'Pazartesi - Pazar, 08:00 - 22:00' },
              { icon: MapPin, title: 'Hizmet Bölgesi', value: 'İstanbul ve çevresi' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100">
                <item.icon className="w-5 h-5 text-primary-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ad Soyad *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10 text-sm"
                  placeholder="Adınız ve soyadınız"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Telefon *</label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10 text-sm"
                  placeholder="05XX XXX XX XX"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">E-posta</label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10 text-sm"
                placeholder="ornek@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Adres *</label>
              <textarea
                required
                rows={2}
                value={form.address}
                onChange={e => setForm({ ...form, address: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10 text-sm resize-none"
                placeholder="Servis yapılacak adres"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cihaz Türü *</label>
                <select
                  required
                  value={form.deviceType}
                  onChange={e => setForm({ ...form, deviceType: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10 text-sm"
                >
                  <option value="">Seçin...</option>
                  <option value="kombi">Kombi</option>
                  <option value="klima">Klima</option>
                  <option value="other">Diğer</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Marka</label>
                <input
                  type="text"
                  value={form.brand}
                  onChange={e => setForm({ ...form, brand: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10 text-sm"
                  placeholder="Cihaz markası"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tercih Edilen Tarih</label>
              <input
                type="date"
                value={form.preferredDate}
                onChange={e => setForm({ ...form, preferredDate: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Arıza Açıklaması *</label>
              <textarea
                required
                rows={4}
                value={form.problem}
                onChange={e => setForm({ ...form, problem: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10 text-sm resize-none"
                placeholder="Cihazınızda yaşadığınız sorunu detaylı olarak açıklayın..."
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-green-500/20"
            >
              <MessageCircle className="w-5 h-5" />
              {submitting ? 'Gönderiliyor...' : 'WhatsApp ile Servis Talebi Gönder'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ServiceRequest
