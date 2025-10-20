import { Routes, Route, Outlet } from "react-router-dom";
import HomePage from "./pages/home";
import AboutPage from "./pages/about";
import NotFoundPage from "./pages/notFound";
import Contact from "./pages/contactUs";
import Menu from "./pages/menu";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Dashboard from "./pages/admin/dashboard";
import Laporan from "./pages/admin/laporan";
import MasterMenu from "./pages/admin/masterMenu";
import Faq from "./pages/faq";
import Track from "./pages/track";
import MasterPesanan from "./pages/admin/masterPesanan";
import Cart from "./pages/cart";
import Checkout from "./pages/checkout";
import ProfilePage from "./pages/profile";
import AddMenuPage from "./pages/admin/tambahMenu";
import EditMenu from "./pages/admin/editMenu";

import Navbar from "./components/navbar";
import Footer from "./components/footer";
import ScrollToTop from "./components/scrollToTop";
import ProtectedRoute from "./components/protectedRoutes";

import { CartProvider } from "./context/cartContext";

// Komponen Layout untuk halaman publik yang memiliki Navbar dan Footer
const PublicLayout = () => (
  <>
    <Navbar />
    <main>
      {/* Memberi padding atas seukuran tinggi navbar */}
      <Outlet /> {/* Ini akan merender komponen halaman (misal: HomePage) */}
    </main>
    <Footer />
  </>
);

function App() {
  return (
    <CartProvider>
      <ScrollToTop />
      <Routes>
        {/* Grup Rute Publik menggunakan PublicLayout */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/track" element={<Track />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        {/* Rute yang tidak menggunakan layout (misal: login, register, admin) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Grup Rute Admin yang dilindungi */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/laporan"
          element={
            <ProtectedRoute>
              <Laporan />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/master-menu"
          element={
            <ProtectedRoute>
              <MasterMenu />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/master-menu/add"
          element={
            <ProtectedRoute>
              <AddMenuPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/master-menu/edit/:id"
          element={
            <ProtectedRoute>
              <EditMenu />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/master-pesanan"
          element={
            <ProtectedRoute>
              <MasterPesanan />
            </ProtectedRoute>
          }
        />

        {/* Rute Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </CartProvider>
  );
}

export default App;
