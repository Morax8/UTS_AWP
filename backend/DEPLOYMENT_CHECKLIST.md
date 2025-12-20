# Backend Deployment Checklist untuk Render

## ✅ **Yang Sudah Baik:**

### 1. **Package.json Configuration**
- ✅ Script `start` sudah benar: `"start": "node index.js"`
- ✅ Dependencies lengkap dan up-to-date
- ✅ Menggunakan `dotenv` untuk environment variables

### 2. **Server Configuration**
- ✅ Port menggunakan `process.env.PORT || 5000` (Render akan set PORT otomatis)
- ✅ Database connection menggunakan environment variables
- ✅ JWT authentication sudah implementasi

### 3. **Database Connection**
- ✅ Menggunakan connection pool (baik untuk production)
- ✅ Environment variables untuk database config
- ✅ Error handling untuk database connection

## ⚠️ **Yang Perlu Diperbaiki:**

### 1. **CORS Configuration (PENTING!)**
**Masalah:** CORS saat ini menggunakan `app.use(cors())` tanpa konfigurasi origin.

**Solusi:** Update di `backend/index.js`:
```javascript
// Ganti ini:
app.use(cors());

// Dengan ini:
app.use(cors({
  origin: [
    'https://your-frontend-app.onrender.com',  // URL frontend di Render
    'http://localhost:3000',                   // Untuk development
    'http://localhost:5173'                   // Vite dev server
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

### 2. **Environment Variables untuk Production**
Buat file `.env` di backend dengan:
```env
# Database (sesuaikan dengan database production Anda)
DB_HOST=your_production_db_host
DB_USER=your_production_db_user
DB_PASSWORD=your_production_db_password
DB_NAME=your_production_db_name

# JWT Secret (gunakan string yang kuat)
JWT_SECRET=your_super_strong_jwt_secret_here

# Server
NODE_ENV=production
PORT=10000
```

### 3. **Error Handling**
Pastikan semua controller memiliki try-catch yang proper.

## 🚀 **Langkah Deployment di Render:**

### 1. **Backend (Web Service)**
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Environment Variables:**
  - `DB_HOST` = your_database_host
  - `DB_USER` = your_database_user
  - `DB_PASSWORD` = your_database_password
  - `DB_NAME` = your_database_name
  - `JWT_SECRET` = your_jwt_secret
  - `NODE_ENV` = production

### 2. **Database**
- Gunakan database eksternal (MySQL/PostgreSQL)
- **Rekomendasi:** PlanetScale, Railway, atau Render Database

## 🔒 **Keamanan Checklist:**

- ✅ Password hashing dengan bcryptjs
- ✅ JWT authentication
- ✅ Input validation
- ⚠️ CORS perlu dikonfigurasi
- ⚠️ Environment variables perlu di-set

## 📝 **Testing Checklist:**

1. **Database Connection:** Test endpoint `/api/test-db`
2. **Authentication:** Test login/register
3. **CORS:** Test dari frontend
4. **API Endpoints:** Test semua CRUD operations

## 🚨 **PENTING:**
1. **Update CORS sebelum deploy!**
2. **Set semua environment variables di Render!**
3. **Gunakan database eksternal, bukan localhost!**
