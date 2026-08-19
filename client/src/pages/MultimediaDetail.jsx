import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
  ChevronRight,
  ChevronLeft,
  Calendar,
  Clock,
  MapPin,
  Share2,
  Bookmark,
  MoreHorizontal,
  Video,
  Camera,
  Folder,
  CheckCircle2,
  RefreshCw,
  BookOpen,
  Play,
  Volume2,
  Settings,
  Maximize,
  ArrowRight,
  ShieldCheck,
  FileText,
  User,
} from "lucide-react";

// Fix for Leaflet default icon issue in React
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Import Assets
import megibungImg from "../assets/megibung.jpg";
import lawarImg from "../assets/lawar-bali.jpg";
import bebekImg from "../assets/bebek-betutu.jpeg";
import ubudFoodImg from "../assets/ubud-food.jpg";
import exploreHeroImg from "../assets/explore-hero.jpg";

const MultimediaDetail = () => {
  const [activeTab, setActiveTab] = useState("all");

  // Koordinat Desa Tenganan Pegringsingan, Karangasem, Bali
  const position = [-8.4526, 115.5873];

  const thumbnails = [
    megibungImg,
    lawarImg,
    bebekImg,
    ubudFoodImg,
    exploreHeroImg,
  ];

  const relatedGallery = [
    { type: "image", img: megibungImg, title: "Persiapan Megibung" },
    { type: "video", img: lawarImg, duration: "02:45", title: "Penyajian Lawar" },
    { type: "image", img: bebekImg, title: "Proses Memasak" },
    { type: "video", img: ubudFoodImg, duration: "01:15", title: "Suasana Acara" },
    { type: "image", img: exploreHeroImg, title: "Terasering Desa" },
  ];

  const relatedContents = [
    { title: "Lawar Bali", category: "Kuliner", img: lawarImg, link: "/explore/lawar-bali" },
    { title: "Upacara Megibung", category: "Budaya", img: megibungImg, duration: "02:45", link: "/explore/upacara-megibung" },
    { title: "Base Genep Bali", category: "Bahan", img: bebekImg, link: "/explore/base-genep" },
    { title: "Ubud Food Festival", category: "Agenda", img: ubudFoodImg, count: "2.5k", link: "/explore/ubud-food-festival" },
  ];

  return (
    <div className="min-h-screen w-full bg-[#FAFAFA] text-gray-800 font-sans flex flex-col justify-between">
      <Navbar />

      <div className="flex-1">
        {/* Breadcrumb */}
        <div className="mx-auto max-w-[1240px] px-4 py-3 sm:px-6">
          <nav className="flex items-center gap-2 text-xs text-gray-500">
            <Link to="/explore" className="hover:text-[#4B2417]">
              Explore
            </Link>
            <ChevronRight size={14} className="shrink-0 text-gray-400" />
            <Link to="/explore?category=Multimedia" className="hover:text-[#4B2417]">
              Multimedia
            </Link>
            <ChevronRight size={14} className="shrink-0 text-gray-400" />
            <span className="font-semibold text-gray-800">
              Megibung di Desa Tenganan
            </span>
          </nav>
        </div>

        {/* Main Content */}
        <main className="mx-auto max-w-[1240px] px-4 pb-16 sm:px-6">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            
            {/* Left Content (8 Cols) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Media Player */}
              <div className="overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100">
                <div className="relative aspect-video w-full bg-black">
                  <img
                    src={megibungImg}
                    alt="Megibung di Desa Tenganan"
                    className="h-full w-full object-cover opacity-90"
                  />

                  <div className="absolute top-4 right-4 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                    1 / 18
                  </div>

                  <button className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition hover:bg-black/70">
                    <ChevronLeft size={20} />
                  </button>
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition hover:bg-black/70">
                    <ChevronRight size={20} />
                  </button>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-[#3B1E14] shadow-lg backdrop-blur-sm transition transform hover:scale-105">
                      <Play size={24} className="ml-1 fill-[#3B1E14]" />
                    </button>
                  </div>

                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 flex flex-col justify-end gap-2 text-white">
                    <div className="relative h-1 w-full rounded-full bg-white/30 cursor-pointer">
                      <div className="absolute top-0 left-0 h-full w-[20%] rounded-full bg-[#8C3A27]"></div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs pt-1">
                      <div className="flex items-center gap-3">
                        <button className="hover:text-gray-300">
                          <Play size={16} className="fill-white" />
                        </button>
                        <span className="text-[11px] text-gray-200">00:00 / 02:45</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button className="hover:text-gray-300"><Volume2 size={16} /></button>
                        <button className="hover:text-gray-300"><Settings size={16} /></button>
                        <button className="hover:text-gray-300"><Maximize size={16} /></button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Thumbnails Slider */}
                <div className="p-3 bg-gray-50 flex items-center gap-2 overflow-x-auto relative">
                  <button className="absolute left-1 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow text-gray-600 hover:bg-gray-100">
                    <ChevronLeft size={14} />
                  </button>
                  <div className="flex gap-2.5 px-6">
                    {thumbnails.map((thumb, idx) => (
                      <div
                        key={idx}
                        className={`relative h-14 w-24 shrink-0 overflow-hidden rounded-lg cursor-pointer border-2 ${
                          idx === 0 ? "border-[#4B2417]" : "border-transparent opacity-70 hover:opacity-100"
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

              {/* Deskripsi */}
              <div className="relative rounded-2xl border border-gray-100 bg-white p-6 shadow-sm flex flex-col md:flex-row justify-between items-start gap-4">
                <div className="flex-1">
                  <h2 className="text-sm font-bold text-[#3B1E14]">Deskripsi</h2>
                  <p className="mt-2 text-xs leading-relaxed text-gray-600">
                    Video ini mendokumentasikan tradisi Megibung yang dilakukan oleh masyarakat Desa Tenganan Pegringsingan sebagai bagian dari upacara adat. Megibung merupakan bentuk kebersamaan dan rasa syukur yang diwujudkan melalui kegiatan makan bersama dengan duduk melingkar tanpa sekat.
                  </p>
                </div>
                
                <div className="hidden sm:flex shrink-0 w-36 h-24 border border-dashed border-amber-200 bg-amber-50/50 rounded-xl items-center justify-center p-2 text-center">
                  <div className="text-[10px] text-amber-800 font-medium">
                    🥣 Ilustrasi Megibung Adat Tenganan
                  </div>
                </div>
              </div>

              {/* Konteks Gastronomi */}
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h2 className="text-sm font-bold text-[#3B1E14] mb-4">Konteks Gastronomi</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1.5">Apa yang Didokumentasikan</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Proses Megibung dalam upacara adat, mulai dari persiapan makanan, penyajian, hingga makan bersama masyarakat.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-800 mb-1.5">Hubungannya dengan Kuliner/Budaya</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Megibung mencerminkan nilai gotong royong, kebersamaan, dan kesetaraan yang menjadi ciri khas budaya Bali.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-800 mb-1.5">Tradisi atau Kegiatan yang Terlihat</h3>
                    <ul className="space-y-1 text-gray-600 list-disc list-inside">
                      <li>Persiapan hidangan bersama-sama</li>
                      <li>Penyajian di atas dulang/nyiru</li>
                      <li>Makan bersama melingkar</li>
                      <li>Doa dan ungkapan syukur</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Galeri Terkait */}
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <h2 className="text-sm font-bold text-[#3B1E14]">Galeri Terkait</h2>
                  <button className="flex items-center gap-1 text-xs font-semibold text-[#6B2E1E] hover:underline">
                    Lihat semua <ArrowRight size={12} />
                  </button>
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => setActiveTab("all")}
                    className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                      activeTab === "all"
                        ? "bg-[#3B1E14] text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    <Folder size={14} /> Semua (18)
                  </button>
                  <button
                    onClick={() => setActiveTab("photo")}
                    className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                      activeTab === "photo"
                        ? "bg-[#3B1E14] text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    <Camera size={14} /> Foto (14)
                  </button>
                  <button
                    onClick={() => setActiveTab("video")}
                    className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                      activeTab === "video"
                        ? "bg-[#3B1E14] text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    <Video size={14} /> Video (4)
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
                  {relatedGallery.map((item, idx) => (
                    <div key={idx} className="relative h-24 rounded-xl overflow-hidden group cursor-pointer border border-gray-100">
                      <img src={item.img} alt={item.title} className="h-full w-full object-cover transition transform group-hover:scale-105" />
                      {item.type === "video" && (
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-[#3B1E14]">
                            <Play size={12} className="ml-0.5 fill-[#3B1E14]" />
                          </div>
                          <span className="absolute bottom-1 right-1.5 text-[9px] font-medium text-white bg-black/60 px-1.5 py-0.5 rounded">
                            {item.duration}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Lokasi Dokumentasi (OpenStreetMap Integration) */}
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h2 className="text-sm font-bold text-[#3B1E14] mb-4">Lokasi Dokumentasi</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="md:col-span-5 space-y-3">
                    <div className="flex items-start gap-2.5">
                      <MapPin size={18} className="text-[#6B2E1E] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold text-gray-800">Desa Tenganan Pegringsingan</p>
                        <p className="text-[11px] text-gray-500 mt-0.5">
                          Kecamatan Manggis, Kabupaten Karangasem, Bali, Indonesia
                        </p>
                      </div>
                    </div>

                    <a 
                      href={`https://www.openstreetmap.org/?mlat=${position[0]}&mlon=${position[1]}&zoom=15`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
                    >
                      <MapPin size={14} /> Lihat di Peta Lengkap
                    </a>
                  </div>

                  <div className="md:col-span-7 h-56 rounded-xl overflow-hidden border border-gray-200 relative z-0">
                    <MapContainer
                      center={position}
                      zoom={14}
                      scrollWheelZoom={false}
                      style={{ height: "100%", width: "100%" }}
                    >
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <Marker position={position}>
                        <Popup>
                          <strong>Desa Tenganan Pegringsingan</strong> <br /> Karangasem, Bali
                        </Popup>
                      </Marker>
                    </MapContainer>
                  </div>
                </div>
              </div>

              {/* Konten Terkait */}
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h2 className="text-sm font-bold text-[#3B1E14] mb-4">Konten Terkait</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {relatedContents.map((item, idx) => (
                    <div key={idx} className="rounded-xl border border-gray-100 bg-white overflow-hidden shadow-xs hover:shadow-md transition">
                      <div className="relative h-28 w-full">
                        <img src={item.img} alt={item.title} className="h-full w-full object-cover" />
                        {item.duration && (
                          <span className="absolute bottom-2 right-2 rounded bg-black/60 px-1.5 py-0.5 text-[10px] text-white">
                            {item.duration}
                          </span>
                        )}
                        {item.count && (
                          <span className="absolute bottom-2 right-2 rounded bg-black/60 px-1.5 py-0.5 text-[10px] text-white">
                            {item.count}
                          </span>
                        )}
                      </div>
                      <div className="p-3">
                        <span className="text-[10px] font-bold text-[#6B2E1E] uppercase tracking-wider">
                          {item.category} Terkait
                        </span>
                        <h4 className="mt-1 text-xs font-bold text-gray-800 line-clamp-1">
                          {item.title}
                        </h4>
                        <div className="mt-3 flex justify-end">
                          <Link to={item.link} className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-[#3B1E14] hover:text-white transition">
                            <ArrowRight size={12} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Sidebar (4 Cols) */}
            <div className="lg:col-span-4 space-y-6">
              
              <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <span className="inline-block rounded-full bg-purple-50 px-3 py-1 text-[10px] font-bold tracking-wider text-purple-700 uppercase">
                  MULTIMEDIA
                </span>

                <h1 className="mt-2 text-xl font-bold text-[#3B1E14]">
                  Megibung di Desa Tenganan
                </h1>
                <p className="mt-1 text-xs text-gray-500">
                  Tradisi makan bersama dalam upacara adat
                </p>

                <div className="mt-4 space-y-3 text-xs border-t border-gray-100 pt-3">
                  <div className="flex items-center gap-3">
                    <Calendar size={16} className="text-gray-400 shrink-0" />
                    <div>
                      <p className="text-[10px] text-gray-400">Tanggal Dokumentasi</p>
                      <p className="font-semibold text-gray-800">15 Mei 2024</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <User size={16} className="text-gray-400 shrink-0" />
                    <div>
                      <p className="text-[10px] text-gray-400">Dokumentator</p>
                      <p className="font-semibold text-gray-800">I Made Suarta, S.Pd., M.Par</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Video size={16} className="text-gray-400 shrink-0" />
                    <div>
                      <p className="text-[10px] text-gray-400">Jenis Media</p>
                      <p className="font-semibold text-gray-800">Video</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock size={16} className="text-gray-400 shrink-0" />
                    <div>
                      <p className="text-[10px] text-gray-400">Durasi</p>
                      <p className="font-semibold text-gray-800">02:45 menit</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin size={16} className="text-gray-400 shrink-0" />
                    <div>
                      <p className="text-[10px] text-gray-400">Lokasi</p>
                      <p className="font-semibold text-gray-800">Desa Tenganan Pegringsingan, Karangasem, Bali</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Folder size={16} className="text-gray-400 shrink-0" />
                    <div>
                      <p className="text-[10px] text-gray-400">Kategori</p>
                      <p className="font-semibold text-gray-800">Tradisi & Ritual, Seni Kuliner</p>
                    </div>
                  </div>
                </div>

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

              {/* Tag Sidebar */}
              <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <h3 className="font-bold text-gray-800 mb-3 text-xs">Tag</h3>
                <div className="flex flex-wrap gap-1.5 text-[11px]">
                  {["megibung", "tradisi", "upacara adat", "kebersamaan", "bali", "makan bersama", "gotong royong"].map((t, i) => (
                    <span key={i} className="rounded-full bg-purple-50 px-2.5 py-1 text-purple-700 font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Dokumentasi Lainnya */}
              <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <h3 className="font-bold text-gray-800 text-xs mb-3">Dokumentasi Lainnya dari Lokasi Ini</h3>

                <div className="space-y-3">
                  {[
                    { title: "Persiapan Megibung", date: "14 Mei 2024", img: megibungImg },
                    { title: "Penyajian Hidangan Adat", date: "15 Mei 2024", img: lawarImg },
                    { title: "Doa dalam Upacara", date: "15 Mei 2024", img: bebekImg },
                  ].map((doc, idx) => (
                    <div key={idx} className="flex items-center gap-3 group cursor-pointer">
                      <div className="relative h-12 w-16 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                        <img src={doc.img} alt={doc.title} className="h-full w-full object-cover" />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <Play size={10} className="fill-white text-white" />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-gray-800 group-hover:text-[#6B2E1E] transition">
                          {doc.title}
                        </h4>
                        <p className="text-[10px] text-gray-400 mt-0.5">{doc.date}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="mt-4 w-full flex items-center justify-center gap-1 text-xs font-semibold text-gray-600 hover:text-[#3B1E14] border border-gray-200 py-1.5 rounded-lg">
                  Lihat Semua Dokumentasi <ArrowRight size={12} />
                </button>
              </div>

              {/* Metadata & Verifikasi */}
              <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm space-y-3 text-xs">
                <h3 className="font-bold text-gray-800 border-b border-gray-100 pb-2">Metadata & Verifikasi</h3>

                <div className="flex items-start gap-2.5">
                  <FileText size={16} className="text-gray-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] text-gray-400">Sumber Informasi</p>
                    <p className="font-semibold text-gray-800">Wawancara dengan Pakar Gastronomi Bali dan Observasi Lapangan</p>
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
                    <p className="text-[10px] text-gray-400">Tanggal Diunggah</p>
                    <p className="font-semibold text-gray-800">20 Mei 2024</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <RefreshCw size={16} className="text-gray-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] text-gray-400">Terakhir Diperbarui</p>
                    <p className="font-semibold text-gray-800">21 Mei 2024</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] text-gray-400">Status Verifikasi</p>
                    <p className="font-semibold text-emerald-700">Terverifikasi oleh Pakar</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <ShieldCheck size={16} className="text-gray-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] text-gray-400">Lisensi Penggunaan</p>
                    <p className="font-semibold text-gray-800">CC BY-NC 4.0 ℹ️</p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </main>

        {/* Banner Kontribusi */}
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 pb-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl bg-[#F4EDE7] p-5 border border-[#EBE0D8]">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E5D5C8] text-[#3B1E14]">
                <BookOpen size={20} />
              </div>
              <div>
                <h3 className="text-xs font-bold text-[#3B1E14]">
                  Bantu Melestarikan Dokumentasi Gastronomi Nusantara
                </h3>
                <p className="text-[11px] text-gray-600">
                  Bagikan atau kontribusikan dokumentasi lainnya untuk memperkaya pengetahuan kuliner dan budaya Indonesia.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-1">
                <Share2 size={13} /> Bagikan
              </button>
              <button className="rounded-lg bg-[#5C2B1D] px-4 py-2 text-xs font-medium text-white hover:bg-[#4B2417]">
                Kontribusi Konten
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MultimediaDetail;