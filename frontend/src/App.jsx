// src/App.jsx
import { Routes, Route } from "react-router-dom";
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

import Navbar from "./components/navbar";
import Footer from "./components/footer";
import ScrollToTop from "./components/scrollToTop";

function App() {
  return (
    <div>
      {/* Navbar atau header bisa ditaruh di sini */}
      <ScrollToTop />
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/laporan" element={<Laporan />} />
        <Route path="/admin/master-menu" element={<MasterMenu />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/track" element={<Track />} />
        <Route path="/admin/master-pesanan" element={<MasterPesanan />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />

        <Route path="/not-found" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
