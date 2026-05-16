const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid')

const app = express()
const PORT = 5000
const DB_PATH = path.join(__dirname, 'data', 'db.json')

app.use(cors())
app.use(express.json())

// Helper: read/write DB
function readDB() {
  const raw = fs.readFileSync(DB_PATH, 'utf-8')
  return JSON.parse(raw)
}

function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8')
}

// Helper: enrich product with category name
function enrichProduct(product, categories) {
  const cat = categories.find(c => c.id === product.category)
  return { ...product, categoryName: cat ? cat.name : product.category }
}

// ==================== AUTH ====================

const crypto = require('crypto')

function generateToken() {
  return crypto.randomBytes(32).toString('hex')
}

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ error: 'Kullanıcı adı ve şifre gerekli' })
  }

  const db = readDB()
  const user = db.users.find(u => u.username === username)

  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Kullanıcı adı veya şifre hatalı' })
  }

  const token = generateToken()
  res.json({
    user: { id: user.id, username: user.username, name: user.name, role: user.role },
    token
  })
})

// ==================== CATEGORIES ====================

app.get('/api/categories', (req, res) => {
  const db = readDB()
  res.json(db.categories)
})

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/ş/g, 's').replace(/ç/g, 'c').replace(/ğ/g, 'g')
    .replace(/ü/g, 'u').replace(/ö/g, 'o').replace(/ı/g, 'i')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

app.post('/api/categories', (req, res) => {
  const db = readDB()
  const { name, icon, description, id } = req.body
  if (!name) return res.status(400).json({ error: 'Kategori adı zorunludur' })

  let catId = id || slugify(name)
  // Ensure unique
  let counter = 1
  const baseId = catId
  while (db.categories.find(c => c.id === catId)) {
    catId = `${baseId}-${counter++}`
  }

  const newCategory = {
    id: catId,
    name,
    icon: icon || 'Wrench',
    description: description || '',
  }
  db.categories.push(newCategory)
  writeDB(db)
  res.status(201).json(newCategory)
})

app.put('/api/categories/:id', (req, res) => {
  const db = readDB()
  const index = db.categories.findIndex(c => c.id === req.params.id)
  if (index === -1) return res.status(404).json({ error: 'Kategori bulunamadı' })

  db.categories[index] = {
    ...db.categories[index],
    name: req.body.name ?? db.categories[index].name,
    icon: req.body.icon ?? db.categories[index].icon,
    description: req.body.description ?? db.categories[index].description,
  }
  writeDB(db)
  res.json(db.categories[index])
})

app.delete('/api/categories/:id', (req, res) => {
  const db = readDB()
  const index = db.categories.findIndex(c => c.id === req.params.id)
  if (index === -1) return res.status(404).json({ error: 'Kategori bulunamadı' })

  const inUse = db.products.some(p => p.category === req.params.id)
  if (inUse) {
    return res.status(400).json({
      error: 'Bu kategoride ürünler var. Önce ürünleri başka kategoriye taşıyın veya silin.'
    })
  }

  db.categories.splice(index, 1)
  writeDB(db)
  res.json({ success: true })
})

// ==================== PRODUCTS ====================

app.get('/api/products', (req, res) => {
  const db = readDB()
  let products = db.products.map(p => enrichProduct(p, db.categories))
  const { search, category, featured, sort } = req.query

  if (search) {
    const q = search.toLowerCase()
    products = products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    )
  }

  if (category) {
    products = products.filter(p => p.category === category)
  }

  if (featured === 'true') {
    products = products.filter(p => p.featured)
  }

  if (sort === 'price_asc') {
    products.sort((a, b) => a.price - b.price)
  } else if (sort === 'price_desc') {
    products.sort((a, b) => b.price - a.price)
  } else {
    products.sort((a, b) => a.name.localeCompare(b.name, 'tr'))
  }

  res.json(products)
})

app.get('/api/products/:id', (req, res) => {
  const db = readDB()
  const product = db.products.find(p => p.id === req.params.id)
  if (!product) return res.status(404).json({ error: 'Ürün bulunamadı' })
  res.json(enrichProduct(product, db.categories))
})

app.post('/api/products', (req, res) => {
  const db = readDB()
  const newProduct = {
    id: uuidv4(),
    name: req.body.name,
    description: req.body.description,
    price: Number(req.body.price),
    category: req.body.category,
    brand: req.body.brand,
    stock: Number(req.body.stock),
    image: req.body.image || '',
    featured: req.body.featured || false,
  }
  db.products.push(newProduct)
  writeDB(db)
  res.status(201).json(enrichProduct(newProduct, db.categories))
})

app.put('/api/products/:id', (req, res) => {
  const db = readDB()
  const index = db.products.findIndex(p => p.id === req.params.id)
  if (index === -1) return res.status(404).json({ error: 'Ürün bulunamadı' })

  db.products[index] = {
    ...db.products[index],
    name: req.body.name ?? db.products[index].name,
    description: req.body.description ?? db.products[index].description,
    price: req.body.price != null ? Number(req.body.price) : db.products[index].price,
    category: req.body.category ?? db.products[index].category,
    brand: req.body.brand ?? db.products[index].brand,
    stock: req.body.stock != null ? Number(req.body.stock) : db.products[index].stock,
    image: req.body.image ?? db.products[index].image,
    featured: req.body.featured ?? db.products[index].featured,
  }
  writeDB(db)
  res.json(enrichProduct(db.products[index], db.categories))
})

app.delete('/api/products/:id', (req, res) => {
  const db = readDB()
  const index = db.products.findIndex(p => p.id === req.params.id)
  if (index === -1) return res.status(404).json({ error: 'Ürün bulunamadı' })
  db.products.splice(index, 1)
  writeDB(db)
  res.json({ success: true })
})

// ==================== SERVICES ====================

app.get('/api/services', (req, res) => {
  const db = readDB()
  res.json(db.services)
})

app.post('/api/services', (req, res) => {
  const db = readDB()
  const newService = {
    id: uuidv4(),
    ...req.body,
    status: 'pending',
    createdAt: new Date().toISOString(),
  }
  db.services.push(newService)
  writeDB(db)
  res.status(201).json(newService)
})

app.patch('/api/services/:id', (req, res) => {
  const db = readDB()
  const index = db.services.findIndex(s => s.id === req.params.id)
  if (index === -1) return res.status(404).json({ error: 'Servis talebi bulunamadı' })
  db.services[index] = { ...db.services[index], ...req.body }
  writeDB(db)
  res.json(db.services[index])
})

app.delete('/api/services/:id', (req, res) => {
  const db = readDB()
  const index = db.services.findIndex(s => s.id === req.params.id)
  if (index === -1) return res.status(404).json({ error: 'Servis talebi bulunamadı' })
  db.services.splice(index, 1)
  writeDB(db)
  res.json({ success: true })
})

// ==================== ORDERS ====================

app.get('/api/orders', (req, res) => {
  const db = readDB()
  res.json(db.orders || [])
})

app.post('/api/orders', (req, res) => {
  const db = readDB()
  if (!db.orders) db.orders = []
  const newOrder = {
    id: uuidv4(),
    items: req.body.items || [],
    subtotal: req.body.subtotal || 0,
    shipping: req.body.shipping || 0,
    total: req.body.total || 0,
    customer: req.body.customer || null,
    status: 'pending',
    createdAt: new Date().toISOString(),
  }
  db.orders.push(newOrder)
  writeDB(db)
  res.status(201).json(newOrder)
})

app.patch('/api/orders/:id', (req, res) => {
  const db = readDB()
  if (!db.orders) db.orders = []
  const index = db.orders.findIndex(o => o.id === req.params.id)
  if (index === -1) return res.status(404).json({ error: 'Sipariş bulunamadı' })
  db.orders[index] = { ...db.orders[index], ...req.body }
  writeDB(db)
  res.json(db.orders[index])
})

app.delete('/api/orders/:id', (req, res) => {
  const db = readDB()
  if (!db.orders) db.orders = []
  const index = db.orders.findIndex(o => o.id === req.params.id)
  if (index === -1) return res.status(404).json({ error: 'Sipariş bulunamadı' })
  db.orders.splice(index, 1)
  writeDB(db)
  res.json({ success: true })
})

// ==================== START ====================

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
