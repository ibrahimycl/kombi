import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingCart, Menu, X, Flame, Wrench } from 'lucide-react'
import { useCart } from '../context/CartContext'

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { totalItems } = useCart()
  const location = useLocation()

  const links = [
    { to: '/', label: 'Ana Sayfa' },
    { to: '/urunler', label: 'Ürünler' },
    { to: '/hakkimizda', label: 'Hakkımızda' },
    { to: '/servis', label: 'Servis Talebi' },
    { to: '/iletisim', label: 'İletişim' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/20 group-hover:shadow-primary-500/40 transition-shadow flex-shrink-0">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <div className="leading-tight">
              <div className="text-lg sm:text-xl font-extrabold text-gray-900 tracking-tight">
                LIDYA <span className="text-primary-600">İKLİM</span>
              </div>
              <div className="text-[10px] sm:text-xs text-gray-500 font-medium -mt-0.5">
                Kombi & Klima Yedek Parça
              </div>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            {links.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive(link.to)
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Cart + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              to="/sepet"
              className="relative p-2.5 rounded-xl bg-gray-50 hover:bg-primary-50 text-gray-600 hover:text-primary-600 transition-all"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-50"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white">
          <div className="px-4 py-3 space-y-1">
            {links.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive(link.to)
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
