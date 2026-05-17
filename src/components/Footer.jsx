import { Flame, Phone, Mail, MapPin, Clock, Globe } from 'lucide-react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center">
                <Flame className="w-5 h-5 text-white" />
              </div>
              <div className="leading-tight">
                <div className="text-xl font-extrabold text-white tracking-tight">
                  LIDYA <span className="text-primary-400">İKLİM</span>
                </div>
                <div className="text-xs text-gray-400 font-medium">
                  Kombi & Klima Yedek Parça
                </div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              Lidya İklimlendirme, kombi ve klima yedek parça sektöründe kaliteli
              ürünleri uygun fiyatlarla müşterilerine ulaştıran güvenilir bir firmadır.
              Teknik servis ekipmanları, kombi parçaları ve iklimlendirme çözümleriyle
              profesyonel hizmet sunmaktayız.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Hızlı Bağlantılar</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-primary-400 transition-colors">Ana Sayfa</Link></li>
              <li><Link to="/urunler" className="hover:text-primary-400 transition-colors">Ürünler</Link></li>
              <li><Link to="/hakkimizda" className="hover:text-primary-400 transition-colors">Hakkımızda</Link></li>
              <li><Link to="/servis" className="hover:text-primary-400 transition-colors">Servis Talebi</Link></li>
              <li><Link to="/iletisim" className="hover:text-primary-400 transition-colors">İletişim</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">İletişim</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">Sultaniye Mahallesi 128 Sokak No:11/A Esenyurt / İstanbul</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary-400 flex-shrink-0" />
                <a href="tel:+905453347203" className="hover:text-primary-400 transition-colors">0545 334 72 03</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary-400 flex-shrink-0" />
                <a href="tel:+905421835639" className="hover:text-primary-400 transition-colors">0542 183 56 39</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary-400 flex-shrink-0" />
                <a href="mailto:info@lidyaiklimlendirme.com" className="hover:text-primary-400 transition-colors break-all">info@lidyaiklimlendirme.com</a>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">Pzt - Cmt: 08:30 - 19:00<br/>Pazar: Kapalı</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-500">
          <p>© 2026 Lidya İklimlendirme. Tüm hakları saklıdır.</p>
          <p className="mt-1 text-xs">Kombi & Klima Yedek Parça – Teknik Servis – İklimlendirme Sistemleri</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
