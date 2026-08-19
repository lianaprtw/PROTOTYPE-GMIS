import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
  Bookmark,
  Share2,
  MoreHorizontal,
  ChevronRight,
  ChevronLeft,
  Calendar,
  MapPin,
  Tag,
  Layers,
  Sparkles,
  RefreshCw,
  FileText,
  UserCheck,
  CheckCircle,
  Clock,
  ArrowRight,
  Utensils,
  Image as ImageIcon,
  Video,
  Info,
  Sliders,
  Compass,
  BookOpen,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Asset Import (Pastikan file sesuai dengan folder assets kamu)
import baseGenep from "../assets/basa-genep.jpg";
import kunyitLengkuas from "../assets/kunyit-lengkuas.jpeg";
import lawarBali from "../assets/lawar-bali.jpg";
import bebekBetutu from "../assets/bebek-betutu.jpeg";
import megibung from "../assets/megibung.jpg";

// Perbaikan Default Icon Leaflet pada React
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

const IngredientDetail = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Ringkasan");
  const [activeDocTab, setActiveDocTab] = useState("Foto");

  // Koordinat Utama Bali
  const baliCenter = [-8.409518, 115.188919];

  // Data Lokasi Sebaran Penggunaan / Pusat Tradisi Base Genep
  const mapLocations = [
    { id: 1, name: "Gianyar", pos: [-8.5398, 115.3283], desc: "Pusat kuliner tradisional dan olahan bumbu khas." },
    { id: 2, name: "Karangasem", pos: [-8.4464, 115.6111], desc: "Khas dengan variasi bumbu racikan tradisional." },
    { id: 3, name: "Denpasar", pos: [-8.6705, 115.2126], desc: "Pusat distribusi rempah dan bahan kuliner Bali." },
  ];

  // Data Komposisi Utama
  const ingredientsList = [
    { name: "Kunyit", img: kunyitLengkuas },
    { name: "Lengkuas", img: kunyitLengkuas },
    { name: "Jahe", img: kunyitLengkuas },
    { name: "Kencur", img: kunyitLengkuas },
    { name: "Bawang Merah", img: kunyitLengkuas },
    { name: "Bawang Putih", img: kunyitLengkuas },
    { name: "Cabai Merah", img: kunyitLengkuas },
    { name: "Kemiri", img: kunyitLengkuas },
  ];

  // Data Dish / Olahan Terkait
  const relatedDishes = [
    {
      id: "ayam-betutu",
      title: "Ayam Betutu",
      desc: "Hidangan tradisional khas Bali.",
      img: bebekBetutu,
    },
    {
      id: "lawar-bali",
      title: "Lawar Bali",
      desc: "Campuran sayur, daging, dan kelapa berbumbu.",
      img: lawarBali,
    },
    {
      id: "bebek-betutu",
      title: "Bebek Betutu",
      desc: "Bebek khas Bali dengan bumbu base genep.",
      img: bebekBetutu,
    },
    {
      id: "sate-lilit",
      title: "Sate Lilit",
      desc: "Sate daging cincang dengan bumbu rempah.",
      img: megibung,
    },
    {
      id: "tipat-cantok",
      title: "Tipat Cantok",
      desc: "Salad sayur dengan bumbu kacang khas Bali.",
      img: lawarBali,
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-gray-800">
      {/* Navbar */}
      <Navbar />

      {/* ================= Breadcrumb ================= */}
      <div className="mx-auto max-w-[1240px] px-6 py-4">
        <nav className="flex items-center gap-2 text-xs text-gray-500">
          <Link to="/explore" className="hover:text-[#4B2417]">
            Explore
          </Link>
          <ChevronRight size={14} />
          <Link to="/explore?category=Ingredient" className="hover:text-[#4B2417]">
            Bahan
          </Link>
          <ChevronRight size={14} />
          <span className="font-semibold text-gray-800">Base Genep Bali</span>
        </nav>
      </div>

      {/* ================= Main Content Container ================= */}
      <main className="mx-auto max-w-[1240px] px-6 pb-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          
          {/* LEFT COLUMN: Main Detail (8 Cols) */}
          <div className="lg:col-span-8">
            
            {/* ---------- Header Card ---------- */}
            <div className="overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
                
                {/* Hero Image */}
                <div className="relative md:col-span-5">
                  <div className="h-[260px] w-full overflow-hidden rounded-xl">
                    <img
                      src={baseGenep}
                      alt="Base Genep Bali"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <button className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-lg bg-black/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md hover:bg-black/80">
                    <ImageIcon size={14} />
                    Lihat Semua Foto (12)
                  </button>
                </div>

                {/* Quick Info Attributes */}
                <div className="flex flex-col justify-between md:col-span-7">
                  <div>
                    <span className="inline-block rounded-full bg-[#F3EBE1] px-3 py-1 text-[11px] font-bold tracking-wide text-[#6B2E1E] uppercase">
                      INFORMASI BAHAN
                    </span>

                    <h1 className="mt-2 text-2xl font-bold text-[#3B1E14]">
                      Base Genep Bali
                    </h1>
                    <p className="mt-1 text-xs text-gray-500">
                      Bumbu dasar khas Bali yang menjadi fondasi rasa berbagai masakan tradisional.
                    </p>

                    {/* Metadata Grid */}
                    <div className="mt-4 grid grid-cols-2 gap-y-3 text-xs">
                      <div className="flex items-center gap-2.5">
                        <Calendar size={16} className="text-gray-400" />
                        <div>
                          <p className="text-[10px] text-gray-400">Kategori</p>
                          <p className="font-medium text-gray-800">Bumbu / Rempah</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <MapPin size={16} className="text-gray-400" />
                        <div>
                          <p className="text-[10px] text-gray-400">Asal</p>
                          <p className="font-medium text-gray-800">Bali, Indonesia</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <Tag size={16} className="text-gray-400" />
                        <div>
                          <p className="text-[10px] text-gray-400">Jenis</p>
                          <p className="font-medium text-gray-800">Bumbu Dasar</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <Layers size={16} className="text-gray-400" />
                        <div>
                          <p className="text-[10px] text-gray-400">Bagian Digunakan</p>
                          <p className="font-medium text-gray-800">Rimpang, Umbi, Biji</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <Sparkles size={16} className="text-gray-400" />
                        <div>
                          <p className="text-[10px] text-gray-400">Rasa Dominan</p>
                          <p className="font-medium text-gray-800">Gurih, Sedikit Pedas, Aroma Rempah</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <RefreshCw size={16} className="text-gray-400" />
                        <div>
                          <p className="text-[10px] text-gray-400">Ketersediaan</p>
                          <p className="font-medium text-gray-800">Tersedia Sepanjang Tahun</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-5 flex items-center gap-2 pt-2">
                    <button className="flex items-center gap-2 rounded-lg bg-[#3B1E14] px-5 py-2 text-xs font-medium text-white transition hover:bg-[#2A150E]">
                      <Bookmark size={14} /> Simpan
                    </button>
                    <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-50">
                      <Share2 size={14} /> Bagikan
                    </button>
                    <button className="flex items-center justify-center rounded-lg border border-gray-200 bg-white p-2 text-gray-600 transition hover:bg-gray-50">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ---------- Tabs Navigation ---------- */}
            <div className="mt-6 flex overflow-x-auto border-b border-gray-200 bg-transparent text-xs font-medium text-gray-500 scrollbar-none">
              {[
                "Ringkasan",
                "Komposisi",
                "Karakteristik",
                "Konteks Gastronomi",
                "Peta Sebaran",
                "Digunakan pada",
                "Dokumentasi",
                "Metadata",
              ].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap px-4 py-3 border-b-2 transition ${
                    activeTab === tab
                      ? "border-[#3B1E14] font-semibold text-[#3B1E14]"
                      : "border-transparent hover:text-gray-800"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* ---------- Section 1: Deskripsi ---------- */}
            <div className="mt-6 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="text-sm font-bold text-[#3B1E14]">Deskripsi</h2>
              <p className="mt-2 text-xs leading-relaxed text-gray-600">
                Base Genep adalah campuran bumbu lengkap khas Bali yang dihaluskan menjadi pasta. Bumbu ini merupakan dasar dari banyak masakan tradisional Bali seperti ayam betutu, lawar, sate lilit, dan lainnya. Base Genep memberikan cita rasa gurih, kaya rempah, dan aroma khas yang menjadi identitas kuliner Bali.
              </p>
            </div>

            {/* ---------- Section 2: Komposisi Utama ---------- */}
            <div className="mt-6 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="text-sm font-bold text-[#3B1E14]">Komposisi Utama</h2>
              <p className="mt-1 text-xs text-gray-500">
                Campuran beberapa rempah dan bumbu segar yang dihaluskan.
              </p>

              <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-5 md:grid-cols-9">
                {ingredientsList.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center rounded-xl border border-gray-100 bg-gray-50/50 p-2 text-center transition hover:border-gray-200"
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      className="h-10 w-10 rounded-lg object-cover"
                    />
                    <span className="mt-2 text-[10px] font-medium text-gray-700">
                      {item.name}
                    </span>
                  </div>
                ))}
                
                {/* Plus More Badge */}
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 p-2 text-center">
                  <span className="text-xs font-bold text-gray-500">+</span>
                  <span className="text-[9px] font-medium text-gray-500 leading-tight mt-0.5">
                    dan rempah lainnya
                  </span>
                </div>
              </div>
            </div>

            {/* ---------- Section 3: Karakteristik ---------- */}
            <div className="mt-6 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="text-sm font-bold text-[#3B1E14]">Karakteristik</h2>
              <p className="mt-1 text-xs text-gray-500">
                Ciri khas Base Genep Bali dari segi aroma, rasa, warna, dan tekstur.
              </p>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
                <div className="rounded-xl border border-gray-100 bg-[#FBF9F7] p-4">
                  <span className="text-xs font-semibold text-[#3B1E14]">Aroma</span>
                  <p className="mt-1 text-xs text-gray-600 leading-relaxed">
                    Aroma rempah yang kuat, segar, dan harum khas bumbu Bali.
                  </p>
                </div>

                <div className="rounded-xl border border-gray-100 bg-[#FBF9F7] p-4">
                  <span className="text-xs font-semibold text-[#3B1E14]">Rasa</span>
                  <p className="mt-1 text-xs text-gray-600 leading-relaxed">
                    Gurih, sedikit pedas, dengan sentuhan manis alami dari rempah.
                  </p>
                </div>

                <div className="rounded-xl border border-gray-100 bg-[#FBF9F7] p-4">
                  <span className="text-xs font-semibold text-[#3B1E14]">Warna</span>
                  <p className="mt-1 text-xs text-gray-600 leading-relaxed">
                    Kuning kecokelatan keemasan alami dari kunyit dan rempah.
                  </p>
                </div>

                <div className="rounded-xl border border-gray-100 bg-[#FBF9F7] p-4">
                  <span className="text-xs font-semibold text-[#3B1E14]">Tekstur</span>
                  <p className="mt-1 text-xs text-gray-600 leading-relaxed">
                    Pasta halus hingga sedikit kasar tergantung cara penghalusan.
                  </p>
                </div>
              </div>
            </div>

            {/* ---------- Section 4: Konteks Gastronomi ---------- */}
            <div className="mt-6 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="text-sm font-bold text-[#3B1E14]">Konteks Gastronomi</h2>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
                <div>
                  <h3 className="text-xs font-bold text-gray-800">Peran dalam Masakan Bali</h3>
                  <ul className="mt-2 space-y-1.5 text-xs text-gray-600 list-disc list-inside">
                    <li>Sebagai bumbu dasar hampir semua masakan Bali.</li>
                    <li>Memberikan cita rasa gurih kompleks dan aroma khas.</li>
                    <li>Memperkaya rasa tanpa menghilangkan bahan utama.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-gray-800">Makna Budaya</h3>
                  <ul className="mt-2 space-y-1.5 text-xs text-gray-600 list-disc list-inside">
                    <li>Melambangkan kekayaan rempah Nusantara.</li>
                    <li>Digunakan dalam upacara adat dan persembahan.</li>
                    <li>Menjadi bagian penting dari identitas kuliner Bali.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-gray-800">Penggunaan dalam Tradisi</h3>
                  <ul className="mt-2 space-y-1.5 text-xs text-gray-600 list-disc list-inside">
                    <li>Digunakan dalam upacara keagamaan (pajanan, odalan).</li>
                    <li>Bahan dalam hidangan persembahan.</li>
                    <li>Simbol rasa syukur dan kelimpahan alam.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-gray-800">Daerah Penggunaan</h3>
                  <ul className="mt-2 space-y-1.5 text-xs text-gray-600 list-disc list-inside">
                    <li>Digunakan di seluruh wilayah Bali.</li>
                    <li>Khas terutama di daerah Karangasem dan Gianyar.</li>
                    <li>Menjadi bumbu dasar rumah tangga tradisional.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* ---------- Section 5: OpenStreetMap Integration ---------- */}
            <div className="mt-6 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="text-sm font-bold text-[#3B1E14]">
                    Peta Asal & Sebaran Tradisi
                  </h2>
                  <p className="text-xs text-gray-500">
                    Sebaran geografis penggunaan dan pusat variasi Base Genep di Bali.
                  </p>
                </div>
                <span className="flex items-center gap-1 text-[11px] font-semibold text-[#6B2E1E] bg-[#F3EBE1] px-2.5 py-1 rounded-md">
                  <Compass size={12} /> OpenStreetMap
                </span>
              </div>

              {/* Leaflet Map Container */}
              <div className="h-[320px] w-full overflow-hidden rounded-xl border border-gray-200">
                <MapContainer
                  center={baliCenter}
                  zoom={9}
                  scrollWheelZoom={false}
                  className="h-full w-full z-0"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {mapLocations.map((loc) => (
                    <Marker key={loc.id} position={loc.pos}>
                      <Popup>
                        <div className="text-xs p-1">
                          <strong className="text-[#3B1E14]">{loc.name}</strong>
                          <p className="mt-1 text-gray-600">{loc.desc}</p>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            </div>

            {/* ---------- Section 6: Digunakan pada Masakan ---------- */}
            <div className="mt-6 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-[#3B1E14]">
                    Digunakan pada Makanan / Resep
                  </h2>
                  <p className="text-xs text-gray-500">
                    Base Genep menjadi bumbu dasar pada berbagai hidangan khas Bali.
                  </p>
                </div>

                <div className="flex items-center gap-1">
                  <button className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50">
                    <ChevronLeft size={14} />
                  </button>
                  <button className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50">
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>

              {/* Related Dishes Cards */}
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
                {relatedDishes.map((dish) => (
                  <div
                    key={dish.id}
                    onClick={() => navigate(`/culinary/${dish.id}`)}
                    className="group cursor-pointer overflow-hidden rounded-xl border border-gray-100 bg-white transition hover:shadow-md"
                  >
                    <div className="h-24 w-full overflow-hidden">
                      <img
                        src={dish.img}
                        alt={dish.title}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-2.5">
                      <h4 className="text-xs font-bold text-gray-800 group-hover:text-[#6B2E1E]">
                        {dish.title}
                      </h4>
                      <p className="mt-1 line-clamp-2 text-[10px] text-gray-500 leading-relaxed">
                        {dish.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 text-center">
                <button className="text-xs font-semibold text-[#6B2E1E] hover:underline">
                  Lihat Semua →
                </button>
              </div>
            </div>

            {/* ---------- Banner Kontribusi ---------- */}
            <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-xl bg-[#F6EFE9] p-5 sm:flex-row">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EBDDD3] text-[#3B1E14]">
                  <BookOpen size={20} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#3B1E14]">
                    Bantu Lestarikan Bahan Lokal
                  </h3>
                  <p className="text-[11px] text-gray-600">
                    Bagikan informasi ini atau kontribusikan dokumentasi bahan lainnya untuk menjaga kekayaan kuliner dan budaya Indonesia.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50">
                  Bagikan
                </button>
                <button className="rounded-lg bg-[#3B1E14] px-4 py-1.5 text-xs font-medium text-white transition hover:bg-[#2A150E]">
                  Kontribusi Bahan
                </button>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Sidebar (4 Cols) */}
          <div className="space-y-6 lg:col-span-4">
            
            {/* ---------- Sidebar 1: Informasi Singkat ---------- */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="text-xs font-bold text-gray-800">Informasi Singkat</h3>

              <div className="mt-4 space-y-3 text-xs">
                <div className="flex items-start gap-3">
                  <Utensils size={16} className="mt-0.5 text-gray-400" />
                  <div>
                    <p className="text-[10px] text-gray-400">Nama Bahan</p>
                    <p className="font-semibold text-gray-800">Base Genep Bali</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar size={16} className="mt-0.5 text-gray-400" />
                  <div>
                    <p className="text-[10px] text-gray-400">Kategori</p>
                    <p className="font-semibold text-gray-800">Bumbu / Rempah</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin size={16} className="mt-0.5 text-gray-400" />
                  <div>
                    <p className="text-[10px] text-gray-400">Asal</p>
                    <p className="font-semibold text-gray-800">Bali, Indonesia</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Sparkles size={16} className="mt-0.5 text-gray-400" />
                  <div>
                    <p className="text-[10px] text-gray-400">Digunakan Sebagai</p>
                    <p className="font-semibold text-gray-800">Bumbu dasar berbagai masakan Bali</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock size={16} className="mt-0.5 text-gray-400" />
                  <div>
                    <p className="text-[10px] text-gray-400">Status</p>
                    <p className="font-semibold text-gray-800">Terdokumentasi</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <UserCheck size={16} className="mt-0.5 text-gray-400" />
                  <div>
                    <p className="text-[10px] text-gray-400">Dikontribusikan oleh</p>
                    <p className="font-semibold text-gray-800">Pakar Gastronomi Bali</p>
                    <p className="text-[10px] text-gray-400">10 Mei 2024</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ---------- Sidebar 2: Dokumentasi Grid ---------- */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="text-xs font-bold text-gray-800">Dokumentasi</h3>

              {/* Sub-tabs Foto/Video */}
              <div className="mt-3 flex gap-2 border-b border-gray-100 pb-2 text-xs">
                <button
                  onClick={() => setActiveDocTab("Foto")}
                  className={`flex items-center gap-1.5 pb-1 font-medium ${
                    activeDocTab === "Foto"
                      ? "border-b-2 border-[#3B1E14] font-semibold text-[#3B1E14]"
                      : "text-gray-400"
                  }`}
                >
                  <ImageIcon size={14} /> Foto (12)
                </button>
                <button
                  onClick={() => setActiveDocTab("Video")}
                  className={`flex items-center gap-1.5 pb-1 font-medium ${
                    activeDocTab === "Video"
                      ? "border-b-2 border-[#3B1E14] font-semibold text-[#3B1E14]"
                      : "text-gray-400"
                  }`}
                >
                  <Video size={14} /> Video (3)
                </button>
              </div>

              {/* Photo Grid */}
              <div className="mt-3 grid grid-cols-2 gap-2">
                <img
                  src={baseGenep}
                  alt="Doc 1"
                  className="h-24 w-full rounded-lg object-cover"
                />
                <img
                  src={kunyitLengkuas}
                  alt="Doc 2"
                  className="h-24 w-full rounded-lg object-cover"
                />
                <img
                  src={lawarBali}
                  alt="Doc 3"
                  className="h-24 w-full rounded-lg object-cover"
                />
                <img
                  src={bebekBetutu}
                  alt="Doc 4"
                  className="h-24 w-full rounded-lg object-cover"
                />
                <img
                  src={megibung}
                  alt="Doc 5"
                  className="h-24 w-full rounded-lg object-cover"
                />
                <img
                  src={baseGenep}
                  alt="Doc 6"
                  className="h-24 w-full rounded-lg object-cover"
                />
              </div>

              <button className="mt-4 flex w-full items-center justify-center gap-1 rounded-lg border border-gray-200 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-50">
                Lihat Semua Dokumentasi <ArrowRight size={12} />
              </button>
            </div>

            {/* ---------- Sidebar 3: Tips & Penyimpanan ---------- */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="flex items-center gap-2 text-xs font-bold text-gray-800">
                <Sparkles size={14} className="text-[#6B2E1E]" />
                Tips & Penyimpanan
              </h3>

              <ul className="mt-3 space-y-2 text-xs text-gray-600 list-disc list-inside">
                <li>Simpan dalam wadah kedap udara di kulkas hingga 7–10 hari.</li>
                <li>Bisa disimpan dalam freezer hingga 1 bulan.</li>
                <li>Gunakan minyak saat menumis untuk rasa lebih harum dan tahan lama.</li>
              </ul>
            </div>

            {/* ---------- Sidebar 4: Metadata ---------- */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="text-xs font-bold text-gray-800">Metadata</h3>

              <div className="mt-4 space-y-3 text-xs">
                <div className="flex items-start gap-2.5">
                  <FileText size={16} className="mt-0.5 text-gray-400" />
                  <div>
                    <p className="text-[10px] text-gray-400">Sumber Informasi</p>
                    <p className="font-semibold text-gray-800">
                      Buku Kuliner Tradisional Bali, Wawancara Pakar Gastronomi
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <UserCheck size={16} className="mt-0.5 text-gray-400" />
                  <div>
                    <p className="text-[10px] text-gray-400">Kontributor</p>
                    <p className="font-semibold text-gray-800">
                      I Made Suarta, S.Pd., M.Par
                    </p>
                    <p className="text-[10px] text-gray-400">Pakar Gastronomi Bali</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Calendar size={16} className="mt-0.5 text-gray-400" />
                  <div>
                    <p className="text-[10px] text-gray-400">Tanggal Dokumentasi</p>
                    <p className="font-semibold text-gray-800">10 Mei 2024</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <RefreshCw size={16} className="mt-0.5 text-gray-400" />
                  <div>
                    <p className="text-[10px] text-gray-400">Terakhir Diperbarui</p>
                    <p className="font-semibold text-gray-800">12 Mei 2024</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle size={16} className="mt-0.5 text-green-600" />
                  <div>
                    <p className="text-[10px] text-gray-400">Status Verifikasi</p>
                    <p className="font-semibold text-green-700">Terverifikasi oleh Pakar</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default IngredientDetail;