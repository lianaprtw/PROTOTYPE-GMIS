import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import {
  ChevronRight,
  ChevronLeft,
  Calendar,
  MapPin,
  Share2,
  Bookmark,
  MoreHorizontal,
  CheckCircle2,
  RefreshCw,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  FileText,
  User,
  Globe,
  Compass,
  Utensils,
  Leaf,
  BookOpenCheck,
  Users,
  Camera,
  Car,
  Bus,
  Building2,
  Hotel,
  ExternalLink,
} from "lucide-react";

// Dummy assets
import ubudHero from "../assets/ubud-food.jpg";
import babiGulingImg from "../assets/bebek-betutu.jpeg";
import lawarImg from "../assets/lawar-bali.jpg";
import megibungImg from "../assets/megibung.jpg";

// Fix icon default Leaflet di React/Vite/Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const DestinationDetail = () => {
  // Koordinat Ubud, Gianyar, Bali
  const position = [-8.5069, 115.2625];

  // Data Thumbnail Carousel Atas
  const heroThumbnails = [ubudHero, lawarImg, babiGulingImg, megibungImg, ubudHero];

  // Data Nilai Gastronomi
  const gastronomyValues = [
    {
      no: "01",
      icon: <Utensils className="w-5 h-5 text-amber-700" />,
      title: "Identitas & Keanekaragaman Kuliner",
      desc: "Keberagaman makanan tradisional, resep khas, teknik pengolahan, serta karakter cita rasa yang menjadi identitas gastronomi Ubud.",
    },
    {
      no: "02",
      icon: <Leaf className="w-5 h-5 text-amber-700" />,
      title: "Bahan & Produk Lokal",
      desc: "Pemanfaatan bahan pangan lokal, rempah, hasil pertanian, serta produk pangan yang menjadi bagian dari sistem gastronomi setempat.",
    },
    {
      no: "03",
      icon: <BookOpenCheck className="w-5 h-5 text-amber-700" />,
      title: "Warisan Pengetahuan & Praktik Kuliner",
      desc: "Pengetahuan, resep, teknik pengolahan, dan praktik kuliner yang diwariskan antar generasi dan masih dilestarikan hingga saat ini.",
    },
    {
      no: "04",
      icon: <Users className="w-5 h-5 text-amber-700" />,
      title: "Budaya & Makna Sosial",
      desc: "Keteraitan makanan dengan upacara, ritual, nilai sosial, identitas masyarakat, dan tradisi lokal.",
    },
    {
      no: "05",
      icon: <Camera className="w-5 h-5 text-amber-700" />,
      title: "Pengalaman & Pariwisata Gastronomi",
      desc: "Beragam aktivitas gastronomi yang dapat dialami pengunjung seperti kelas memasak, wisata kuliner, festival, dan mencicipi kuliner lokal.",
    },
  ];

  // Data Kuliner Khas
  const kulinerKhas = [
    { name: "Babi Guling Ubud", tag: "Kuliner Tradisional", img: babiGulingImg },
    { name: "Lawar Ubud", tag: "Kuliner Tradisional", img: lawarImg },
    { name: "Sate Lilit", tag: "Kuliner Tradisional", img: babiGulingImg },
    { name: "Tipat Cantok", tag: "Kuliner Tradisional", img: lawarImg },
    { name: "Jaje Bali", tag: "Kuliner Tradisional", img: megibungImg },
  ];

  // Data Bahan & Produk Lokal
  const bahanLokal = [
    { name: "Beras Merah Ubud", img: lawarImg },
    { name: "Kelapa Bali", img: babiGulingImg },
    { name: "Rempah Bali", img: megibungImg },
    { name: "Sayur Organik Ubud", img: lawarImg },
    { name: "Aren (Enau)", img: babiGulingImg },
  ];

  // Data Aktivitas Gastronomi
  const aktivitasGastronomi = [
    { title: "Cooking Class", desc: "Belajar memasak kuliner Bali tradisional." },
    { title: "Food Tour", desc: "Tur kuliner keliling desa dan pasar tradisional." },
    { title: "Farm Experience", desc: "Pengalaman di kebun organik dan kebun rempah." },
    { title: "Workshop Kuliner", desc: "Workshop membuat jaje Bali dan bumbu tradisional." },
  ];

  return (
    <div className="min-h-screen w-full bg-[#FAFAFA] text-gray-800 font-sans flex flex-col justify-between">
      <Navbar />

      <div className="flex-1">
        {/* Breadcrumb Navigasi */}
        <div className="mx-auto max-w-[1240px] px-4 py-3 sm:px-6">
          <nav className="flex items-center gap-2 text-xs text-gray-500">
            <Link to="/explore" className="hover:text-[#3B1E14]">Explore</Link>
            <ChevronRight size={14} className="shrink-0 text-gray-400" />
            <Link to="/explore?category=Destination" className="hover:text-[#4B2417]">
              Destinasi
            </Link>
            <ChevronRight size={14} className="shrink-0 text-gray-400" />
            <span className="font-semibold text-gray-800">Ubud, Gianyar, Bali</span>
          </nav>
        </div>

        {/* Main Content Area */}
        <main className="mx-auto max-w-[1240px] px-4 pb-16 sm:px-6">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            
            {/* ================= LEFT COLUMN (8 COLS) ================= */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Media Player / Hero Carousel Card */}
              <div className="overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100">
                <div className="relative aspect-[16/9] w-full bg-black">
                  <img
                    src={ubudHero}
                    alt="Ubud, Gianyar, Bali"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute top-4 right-4 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                    1 / 24
                  </div>
                  <button className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition hover:bg-black/70">
                    <ChevronLeft size={20} />
                  </button>
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition hover:bg-black/70">
                    <ChevronRight size={20} />
                  </button>
                  <button className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-lg bg-black/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md hover:bg-black/80">
                    <Camera size={14} /> Lihat Semua Foto (24)
                  </button>
                </div>

                {/* Thumbnails Bar */}
                <div className="p-3 bg-gray-50 flex items-center gap-2 overflow-x-auto relative">
                  <button className="absolute left-1 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow text-gray-600 hover:bg-gray-100">
                    <ChevronLeft size={14} />
                  </button>
                  <div className="flex gap-2.5 px-6">
                    {heroThumbnails.map((thumb, idx) => (
                      <div
                        key={idx}
                        className={`relative h-14 w-24 shrink-0 overflow-hidden rounded-lg cursor-pointer border-2 ${
                          idx === 0 ? "border-[#3B1E14]" : "border-transparent opacity-70 hover:opacity-100"
                        }`}
                      >
                        <img src={thumb} alt="thumb" className="h-full w-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <button className="absolute right-1 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow text-gray-600 hover:bg-gray-100">
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>

              {/* Deskripsi Destinasi Card */}
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h2 className="text-sm font-bold text-[#3B1E14] mb-2">Deskripsi Destinasi</h2>
                <p className="text-xs leading-relaxed text-gray-600">
                  Ubud merupakan pusat budaya dan seni di Bali yang juga dikenal sebagai salah satu destinasi gastronomi unggulan. Kekayaan budaya, tradisi, serta hasil alam yang melimpah menjadikan Ubud sebagai tempat berkembangnya kuliner khas Bali yang autentik, sehat, dan berkelanjutan.
                </p>
              </div>

              {/* Nilai Gastronomi Ubud */}
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h2 className="text-sm font-bold text-[#3B1E14]">Nilai Gastronomi Ubud</h2>
                <p className="text-xs text-gray-500 mb-4">
                  Nilai gastronomi yang menjadikan Ubud sebagai destinasi kuliner unggulan dan aset budaya kuliner Bali.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                  {gastronomyValues.map((item, idx) => (
                    <div key={idx} className="rounded-xl border border-amber-100 bg-amber-50/30 p-3 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="p-1.5 bg-amber-100/60 rounded-lg">{item.icon}</div>
                          <span className="text-[10px] font-bold text-amber-700">{item.no}</span>
                        </div>
                        <h3 className="text-xs font-bold text-gray-800 leading-tight mb-1">{item.title}</h3>
                        <p className="text-[10px] text-gray-600 leading-normal">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Kuliner Khas Ubud */}
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-bold text-[#3B1E14]">Kuliner Khas Ubud</h2>
                  <button className="flex items-center gap-1 text-xs font-semibold text-[#8C3A27] hover:underline">
                    Lihat semua <ArrowRight size={12} />
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {kulinerKhas.map((item, idx) => (
                    <div key={idx} className="rounded-xl border border-gray-100 overflow-hidden bg-white group cursor-pointer shadow-xs hover:shadow-md transition">
                      <div className="h-24 w-full overflow-hidden">
                        <img src={item.img} alt={item.name} className="h-full w-full object-cover group-hover:scale-105 transition duration-300" />
                      </div>
                      <div className="p-2.5">
                        <h4 className="text-xs font-bold text-gray-800 line-clamp-1">{item.name}</h4>
                        <span className="inline-block mt-1 text-[9px] text-amber-800 font-medium bg-amber-50 px-1.5 py-0.5 rounded">
                          {item.tag}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Grid 2 Kolom: Bahan & Produk Lokal + Aktivitas Gastronomi */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Bahan & Produk Lokal */}
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-sm font-bold text-[#3B1E14]">Bahan & Produk Lokal</h2>
                      <button className="flex items-center gap-1 text-xs font-semibold text-[#8C3A27] hover:underline">
                        Lihat semua <ArrowRight size={12} />
                      </button>
                    </div>
                    <div className="grid grid-cols-5 gap-2 text-center">
                      {bahanLokal.map((item, idx) => (
                        <div key={idx} className="flex flex-col items-center">
                          <div className="h-12 w-12 rounded-full overflow-hidden border border-gray-200 mb-1">
                            <img src={item.img} alt={item.name} className="h-full w-full object-cover" />
                          </div>
                          <span className="text-[10px] text-gray-700 leading-tight font-medium line-clamp-2">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Aktivitas Gastronomi */}
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-sm font-bold text-[#3B1E14]">Aktivitas Gastronomi</h2>
                      <button className="flex items-center gap-1 text-xs font-semibold text-[#8C3A27] hover:underline">
                        Lihat semua <ArrowRight size={12} />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {aktivitasGastronomi.map((item, idx) => (
                        <div key={idx} className="rounded-xl border border-gray-100 p-2 bg-gray-50/50 text-center">
                          <div className="flex justify-center mb-1 text-amber-800">
                            <Compass size={16} />
                          </div>
                          <h4 className="text-[11px] font-bold text-gray-800 leading-tight">{item.title}</h4>
                          <p className="text-[9px] text-gray-500 leading-tight mt-0.5">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* Galeri Dokumentasi */}
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-bold text-[#3B1E14]">Galeri Dokumentasi</h2>
                  <button className="flex items-center gap-1 text-xs font-semibold text-[#8C3A27] hover:underline">
                    Lihat semua (24) <ArrowRight size={12} />
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                  {[ubudHero, lawarImg, babiGulingImg, megibungImg, ubudHero, lawarImg].map((img, idx) => (
                    <div key={idx} className="h-20 rounded-xl overflow-hidden border border-gray-100 cursor-pointer group">
                      <img src={img} alt="galeri" className="h-full w-full object-cover group-hover:scale-105 transition" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Konten Terkait */}
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h2 className="text-sm font-bold text-[#3B1E14] mb-4">Konten Terkait</h2>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  {[
                    { title: "Kuliner Terkait", desc: "Babi Guling Ubud", category: "Kuliner", img: babiGulingImg },
                    { title: "Budaya Terkait", desc: "Upacara di Ubud", category: "Budaya", img: megibungImg },
                    { title: "Bahan Terkait", desc: "Base Genep Bali", category: "Bahan", img: lawarImg },
                    { title: "Agenda Terkait", desc: "Ubud Food Festival", category: "Agenda", img: ubudHero },
                  ].map((item, idx) => (
                    <div key={idx} className="rounded-xl border border-gray-100 p-2 flex items-center gap-2.5 bg-white hover:shadow-xs transition">
                      <img src={item.img} alt={item.desc} className="h-10 w-10 rounded-lg object-cover shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-[9px] text-gray-400 font-medium">{item.title}</p>
                        <p className="text-xs font-bold text-gray-800 truncate">{item.desc}</p>
                      </div>
                      <ArrowRight size={12} className="text-gray-400 shrink-0" />
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* ================= RIGHT COLUMN / SIDEBAR (4 COLS) ================= */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Main Header Info Box */}
              <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <span className="inline-block rounded-full bg-amber-100/60 px-3 py-1 text-[10px] font-bold tracking-wider text-amber-800 uppercase">
                  DESTINASI GASTRONOMI
                </span>

                <h1 className="mt-2 text-xl font-bold text-[#3B1E14]">
                  Ubud, Gianyar, Bali
                </h1>
                <p className="mt-0.5 text-xs text-gray-500">
                  Jantung budaya dan kuliner Bali
                </p>

                {/* Info Specs */}
                <div className="mt-4 space-y-3 text-xs border-t border-gray-100 pt-3">
                  <div className="flex items-start gap-3">
                    <Building2 size={16} className="text-gray-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] text-gray-400">Kategori</p>
                      <p className="font-semibold text-gray-800">Desa / Kota Gastronomi</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin size={16} className="text-gray-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] text-gray-400">Lokasi</p>
                      <p className="font-semibold text-gray-800">Gianyar, Bali, Indonesia</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Compass size={16} className="text-gray-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] text-gray-400">Koordinat</p>
                      <p className="font-semibold text-gray-800">8.5069° S, 115.2625° E</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] text-gray-400">Status</p>
                      <p className="font-semibold text-emerald-700">Aktif</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Globe size={16} className="text-gray-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] text-gray-400">Dikenal sebagai</p>
                      <p className="font-semibold text-gray-800">Pusat seni, budaya, dan kuliner Bali</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Utensils size={16} className="text-gray-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] text-gray-400">Tema Utama</p>
                      <p className="font-semibold text-gray-800">Kuliner Tradisional, Seni & Budaya, Alam</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-5 flex items-center gap-2 pt-2 border-t border-gray-100">
                  <button className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-[#3B1E14] py-2 text-xs font-medium text-white transition hover:bg-[#2A150E]">
                    <Bookmark size={14} /> Simpan
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 bg-white py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-50">
                    <Share2 size={14} /> Bagikan
                  </button>
                  <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50">
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              </div>

              {/* Peta Lokasi Card (OpenStreetMap) */}
              <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm space-y-3">
                <h3 className="font-bold text-gray-800 text-xs">Peta Lokasi</h3>
                <div className="h-52 w-full rounded-xl overflow-hidden border border-gray-200 z-0">
                  <MapContainer
                    center={position}
                    zoom={13}
                    scrollWheelZoom={false}
                    className="h-full w-full"
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={position}>
                      <Popup>
                        <span className="text-xs font-bold">Ubud, Gianyar, Bali</span>
                      </Popup>
                    </Marker>
                  </MapContainer>
                </div>
                <a
                  href={`https://www.openstreetmap.org/?mlat=${position[0]}&mlon=${position[1]}#map=14/${position[0]}/${position[1]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 bg-white py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 transition"
                >
                  Lihat di Peta <ExternalLink size={14} />
                </a>
              </div>

              {/* Akses & Fasilitas Card */}
              <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm space-y-3 text-xs">
                <h3 className="font-bold text-gray-800 border-b border-gray-100 pb-2">Akses & Fasilitas</h3>

                <div className="flex items-start gap-2.5">
                  <Car size={16} className="text-gray-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-800">Akses</p>
                    <p className="text-[11px] text-gray-500">Dari Denpasar ± 1,5 jam (36 km) menggunakan kendaraan.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Bus size={16} className="text-gray-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-800">Transportasi</p>
                    <p className="text-[11px] text-gray-500">Tersedia transportasi umum, rental mobil, sepeda motor, dan taksi online.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Building2 size={16} className="text-gray-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-800">Fasilitas Umum</p>
                    <p className="text-[11px] text-gray-500">Parkir, toilet umum, pusat informasi wisata, ATM, dan area istirahat.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Hotel size={16} className="text-gray-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-800">Akomodasi</p>
                    <p className="text-[11px] text-gray-500">Tersedia villa, hotel, homestay, dan guest house mulai dari kelas ekonomi hingga premium.</p>
                  </div>
                </div>
              </div>

              {/* Agenda di Ubud Card */}
              <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm space-y-3">
                <h3 className="font-bold text-gray-800 text-xs border-b border-gray-100 pb-2">Agenda di Ubud</h3>
                
                <div className="space-y-3 text-xs">
                  <div className="flex items-start gap-2.5">
                    <Calendar size={16} className="text-amber-800 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-gray-800">Ubud Food Festival</p>
                      <p className="text-[10px] text-gray-500">29 Mei – 1 Juni 2026</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Calendar size={16} className="text-amber-800 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-gray-800">Pasar Kuliner Ubud</p>
                      <p className="text-[10px] text-gray-500">Setiap Sabtu, 16.00 – 22.00 WITA</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Calendar size={16} className="text-amber-800 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-gray-800">Bali Spirit Festival</p>
                      <p className="text-[10px] text-gray-500">6 – 12 April 2026</p>
                    </div>
                  </div>
                </div>

                <button className="w-full flex items-center justify-center gap-1 text-xs font-semibold text-gray-600 hover:text-[#3B1E14] border border-gray-200 py-1.5 rounded-lg mt-2">
                  Lihat Semua Agenda <ArrowRight size={12} />
                </button>
              </div>

              {/* Metadata & Verifikasi Card */}
              <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm space-y-3 text-xs">
                <h3 className="font-bold text-gray-800 border-b border-gray-100 pb-2">Metadata & Verifikasi</h3>

                <div className="flex items-start gap-2.5">
                  <FileText size={16} className="text-gray-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] text-gray-400">Sumber Informasi</p>
                    <p className="font-semibold text-gray-800">Dinas Pariwisata Kabupaten Gianyar, Pakar Gastronomi Bali</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <User size={16} className="text-gray-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] text-gray-400">Dikontribusikan oleh</p>
                    <p className="font-semibold text-gray-800">I Made Suarta, S.Pd., M.Par</p>
                    <p className="text-[10px] text-gray-400">Pakar Gastronomi Bali</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Calendar size={16} className="text-gray-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] text-gray-400">Tanggal Dokumentasi</p>
                    <p className="font-semibold text-gray-800">10 Mei 2024</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <RefreshCw size={16} className="text-gray-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] text-gray-400">Terakhir Diperbarui</p>
                    <p className="font-semibold text-gray-800">12 Mei 2024</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] text-gray-400">Status Verifikasi</p>
                    <p className="font-semibold text-emerald-700">Terverifikasi oleh Pakar</p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </main>

        {/* Banner Kontribusi Bottom */}
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 pb-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl bg-[#F4EDE7] p-5 border border-[#EBE0D8]">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E5D5C8] text-[#3B1E14]">
                <BookOpen size={20} />
              </div>
              <div>
                <h3 className="text-xs font-bold text-[#3B1E14]">
                  Bantu Melestarikan Destinasi Gastronomi Nusantara
                </h3>
                <p className="text-[11px] text-gray-600">
                  Bagikan informasi atau kontribusikan data terbaru agar kekayaan kuliner Indonesia semakin dikenal dunia.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-1">
                <Share2 size={13} /> Bagikan
              </button>
              <button className="rounded-lg bg-[#5C2B1D] px-4 py-2 text-xs font-medium text-white hover:bg-[#4B2417]">
                Kontribusi Informasi
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DestinationDetail;