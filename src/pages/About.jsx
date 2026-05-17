import { Link } from 'react-router-dom'
import { Award, Target, Eye, CheckCircle2, Flame, Wind, Headphones, Zap, ArrowRight, Phone, Mail } from 'lucide-react'

function About() {
  const features = [
    'Kaliteli ve güvenilir ürünler',
    'Uygun fiyat garantisi',
    'Hızlı tedarik ve gönderim',
    'Teknik destek hizmeti',
    'Geniş ürün yelpazesi',
    'Müşteri memnuniyeti odaklı çalışma',
  ]

  const services = [
    { icon: Flame, title: 'Kombi Yedek Parça', desc: 'Tüm marka ve modellere uygun kombi yedek parça satış hizmeti sunuyoruz.' },
    { icon: Wind, title: 'Klima Yedek Parça', desc: 'Klima bakım ve onarım süreçlerinde ihtiyaç duyulan kaliteli yedek parçaları temin ediyoruz.' },
    { icon: Headphones, title: 'Teknik Destek', desc: 'Uzman ekibimiz ile ürünler hakkında teknik destek ve çözüm sunuyoruz.' },
    { icon: Zap, title: 'İklimlendirme Çözümleri', desc: 'Ev, iş yeri ve ticari alanlara yönelik profesyonel iklimlendirme çözümleri sağlıyoruz.' },
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
            <Award className="w-4 h-4" />
            Lidya İklimlendirme
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Hakkımızda</h1>
          <p className="text-lg text-primary-200 max-w-2xl">
            Kombi, klima ve iklimlendirme sektöründe güvenilir hizmet, kaliteli ürün ve profesyonel destek.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Lidya İklimlendirme Hakkında</h2>
          <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
            <p>
              <strong className="text-gray-900">Lidya İklimlendirme</strong> olarak kombi, klima ve iklimlendirme sektöründe
              yedek parça satışı ve teknik destek hizmetleri sunmaktayız. Müşteri memnuniyetini ön planda tutarak
              kaliteli ürünleri uygun fiyatlarla sizlere ulaştırıyoruz.
            </p>
            <p>
              Sektörde edindiğimiz deneyim sayesinde; kombi kartları, üç yollu vana motorları, sensörler,
              fan motorları, doldurma muslukları, tamir takımları, elektronik kartlar ve birçok yedek parçayı
              güvenilir şekilde tedarik ediyoruz.
            </p>
            <p>
              Profesyonel hizmet anlayışımız ile hem bireysel kullanıcıların hem de teknik servislerin
              ihtiyaçlarına hızlı çözümler sunuyoruz.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center mb-5">
                <Eye className="w-7 h-7 text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Vizyonumuz</h3>
              <p className="text-gray-600 leading-relaxed">
                İklimlendirme sektöründe güvenilir, yenilikçi ve tercih edilen lider firmalardan biri olmak;
                kaliteli hizmet anlayışımızla müşteri memnuniyetini en üst seviyeye taşımaktır.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <div className="w-14 h-14 bg-accent-50 rounded-2xl flex items-center justify-center mb-5">
                <Target className="w-7 h-7 text-accent-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Misyonumuz</h3>
              <p className="text-gray-600 leading-relaxed">
                Müşterilerimize kaliteli ürünleri uygun fiyatlarla sunarak hızlı, güvenilir ve profesyonel
                çözümler üretmek; iklimlendirme sektöründe sürdürülebilir hizmet anlayışıyla faaliyet göstermektir.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Neden Lidya İklimlendirme?</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Sektördeki tecrübemiz ve müşteri odaklı yaklaşımımızla farkımızı ortaya koyuyoruz
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((item, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-2xl p-5 flex items-start gap-3 hover:border-primary-200 hover:shadow-md transition-all">
              <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-5 h-5 text-primary-600" />
              </div>
              <span className="text-gray-800 font-medium pt-1.5">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Hizmetlerimiz</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              İklimlendirme alanında sunduğumuz profesyonel hizmetler
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-xl hover:shadow-primary-500/5 hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center mb-4">
                  <s.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-3xl p-8 md:p-12">
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Bizimle Çalışmaya Hazır mısınız?
            </h2>
            <p className="text-primary-200 mb-6">
              Yedek parça ihtiyaçlarınız ve teknik destek için bize ulaşın. Uzman ekibimiz size en kısa sürede dönüş yapacaktır.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/iletisim"
                className="flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-primary-700 font-semibold rounded-xl hover:bg-primary-50 transition-colors shadow-lg"
              >
                <Mail className="w-5 h-5" /> İletişime Geç
              </Link>
              <a
                href="tel:+905453347203"
                className="flex items-center justify-center gap-2 px-6 py-3.5 bg-primary-900/30 hover:bg-primary-900/50 text-white font-semibold rounded-xl transition-colors border border-white/20"
              >
                <Phone className="w-5 h-5" /> 0545 334 72 03
              </a>
              <Link
                to="/urunler"
                className="flex items-center justify-center gap-2 px-6 py-3.5 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
              >
                Ürünleri İncele <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
