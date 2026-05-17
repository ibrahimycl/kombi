import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, ArrowRight, Flame, Wind, Thermometer, Droplets, Filter, Wrench, Truck, ShieldCheck, Headphones, CheckCircle2, Award, Zap, Users, Phone } from 'lucide-react'
import ProductCard from '../components/ProductCard'

const iconMap = {
  Flame, Wind, Thermometer, Droplets, Filter, Wrench
}

function Home() {
  const [categories, setCategories] = useState([])
  const [featured, setFeatured] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('/api/categories').then(r => r.json()).then(setCategories).catch(() => {})
    fetch('/api/products?featured=true').then(r => r.json()).then(setFeatured).catch(() => {})
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (search.trim()) {
      window.location.href = `/urunler?search=${encodeURIComponent(search)}`
    }
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-accent-500 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-primary-200 text-sm font-medium mb-6">
              <ShieldCheck className="w-4 h-4" />
              Lidya İklimlendirme – Esenyurt / İstanbul
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              Kombi & Klima <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-300 to-accent-500">
                Yedek Parça
              </span>
              <br/>
              <span className="text-2xl sm:text-3xl md:text-4xl text-primary-200 font-bold">Teknik Servis & İklimlendirme Çözümleri</span>
            </h1>
            <p className="text-lg text-primary-200 mb-8 max-w-xl">
              Kombi ve klima yedek parça satışında kaliteli ürün, uygun fiyat ve
              hızlı hizmet anlayışıyla yanınızdayız. Orijinal ve uyumlu yedek parça
              seçenekleri, uzman destek ekibi ve hızlı tedarik.
            </p>

            {/* Search */}
            <form onSubmit={handleSearch} className="flex items-center bg-white rounded-2xl p-1.5 max-w-lg shadow-2xl shadow-black/20">
              <div className="flex items-center flex-1 px-4 gap-3">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Ürün ara... (örn: eşanjör, fan motoru)"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full py-2.5 text-gray-700 placeholder-gray-400 outline-none text-sm"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl transition-colors text-sm"
              >
                Ara
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Truck, title: 'Hızlı Tedarik', desc: 'Siparişlerinizi en kısa sürede ulaştırıyoruz' },
              { icon: ShieldCheck, title: 'Kaliteli Ürün', desc: 'Orijinal ve uyumlu yedek parçalar' },
              { icon: Headphones, title: 'Teknik Destek', desc: 'Uzman ekibimizden profesyonel destek' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4">
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Intro */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-50 rounded-full text-primary-700 text-xs font-medium mb-4">
              <Award className="w-3.5 h-3.5" />
              Güvenilir İş Ortağınız
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Lidya İklimlendirme
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Lidya İklimlendirme olarak kombi ve klima yedek parça satışında kaliteli ürün,
              uygun fiyat ve hızlı hizmet anlayışıyla müşterilerimize hizmet vermekteyiz.
              Kombi, klima ve iklimlendirme sistemlerine ait yedek parçalar, teknik servis
              ekipmanları ve profesyonel çözümler ile sektörde güvenilir hizmet sunuyoruz.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Orijinal ve uyumlu yedek parça seçenekleri, uzman destek ekibi ve hızlı tedarik
              avantajıyla ihtiyacınız olan tüm ürünlere kolayca ulaşabilirsiniz.
            </p>
            <Link
              to="/hakkimizda"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl transition-colors"
            >
              Hakkımızda <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-3xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Neden Lidya İklimlendirme?</h3>
            <ul className="space-y-3">
              {[
                'Kaliteli ve güvenilir ürünler',
                'Uygun fiyat garantisi',
                'Hızlı tedarik ve gönderim',
                'Teknik destek hizmeti',
                'Geniş ürün yelpazesi',
                'Müşteri memnuniyeti odaklı çalışma',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Kategoriler</h2>
            <p className="text-gray-500 mt-1">İhtiyacınıza göre kategori seçin</p>
          </div>
          <Link to="/urunler" className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center gap-1">
            Tümünü Gör <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map(cat => {
            const Icon = iconMap[cat.icon] || Wrench
            return (
              <Link
                key={cat.id}
                to={`/urunler?category=${cat.id}`}
                className="group bg-white rounded-2xl border border-gray-100 hover:border-primary-200 p-6 text-center hover:shadow-lg hover:shadow-primary-500/5 transition-all"
              >
                <div className="w-14 h-14 bg-primary-50 group-hover:bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-3 transition-colors">
                  <Icon className="w-7 h-7 text-primary-600" />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 group-hover:text-primary-700 transition-colors">
                  {cat.name}
                </h3>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Öne Çıkan Ürünler</h2>
              <p className="text-gray-500 mt-1">En çok tercih edilen yedek parçalar</p>
            </div>
            <Link to="/urunler" className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center gap-1">
              Tümünü Gör <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Servis Desteği</h2>
            <p className="text-primary-200 max-w-md">
              Kombi veya klimanız arızalandı mı? Hemen servis talebi oluşturun, en kısa sürede size ulaşalım.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0 w-full md:w-auto">
            <Link
              to="/servis"
              className="flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-primary-700 font-semibold rounded-xl hover:bg-primary-50 transition-colors shadow-lg"
            >
              <Wrench className="w-5 h-5" />
              Servis Talebi Oluştur
            </Link>
            <a
              href="tel:+905453347203"
              className="flex items-center justify-center gap-2 px-6 py-3.5 bg-primary-900/30 hover:bg-primary-900/50 text-white font-semibold rounded-xl transition-colors border border-white/20"
            >
              <Phone className="w-5 h-5" />
              0545 334 72 03
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
