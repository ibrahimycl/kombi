import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Admin from './pages/Admin'
import ServiceRequest from './pages/ServiceRequest'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import { useAuth } from './context/AuthContext'

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/giris" replace />
  }

  return children
}

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/urunler" element={<Products />} />
          <Route path="/urunler/:id" element={<ProductDetail />} />
          <Route path="/sepet" element={<Cart />} />
          <Route path="/giris" element={<Login />} />
          <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
          <Route path="/servis" element={<ServiceRequest />} />
          <Route path="/hakkimizda" element={<About />} />
          <Route path="/iletisim" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
