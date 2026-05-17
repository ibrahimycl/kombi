import { Phone, Mail, MapPin, Clock, Globe, MessageCircle, Send } from 'lucide-react'

function Contact() {
  const contactCards = [
    {
      icon: MapPin,
      title: 'Adres',
      lines: ['Sultaniye Mahallesi', '128 Sokak No:11/A', 'Esenyurt / İstanbul'],
      action: {
        href: 'https://www.google.com/maps/search/?api=1&query=Sultaniye+Mahallesi+128+Sokak+No:11/A+Esenyurt+%C4%B0stanbul',
        label: 'Haritada Aç',
      },
    },
    {
      icon: Phone,
      title: 'Telefon',
      lines: ['0545 334 72 03', '0542 183 56 39'],
      action: { href: 'tel:+905453347203', label: 'Hemen Ara' },
    },
    {
      icon: Mail,
      title: 'E-Posta',
      lines: ['info@lidyaiklimlendirme.com'],
      action: { href: 'mailto:info@lidyaiklimlendirme.com', label: 'Mail Gönder' },
    },
    {
      icon: Clock,
      title: 'Çalışma Saatleri',
      lines: ['Pazartesi - Cumartesi', '08:30 - 19:00', 'Pazar: Kapalı'],
    },
  ]

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent-500 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-primary-200 text-sm font-medium mb-4">
            <MessageCircle className="w-4 h-4" />
            Bize Ulaşın
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">İletişim</h1>
          <p className="text-lg text-primary-200 max-w-2xl">
            Sorularınız, ürün ihtiyaçlarınız veya teknik destek için bize ulaşın. En kısa sürede size dönüş yapacağız.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {contactCards.map((card, i) => {
            const Icon = card.icon
            return (
              <div key={i} className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-xl hover:shadow-primary-500/5 transition-all flex flex-col">
                <div className="w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{card.title}</h3>
                <div className="space-y-1 mb-4 flex-1">
                  {card.lines.map((line, j) => (
                    <p key={j} className="text-sm text-gray-600">{line}</p>
                  ))}
                </div>
                {card.action && (
                  <a
                    href={card.action.href}
                    target={card.action.href.startsWith('http') ? '_blank' : undefined}
                    rel={card.action.href.startsWith('http') ? 'noreferrer' : undefined}
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium inline-flex items-center gap-1"
                  >
                    {card.action.label} →
                  </a>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* Map + Quick Actions */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Map */}
            <div className="lg:col-span-2 bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-1">Konum</h3>
                <p className="text-sm text-gray-500">Sultaniye Mahallesi 128 Sokak No:11/A Esenyurt / İstanbul</p>
              </div>
              <div className="aspect-video w-full">
                <iframe
                  title="Lidya İklimlendirme Konum"
                  src="https://www.google.com/maps?q=Sultaniye+Mahallesi+128+Sokak+No+11+Esenyurt+%C4%B0stanbul&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-4">
              <a
                href="tel:+905453347203"
                className="block bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg hover:border-primary-200 transition-all group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-semibold text-gray-900">Hemen Ara</span>
                </div>
                <p className="text-2xl font-bold text-primary-600">0545 334 72 03</p>
                <p className="text-xs text-gray-500 mt-1">Pzt - Cmt | 08:30 - 19:00</p>
              </a>

              <a
                href="https://wa.me/905316466294"
                target="_blank"
                rel="noreferrer"
                className="block bg-green-600 hover:bg-green-700 rounded-2xl p-6 transition-all group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-semibold text-white">WhatsApp</span>
                </div>
                <p className="text-white/90 text-sm">Anlık iletişim için WhatsApp üzerinden mesaj gönderebilirsiniz.</p>
              </a>

              <a
                href="mailto:info@lidyaiklimlendirme.com"
                className="block bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg hover:border-primary-200 transition-all group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-accent-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Send className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-semibold text-gray-900">E-Posta Gönder</span>
                </div>
                <p className="text-sm text-accent-700 font-medium break-all">info@lidyaiklimlendirme.com</p>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
