# Deployment Guide untuk Render

## Persiapan Frontend

### 1. Environment Variables
Buat file `.env` di folder `frontend` dengan konfigurasi berikut:

```env
# Untuk production (Render)
VITE_API_URL=https://your-backend-app.onrender.com
```

**Catatan**: Ganti `your-backend-app` dengan nama aplikasi backend Anda di Render.

### 2. Build Commands
Pastikan `package.json` memiliki script build yang benar:

```json
{
  "scripts": {
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

## Deployment di Render

### Frontend (Static Site)

1. **Connect Repository**: Hubungkan repository GitHub Anda ke Render
2. **Service Type**: Pilih "Static Site"
3. **Build Command**: `npm run build`
4. **Publish Directory**: `dist`
5. **Environment Variables**: 
   - `VITE_API_URL`: `https://your-backend-app.onrender.com`
6. **Important**: File `_redirects` sudah dibuat untuk handle React Router

### Backend (Web Service)

1. **Service Type**: Pilih "Web Service"
2. **Build Command**: `npm install`
3. **Start Command**: `node index.js`
4. **Environment Variables** (jika diperlukan):
   - `NODE_ENV`: `production`
   - `PORT`: Render akan otomatis set
   - Database credentials (jika menggunakan database eksternal)

## Konfigurasi CORS

Pastikan backend Anda mengizinkan domain frontend. Di file backend, tambahkan:

```javascript
const cors = require('cors');

app.use(cors({
  origin: ['https://your-frontend-app.onrender.com', 'http://localhost:3000'],
  credentials: true
}));
```

## Troubleshooting

### 1. CORS Error
- Pastikan backend mengizinkan domain frontend
- Check environment variable `VITE_API_URL`

### 2. 404 Error pada API
- Pastikan backend sudah deployed dan running
- Check URL di environment variable

### 3. Build Error
- Pastikan semua dependencies terinstall
- Check Node.js version compatibility

## Testing

Setelah deployment:

1. **Frontend**: Akses URL frontend Anda
2. **Backend**: Test API endpoint di `https://your-backend-app.onrender.com/api/`
3. **Integration**: Test login/register untuk memastikan frontend-backend communication

## Environment Variables Summary

### Frontend (.env)
```env
VITE_API_URL=https://your-backend-app.onrender.com
```

### Backend (Render Environment Variables)
```env
NODE_ENV=production
PORT=10000
# Database credentials jika menggunakan database eksternal
```
