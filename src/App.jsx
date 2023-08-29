import { BrowserRouter, Route, Routes } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from "./pages/AdminDashboard/Dashboard";
import Beranda from "./pages/LandingPage/beranda";
import Keranjang from "./pages/LandingPage/keranjang";
import Product from "./pages/AdminDashboard/Product";
import TambahProduct from "./pages/AdminDashboard/TambahProduct";
import EditProduct from "./pages/AdminDashboard/EditProduct";
import Riwayat from "./pages/AdminDashboard/Riwayat";
import DaftarPelanggan from "./pages/AdminDashboard/DaftarPelanggan";
import RiwayatPemesanan from "./pages/LandingPage/RiwayatPemesanan";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Pembayaran from "./pages/LandingPage/Pembayaran";
import Authmiddleware from "./middleware/Authmiddleware";
import CheckRole from "./middleware/CheckRole";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Authmiddleware><CheckRole><Dashboard /></CheckRole></Authmiddleware>} />
          <Route path="/dashboard/produk" element={<Authmiddleware><CheckRole><Product /></CheckRole></Authmiddleware>} />
          <Route path="/dashboard/produk/tambah" element={<Authmiddleware><CheckRole><TambahProduct /></CheckRole></Authmiddleware>} />
          <Route path="/dashboard/produk/edit/:id" element={<Authmiddleware><CheckRole><EditProduct /></CheckRole></Authmiddleware>} />
          <Route path="/dashboard/riwayat" element={<Authmiddleware><CheckRole><Riwayat /></CheckRole></Authmiddleware>} />
          <Route path="/dashboard/pelanggan" element={<Authmiddleware><CheckRole><DaftarPelanggan /></CheckRole></Authmiddleware>} />
          <Route path="/" element={<Beranda />} />
          <Route path="/keranjang" element={<Keranjang />} />
          <Route path="/riwayat" element={<Authmiddleware><RiwayatPemesanan /></Authmiddleware>} />
          <Route path="/pembayaran" element={<Authmiddleware><Pembayaran /></Authmiddleware>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
