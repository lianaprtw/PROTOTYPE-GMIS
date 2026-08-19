import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Bookmark,
  Share2,
  MoreHorizontal,
  ChevronRight,
  ChevronLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
  Info,
  Globe,
  Mail,
  Phone,
  Ticket,
  FileCheck,
  CheckCircle,
  RefreshCw,
  ImageIcon,
  CookingPot,
  UtensilsCrossed,
  GraduationCap,
  Sparkles,
  MessageSquare,
  ShoppingBag,
  ArrowRight,
  BookOpen,
} from "lucide-react";

// Import Leaflet & React-Leaflet untuk OpenStreetMap
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icon issue on Leaflet in React
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

// Import Ikon Media Sosial dari react-icons
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Asset Import
import ubudFood from "../assets/ubud-food.jpg";
import exploreHero from "../assets/explore-hero.jpg";
import megibung from "../assets/megibung.jpg";
import lawarBali from "../assets/lawar-bali.jpg";
import bebekBetutu from "../assets/bebek-betutu.jpeg";

const AgendaDetail = () => {
  // Koordinat Taman Kuliner, Ubud (-8.5069, 115.2625)
  const position = [-8.5069, 115.2625];

  // Data Jadwal & Rangkaian Acara
  const scheduleData = [
    {
      date: "8",
      month: "MEI 2026",
      items: [
        { time: "09.00 – 10.30", title: "Pembukaan & Welcome Ceremony", location: "Taman Kuliner, Ubud" },
        { time: "10.00 – 12.00", title: "Talk Show: Sustainable Food for a Better Future", location: "Main Stage" },
        { time: "14.00 – 16.00", title: "Cooking Demonstration by Chef", location: "Cooking Studio" },
      ],
    },
    {
      date: "9",
      month: "MEI 2026",
      items: [
        { time: "09.00 – 11.00", title: "Workshop: Fermentasi Tradisional", location: "Workshop Room" },
        { time: "13.00 – 15.00", title: "Food Tasting & Local Market Tour", location: "Pasar Kuliner" },
        { time: "16.00 – 18.00", title: "Panel Discussion: Food & Culture", location: "Main Stage" },
      ],
    },
    {
      date: "10",
      month: "MEI 2026",
      items: [
        { time: "09.00 – 11.00", title: "Kids Cooking Class", location: "Kids Zone" },
        { time: "11.00 – 13.00", title: "Demo Masak Nusantara", location: "Cooking Studio" },
        { time: "19.00 – 21.00", title: "Penutupan & Gala Dinner", location: "Taman Kuliner, Ubud" },
      ],
    },
  ];

  // Data Pembicara & Pengisi Acara
  const speakers = [
    { name: "Chef Will Goldfarb", role: "Chef & Restaurateur", img: ubudFood },
    { name: "Eka Sunarya", role: "Chef & Penulis Kuliner", img: megibung },
    { name: "Jodie O'Shea", role: "Food Writer & Broadcaster", img: lawarBali },
    { name: "Putu Gus Arta", role: "Pakar Kuliner Bali", img: bebekBetutu },
    { name: "Farmer Lina", role: "Petani Organik Bali", img: exploreHero },
  ];

  // Data Kegiatan Gastronomi
  const activities = [
    { icon: CookingPot, title: "Cooking Demonstration", desc: "Demo masak oleh chef ternama." },
    { icon: UtensilsCrossed, title: "Food Exhibition", desc: "Pameran produk makanan & minuman lokal." },
    { icon: GraduationCap, title: "Workshop", desc: "Edukasi kuliner tradisional dan berkelanjutan." },
    { icon: Sparkles, title: "Food Tasting", desc: "Cicip berbagai hidangan khas Nusantara." },
    { icon: MessageSquare, title: "Talk Show", desc: "Diskusi inspiratif bersama pakar & pelaku industri." },
    { icon: ShoppingBag, title: "Market & Bazaar", desc: "Belanja produk lokal & kerajinan pendukung." },
  ];

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#FAFAFA] text-gray-800">
      {/* Navbar */}
      <Navbar />

      {/* ================= Breadcrumb ================= */}
      <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-6 py-4">
        <nav className="flex items-center gap-2 text-xs text-gray-500">
          <RouterLink to="/explore" className="hover:text-[#4B2417]">
            Explore
          </RouterLink>
          <ChevronRight size={14} className="shrink-0" />
          <RouterLink to="/explore?category=Agenda" className="hover:text-[#4B2417]">
            Agenda Gastronomi
          </RouterLink>
          <ChevronRight size={14} className="shrink-0" />
          <span className="font-semibold text-gray-800">Ubud Food Festival 2026</span>
        </nav>
      </div>

      {/* ================= Main Content Container ================= */}
      <main className="mx-auto w-full max-w-[1240px] px-4 sm:px-6 pb-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 w-full">
          
          {/* LEFT COLUMN: Main Detail (8 Cols) */}
          <div className="w-full lg:col-span-8">
            
            {/* ---------- Header Card ---------- */}
            <div className="w-full overflow-hidden rounded-2xl bg-white p-5 sm:p-6 shadow-sm border border-gray-100">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
                
                {/* Hero Image */}
                <div className="relative md:col-span-5 w-full">
                  <div className="h-[240px] sm:h-[260px] w-full overflow-hidden rounded-xl">
                    <img
                      src={ubudFood}
                      alt="Ubud Food Festival 2026"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <button className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-lg bg-black/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md hover:bg-black/80">
                    <ImageIcon size={14} className="shrink-0" />
                    Lihat Semua Foto (18)
                  </button>
                </div>

                {/* Quick Info Attributes */}
                <div className="flex flex-col justify-between md:col-span-7 w-full">
                  <div>
                    <span className="inline-block rounded-full bg-[#F3EBE1] px-3 py-1 text-[11px] font-bold tracking-wide text-[#6B2E1E] uppercase">
                      AGENDA GASTRONOMI
                    </span>

                    <h1 className="mt-2 text-2xl font-bold text-[#3B1E14]">
                      Ubud Food Festival 2026
                    </h1>
                    <p className="mt-1 text-xs text-gray-500">
                      Merayakan Cita Rasa, Budaya, dan Keberlanjutan.
                    </p>

                    {/* Metadata Grid */}
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-2 text-xs">
                      <div className="flex items-center gap-2.5">
                        <Calendar size={16} className="shrink-0 text-gray-400" />
                        <div>
                          <p className="text-[10px] text-gray-400">Tanggal</p>
                          <p className="font-medium text-gray-800">8 – 10 Mei 2026 (3 Hari)</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <Clock size={16} className="shrink-0 text-gray-400" />
                        <div>
                          <p className="text-[10px] text-gray-400">Waktu</p>
                          <p className="font-medium text-gray-800">09.00 – 22.00 WITA</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <MapPin size={16} className="shrink-0 text-gray-400" />
                        <div>
                          <p className="text-[10px] text-gray-400">Lokasi</p>
                          <p className="font-medium text-gray-800">Ubud, Gianyar, Bali</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <CookingPot size={16} className="shrink-0 text-gray-400" />
                        <div>
                          <p className="text-[10px] text-gray-400">Jenis Acara</p>
                          <p className="font-medium text-gray-800">Festival Kuliner</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <Users size={16} className="shrink-0 text-gray-400" />
                        <div>
                          <p className="text-[10px] text-gray-400">Pengunjung</p>
                          <p className="font-medium text-gray-800">Terbuka untuk umum</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500"></span>
                        <div>
                          <p className="text-[10px] text-gray-400">Status</p>
                          <p className="font-medium text-emerald-700">Akan Datang</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-5 flex flex-wrap items-center gap-2 pt-2">
                    <button className="flex items-center gap-2 rounded-lg bg-[#3B1E14] px-5 py-2 text-xs font-medium text-white transition hover:bg-[#2A150E]">
                      <Bookmark size={14} className="shrink-0" /> Simpan
                    </button>
                    <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-50">
                      <Share2 size={14} className="shrink-0" /> Bagikan
                    </button>
                    <button className="flex items-center justify-center rounded-lg border border-gray-200 bg-white p-2 text-gray-600 transition hover:bg-gray-50">
                      <MoreHorizontal size={16} className="shrink-0" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ---------- Section 1: Tentang Acara ---------- */}
            <div className="mt-6 w-full rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="text-sm font-bold text-[#3B1E14]">Tentang Acara</h2>
              <p className="mt-2 text-xs leading-relaxed text-gray-600">
                Ubud Food Festival (UFF) adalah festival kuliner tahunan yang diselenggarakan di Ubud, Bali. Festival ini menjadi platform untuk merayakan kekayaan kuliner Indonesia melalui program yang menginspirasi, edukatif, dan berkelanjutan. UFF menghadirkan chef ternama, pakar gastronomi, petani lokal, dan komunitas untuk berbagi pengetahuan, pengalaman, dan inovasi.
              </p>
            </div>

            {/* ---------- Section 2: Jadwal & Rangkaian Acara ---------- */}
            <div className="mt-6 w-full rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h2 className="text-sm font-bold text-[#3B1E14]">Jadwal & Rangkaian Acara</h2>
                <button className="flex items-center gap-1 text-xs font-semibold text-[#6B2E1E] hover:underline">
                  Lihat Lengkap <ArrowRight size={12} className="shrink-0" />
                </button>
              </div>

              {/* Schedule Table / List */}
              <div className="mt-4 divide-y divide-gray-100">
                {scheduleData.map((dayGroup, idx) => (
                  <div key={idx} className="py-4 first:pt-0 last:pb-0">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
                      {/* Date Badge */}
                      <div className="md:col-span-2">
                        <div className="flex h-16 w-16 flex-col items-center justify-center rounded-xl bg-[#F9F0E2] text-[#3B1E14]">
                          <span className="text-xl font-bold leading-none">{dayGroup.date}</span>
                          <span className="mt-1 text-[9px] font-semibold tracking-wider">{dayGroup.month}</span>
                        </div>
                      </div>

                      {/* Timeline Items */}
                      <div className="space-y-3 md:col-span-10">
                        {dayGroup.items.map((item, itemIdx) => (
                          <div
                            key={itemIdx}
                            className="flex flex-col justify-between rounded-lg bg-gray-50/70 p-3 sm:flex-row sm:items-center"
                          >
                            <div>
                              <span className="text-[11px] font-semibold text-[#6B2E1E]">
                                {item.time}
                              </span>
                              <h4 className="mt-0.5 text-xs font-bold text-gray-800">
                                {item.title}
                              </h4>
                            </div>
                            <div className="mt-1 flex items-center gap-1 text-[11px] text-gray-500 sm:mt-0">
                              <MapPin size={12} className="shrink-0" />
                              <span>{item.location}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ---------- Section 3: Pembicara & Pengisi Acara ---------- */}
            <div className="mt-6 w-full rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-[#3B1E14]">Pembicara & Pengisi Acara</h2>
                <div className="flex items-center gap-1">
                  <button className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50">
                    <ChevronLeft size={14} className="shrink-0" />
                  </button>
                  <button className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50">
                    <ChevronRight size={14} className="shrink-0" />
                  </button>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
                {speakers.map((spk, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center rounded-xl border border-gray-100 bg-white p-3 text-center transition hover:shadow-sm"
                  >
                    <img
                      src={spk.img}
                      alt={spk.name}
                      className="h-16 w-16 rounded-full object-cover"
                    />
                    <h4 className="mt-2.5 text-xs font-bold text-gray-800 leading-tight">
                      {spk.name}
                    </h4>
                    <p className="mt-0.5 text-[10px] text-gray-500">{spk.role}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ---------- Section 4: Kegiatan Gastronomi ---------- */}
            <div className="mt-6 w-full rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="text-sm font-bold text-[#3B1E14]">Kegiatan Gastronomi</h2>

              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
                {activities.map((act, index) => {
                  const Icon = act.icon;
                  return (
                    <div
                      key={index}
                      className="flex flex-col items-center rounded-xl border border-gray-100 bg-[#FBF9F7] p-3 text-center"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F3EBE1] text-[#3B1E14]">
                        <Icon size={18} className="shrink-0" />
                      </div>
                      <h4 className="mt-2 text-xs font-bold text-gray-800 leading-tight">
                        {act.title}
                      </h4>
                      <p className="mt-1 text-[10px] text-gray-500 leading-relaxed">
                        {act.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ---------- Section 5: Dokumentasi Sebelumnya ---------- */}
            <div className="mt-6 w-full rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-[#3B1E14]">Dokumentasi Sebelumnya</h2>
                <button className="flex items-center gap-1 text-xs font-semibold text-[#6B2E1E] hover:underline">
                  Lihat Semua <ArrowRight size={12} className="shrink-0" />
                </button>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
                <img
                  src={ubudFood}
                  alt="Doc 1"
                  className="h-28 w-full rounded-xl object-cover"
                />
                <img
                  src={megibung}
                  alt="Doc 2"
                  className="h-28 w-full rounded-xl object-cover"
                />
                <img
                  src={lawarBali}
                  alt="Doc 3"
                  className="h-28 w-full rounded-xl object-cover"
                />
                <img
                  src={bebekBetutu}
                  alt="Doc 4"
                  className="h-28 w-full rounded-xl object-cover"
                />
                <div className="relative flex h-28 w-full items-center justify-center overflow-hidden rounded-xl bg-gray-900">
                  <img
                    src={exploreHero}
                    alt="Doc 5"
                    className="h-full w-full object-cover opacity-40"
                  />
                  <span className="absolute text-center text-sm font-bold text-white">+15<br />Foto lainnya</span>
                </div>
              </div>
            </div>

            {/* ---------- Banner Kontribusi ---------- */}
            <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-xl bg-[#F6EFE9] p-5 sm:flex-row w-full">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EBDDD3] text-[#3B1E14]">
                  <BookOpen size={20} className="shrink-0" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#3B1E14]">
                    Bagikan informasi ini atau kontribusikan dokumentasi terkait acara ini
                  </h3>
                  <p className="text-[11px] text-gray-600">
                    agar lebih banyak orang dapat mengenal kekayaan kuliner dan budaya Indonesia.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50">
                  Bagikan
                </button>
                <button className="rounded-lg bg-[#3B1E14] px-4 py-1.5 text-xs font-medium text-white transition hover:bg-[#2A150E]">
                  Kontribusi Konten
                </button>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Sidebar (4 Cols) */}
          <div className="w-full space-y-6 lg:col-span-4">
            
            {/* ---------- Sidebar 1: Informasi Singkat ---------- */}
            <div className="w-full rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="text-xs font-bold text-gray-800">Informasi Singkat</h3>

              <div className="mt-4 space-y-3 text-xs">
                <div className="flex items-start gap-3">
                  <Calendar size={16} className="mt-0.5 shrink-0 text-gray-400" />
                  <div>
                    <p className="text-[10px] text-gray-400">Nama Acara</p>
                    <p className="font-semibold text-gray-800">Ubud Food Festival 2026</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Sparkles size={16} className="mt-0.5 shrink-0 text-gray-400" />
                  <div>
                    <p className="text-[10px] text-gray-400">Tema</p>
                    <p className="font-semibold text-gray-800">Sustainable Food for a Better Future</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CookingPot size={16} className="mt-0.5 shrink-0 text-gray-400" />
                  <div>
                    <p className="text-[10px] text-gray-400">Kategori</p>
                    <p className="font-semibold text-gray-800">Festival Kuliner</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users size={16} className="mt-0.5 shrink-0 text-gray-400" />
                  <div>
                    <p className="text-[10px] text-gray-400">Penyelenggara</p>
                    <p className="font-semibold text-gray-800">Yayasan Mudra Swari Saraswati</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-gray-400" />
                  <div>
                    <p className="text-[10px] text-gray-400">Lokasi</p>
                    <p className="font-semibold text-gray-800">Ubud, Gianyar, Bali</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users size={16} className="mt-0.5 shrink-0 text-gray-400" />
                  <div>
                    <p className="text-[10px] text-gray-400">Target Peserta</p>
                    <p className="font-semibold text-gray-800">Masyarakat umum, pecinta kuliner, komunitas, dan pelaku industri</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Globe size={16} className="mt-0.5 shrink-0 text-gray-400" />
                  <div>
                    <p className="text-[10px] text-gray-400">Bahasa</p>
                    <p className="font-semibold text-gray-800">Indonesia, Inggris</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ---------- Sidebar 2: Lokasi Acara & OpenStreetMap ---------- */}
            <div className="w-full rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-gray-800">Lokasi Acara</h3>
                <a
                  href={`https://www.openstreetmap.org/?mlat=${position[0]}&mlon=${position[1]}#map=16/${position[0]}/${position[1]}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded border border-gray-200 px-2 py-1 text-[10px] font-medium text-gray-600 hover:bg-gray-50"
                >
                  Buka di OpenStreetMap
                </a>
              </div>

              <p className="mt-2 text-xs font-bold text-gray-800">Taman Kuliner, Ubud</p>
              <p className="text-[11px] text-gray-500">
                Jl. Raya Ubud No.8, Ubud, Gianyar, Bali 80571
              </p>

              {/* OpenStreetMap Component */}
              <div className="mt-3 h-44 w-full rounded-xl overflow-hidden border border-gray-200 relative z-0">
                <MapContainer
                  center={position}
                  zoom={15}
                  scrollWheelZoom={false}
                  className="h-full w-full"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={position}>
                    <Popup>
                      <div className="text-xs font-sans">
                        <strong className="block text-gray-800">Taman Kuliner Ubud</strong>
                        <span className="text-gray-500">Ubud Food Festival 2026</span>
                      </div>
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>

            {/* ---------- Sidebar 3: Penyelenggara ---------- */}
            <div className="w-full rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="text-xs font-bold text-gray-800">Penyelenggara</h3>

              <div className="mt-3 flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-900 text-white font-bold text-xs">
                  UFF
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-800">
                    Yayasan Mudra Swari Saraswati (YMSS)
                  </h4>
                  <p className="mt-1 text-[10px] text-gray-500 leading-relaxed">
                    Organisasi nirlaba yang berfokus pada pelestarian budaya dan pengembangan kuliner berkelanjutan.
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-2 border-t border-gray-100 pt-3 text-xs">
                <div className="flex items-center gap-2 text-gray-600">
                  <Globe size={14} className="shrink-0 text-gray-400" />
                  <a href="https://www.ubudfoodfestival.com" target="_blank" rel="noreferrer" className="text-[11px] text-gray-700 hover:underline">
                    www.ubudfoodfestival.com
                  </a>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <Mail size={14} className="shrink-0 text-gray-400" />
                  <span className="text-[11px]">info@ubudfoodfestival.com</span>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <Phone size={14} className="shrink-0 text-gray-400" />
                  <span className="text-[11px]">+62 361 971745</span>
                </div>

                {/* Media Sosial */}
                <div className="flex items-center gap-3 pt-2">
                  <span className="shrink-0 text-[10px] text-gray-400">Media Sosial</span>
                  <div className="flex items-center gap-2 text-gray-600">
                    <a 
                      href="https://instagram.com" 
                      target="_blank" 
                      rel="noreferrer"
                      className="transition hover:text-[#3B1E14]"
                    >
                      <FaInstagram size={16} className="shrink-0" />
                    </a>
                    
                    <a 
                      href="https://facebook.com" 
                      target="_blank" 
                      rel="noreferrer"
                      className="transition hover:text-[#3B1E14]"
                    >
                      <FaFacebook size={16} className="shrink-0" />
                    </a>

                    <a 
                      href="https://youtube.com" 
                      target="_blank" 
                      rel="noreferrer"
                      className="transition hover:text-[#3B1E14]"
                    >
                      <FaYoutube size={16} className="shrink-0" />
                    </a>

                    <Globe size={16} className="shrink-0 cursor-pointer transition hover:text-[#3B1E14]" />
                  </div>
                </div>
              </div>
            </div>

            {/* ---------- Sidebar 4: Informasi Tambahan ---------- */}
            <div className="w-full rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="text-xs font-bold text-gray-800">Informasi Tambahan</h3>

              <div className="mt-3 space-y-3 text-xs">
                <div className="flex items-start gap-2.5">
                  <Ticket size={16} className="mt-0.5 shrink-0 text-gray-400" />
                  <div>
                    <p className="text-[10px] text-gray-400">Harga Tiket</p>
                    <p className="font-semibold text-gray-800">Presale mulai dari Rp150.000 / hari</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <FileCheck size={16} className="mt-0.5 shrink-0 text-gray-400" />
                  <div>
                    <p className="text-[10px] text-gray-400">Pendaftaran</p>
                    <p className="font-semibold text-gray-800">
                      Tiket dapat dibeli melalui website resmi atau mitra tiket resmi.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Info size={16} className="mt-0.5 shrink-0 text-gray-400" />
                  <div>
                    <p className="text-[10px] text-gray-400">Fasilitas</p>
                    <p className="font-semibold text-gray-800">
                      Area parkir, toilet, mushola, area duduk, akses difabel.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock size={16} className="mt-0.5 shrink-0 text-gray-400" />
                  <div>
                    <p className="text-[10px] text-gray-400">Catatan</p>
                    <p className="font-semibold text-gray-800">
                      Jadwal dapat berubah sewaktu-waktu. Ikuti media sosial untuk update terbaru.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ---------- Sidebar 5: Metadata ---------- */}
            <div className="w-full rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="text-xs font-bold text-gray-800">Metadata</h3>

              <div className="mt-4 space-y-3 text-xs">
                <div className="flex items-start gap-2.5">
                  <Info size={16} className="mt-0.5 shrink-0 text-gray-400" />
                  <div>
                    <p className="text-[10px] text-gray-400">Sumber Informasi</p>
                    <p className="font-semibold text-gray-800">Situs Resmi Ubud Food Festival</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Users size={16} className="mt-0.5 shrink-0 text-gray-400" />
                  <div>
                    <p className="text-[10px] text-gray-400">Dikontribusikan oleh</p>
                    <p className="font-semibold text-gray-800">I Made Suarta, S.Pd., M.Par</p>
                    <p className="text-[10px] text-gray-400">Pakar Gastronomi Bali</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Calendar size={16} className="mt-0.5 shrink-0 text-gray-400" />
                  <div>
                    <p className="text-[10px] text-gray-400">Tanggal Dokumentasi</p>
                    <p className="font-semibold text-gray-800">12 Mei 2024</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <RefreshCw size={16} className="mt-0.5 shrink-0 text-gray-400" />
                  <div>
                    <p className="text-[10px] text-gray-400">Terakhir Diperbarui</p>
                    <p className="font-semibold text-gray-800">13 Mei 2024</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle size={16} className="mt-0.5 shrink-0 text-green-600" />
                  <div>
                    <p className="text-[10px] text-gray-400">Status Terverifikasi</p>
                    <p className="font-semibold text-green-700">Telah Diverifikasi Tim Editor</p>
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

export default AgendaDetail;