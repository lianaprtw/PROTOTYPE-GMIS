import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Clock,
  Bookmark,
  Share2,
  MoreVertical,
  Utensils,
  Award,
  Download,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Asset Dummy / Import sesuai struktur project
import lawarMain from "../assets/lawar-bali.jpg";
import lawarThumb1 from "../assets/lawar-bali.jpg";
import lawarThumb2 from "../assets/megibung.jpg";
import lawarThumb3 from "../assets/bebek-betutu.jpeg";
import lawarThumb4 from "../assets/jaje-bali.jpg";

// Custom Leaflet marker icon fix untuk React
const customIcon = new L.Icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const CulinaryDetail = () => {
  const [activeTab, setActiveTab] = useState("sec-info");
  const [activeMediaTab, setActiveMediaTab] = useState("foto");

  // Data Detail Kuliner
  const culinaryData = {
    title: "Lawar Bali",
    badge: "Kuliner Tradisional Bali",
    subtitle:
      "Hidangan tradisional Bali yang kaya rempah dan memiliki makna budaya yang mendalam.",
    origin: "Bali",
    category: "Hidangan Utama",
    difficulty: "Sedang",
    prepTime: "45 Menit",

    // Koordinat Lokasi (Ubud, Gianyar)
    coordinates: {
      lat: -8.506854,
      lng: 115.262497,
    },

    // Sidebar Informasi Singkat
    alias: "Lawar Kalangan",
    type: "Hidangan Campur",
    taste: "Gurih, pedas, sedikit manis",
    mainIngredients: "Sayuran, kelapa, daging, bumbu Bali",
    servingWay: "Sebagai lauk atau pelengkap upacara adat",

    // Verifikator
    verifier: {
      name: "I Made Suarta, S.Pd., M.Par",
      role: "Pakar Gastronomi",
      date: "12 Mei 2024",
    },

    // Keterkaitan
    relatedIngredients: ["Base Genep Bali", "Kelapa Parut", "Kacang Panjang"],
    relatedAgendas: ["Piodalan Pura", "Galungan", "Ubud Food Festival"],
    relatedDestinations: "Ubud, Gianyar, Bali",

    // Tahukah Kamu
    funFact:
      "Lawar bukan hanya makanan, tetapi juga simbol keseimbangan dalam budaya Bali yang melambangkan harmoni antara manusia, alam, dan Sang Pencipta.",

    // Resep & Bahan
    portion: "Untuk 4 Porsi",
    ingredients: [
      "200 g daging cincang (ayam/sapi/babi)",
      "100 g kelapa parut sangrai",
      "100 g kacang panjang, iris halus",
      "50 g kacang kedelai, rebus",
      "2 sdm Base Genep Bali",
      "1 batang serai, iris halus",
      "2 lembar daun jeruk, iris halus",
      "1 sdm air jeruk limau",
      "Garam secukupnya",
    ],
    steps: [
      "Campurkan daging cincang dengan Base Genep, serai, dan daun jeruk. Aduk rata.",
      "Masak daging hingga matang dan bumbu meresap. Angkat dan dinginkan.",
      "Campurkan kelapa parut sangrai, kacang panjang, dan kacang kedelai.",
      "Masukkan daging yang sudah dimasak ke dalam campuran sayuran.",
      "Tambahkan air jeruk limau dan garam secukupnya.",
      "Aduk rata hingga semua bahan tercampur sempurna.",
      "Sajikan Lawar Bali.",
    ],
    timeDetail: {
      prep: "20 Menit",
      cook: "25 Menit",
      total: "45 Menit",
      servings: "4 Porsi",
    },

    // Budaya
    cultureDescription:
      "Lawar memiliki makna filosofis dalam budaya Bali sebagai simbol keseimbangan antara unsur baik dan buruk (Rwa Bhineda). Lawar sering digunakan dalam upacara adat seperti Galungan, Kuningan, dan upacara keagamaan lainnya sebagai bentuk persembahan kepada Ida Sang Hyang Widhi Wasa.",
    history:
      "Lawar telah ada sejak zaman kerajaan di Bali dan menjadi bagian dari tradisi kuliner yang turun-temurun.",
    philosophy:
      "Melambangkan keseimbangan dan keselarasan alam semesta dalam filosofi Tri Hita Karana.",
    ritual:
      "Disajikan dalam upacara adat sebagai persembahan dan simbol rasa syukur kepada Tuhan.",

    // Sumber
    source:
      "Wawancara dengan Pakar Gastronomi Bali, Buku Kuliner Tradisional Bali, Dinas Pariwisata Provinsi Bali.",
    lastUpdated: "12 Mei 2024",
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-gray-800">
      <Navbar />

      <main className="mx-auto max-w-[1240px] px-6 py-6">
        {/* ==================== BREADCRUMB ==================== */}
        <nav className="mb-6 flex items-center gap-2 text-xs text-gray-500">
          <Link to="/explore" className="hover:text-[#4B2417]">
            Explore
          </Link>
          <span>/</span>
          <Link to="/explore?category=Culinary" className="hover:text-[#4B2417]">
            Informasi Kuliner
          </Link>
          <span>/</span>
          <span className="font-semibold text-[#4B2417]">
            {culinaryData.title}
          </span>
        </nav>

        {/* ==================== HERO SECTION & SIDEBAR ==================== */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Main Content Area Left (8 Cols) */}
          <div className="lg:col-span-8">
            {/* Gallery Header */}
            <div className="space-y-3">
              <div className="overflow-hidden rounded-2xl bg-gray-200">
                <img
                  src={lawarMain}
                  alt={culinaryData.title}
                  className="h-[380px] w-full object-cover"
                />
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-5 gap-3">
                <img
                  src={lawarThumb1}
                  alt="Thumb 1"
                  className="h-20 w-full cursor-pointer rounded-xl object-cover ring-2 ring-[#6B2E1E]"
                />
                <img
                  src={lawarThumb2}
                  alt="Thumb 2"
                  className="h-20 w-full cursor-pointer rounded-xl object-cover opacity-80 hover:opacity-100"
                />
                <img
                  src={lawarThumb3}
                  alt="Thumb 3"
                  className="h-20 w-full cursor-pointer rounded-xl object-cover opacity-80 hover:opacity-100"
                />
                <img
                  src={lawarThumb4}
                  alt="Thumb 4"
                  className="h-20 w-full cursor-pointer rounded-xl object-cover opacity-80 hover:opacity-100"
                />
                <div className="relative flex h-20 w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl bg-black/60 font-semibold text-white">
                  <img
                    src={lawarThumb1}
                    alt="Thumb More"
                    className="absolute inset-0 -z-10 h-full w-full object-cover opacity-40"
                  />
                  +12
                </div>
              </div>
            </div>

            {/* Header Info */}
            <div className="mt-6 border-b border-gray-200 pb-6">
              <span className="inline-block rounded-md bg-[#F4EBE1] px-3 py-1 text-xs font-semibold text-[#6B2E1E]">
                {culinaryData.badge}
              </span>

              <h1 className="mt-2 text-3xl font-extrabold text-[#2D180E]">
                {culinaryData.title}
              </h1>

              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                {culinaryData.subtitle}
              </p>

              {/* Quick Specs Grid */}
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-3 shadow-sm">
                  <div className="rounded-lg bg-[#F9F1E5] p-2 text-[#6B2E1E]">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-medium text-gray-400">
                      Asal Daerah
                    </p>
                    <p className="text-xs font-bold text-gray-800">
                      {culinaryData.origin}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-3 shadow-sm">
                  <div className="rounded-lg bg-[#F9F1E5] p-2 text-[#6B2E1E]">
                    <Utensils size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-medium text-gray-400">
                      Kategori
                    </p>
                    <p className="text-xs font-bold text-gray-800">
                      {culinaryData.category}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-3 shadow-sm">
                  <div className="rounded-lg bg-[#F9F1E5] p-2 text-[#6B2E1E]">
                    <Award size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-medium text-gray-400">
                      Tingkat Kesulitan
                    </p>
                    <p className="text-xs font-bold text-gray-800">
                      {culinaryData.difficulty}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-3 shadow-sm">
                  <div className="rounded-lg bg-[#F9F1E5] p-2 text-[#6B2E1E]">
                    <Clock size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-medium text-gray-400">
                      Waktu Penyajian
                    </p>
                    <p className="text-xs font-bold text-gray-800">
                      {culinaryData.prepTime}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex items-center gap-3">
                <button className="flex items-center gap-2 rounded-xl bg-[#4B2417] px-6 py-2.5 text-xs font-semibold text-white transition hover:bg-[#361a10]">
                  <Bookmark size={15} /> Simpan
                </button>
                <button className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-xs font-semibold text-gray-700 transition hover:bg-gray-50">
                  <Share2 size={15} /> Bagikan
                </button>
                <button className="flex items-center justify-center rounded-xl border border-gray-300 bg-white p-2.5 text-gray-700 transition hover:bg-gray-50">
                  <MoreVertical size={15} />
                </button>
              </div>
            </div>

            {/* Navigation Anchor Tabs */}
            <div className="sticky top-0 z-20 flex border-b border-gray-200 bg-[#FAF8F5] pt-4">
              {[
                { id: "sec-info", label: "Informasi Kuliner" },
                { id: "sec-resep", label: "Resep & Bahan" },
                { id: "sec-budaya", label: "Informasi Budaya" },
                { id: "sec-multimedia", label: "Multimedia" },
                { id: "sec-lokasi", label: "Lokasi" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    scrollToSection(tab.id);
                  }}
                  className={`border-b-2 px-4 pb-3 text-xs font-bold transition-all ${
                    activeTab === tab.id
                      ? "border-[#6B2E1E] text-[#6B2E1E]"
                      : "border-transparent text-gray-500 hover:text-gray-800"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* SECTION 1: Deskripsi */}
            <section id="sec-info" className="py-6">
              <h2 className="text-base font-bold text-[#2D180E]">Deskripsi</h2>
              <p className="mt-2 text-xs leading-relaxed text-gray-600">
                {culinaryData.cultureDescription}
              </p>
            </section>

            {/* SECTION 2: Resep & Bahan */}
            <section id="sec-resep" className="border-t border-gray-200 py-6">
              <h2 className="text-base font-bold text-[#2D180E]">
                Resep & Bahan
              </h2>

              <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-12">
                {/* Bahan-bahan */}
                <div className="flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-5 shadow-sm md:col-span-5">
                  <div>
                    <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                      <h3 className="text-xs font-bold text-[#2D180E]">
                        Bahan-bahan
                      </h3>
                      <span className="text-[11px] text-gray-400">
                        {culinaryData.portion}
                      </span>
                    </div>

                    <ul className="mt-3 space-y-2.5 text-xs text-gray-600">
                      {culinaryData.ingredients.map((ing, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#6B2E1E]" />
                          <span>{ing}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#F9F1E5] py-2.5 text-xs font-semibold text-[#6B2E1E] transition hover:bg-[#f1e4d1]">
                    <Download size={14} /> Unduh Bahan (PDF)
                  </button>
                </div>

                {/* Langkah-langkah */}
                <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm md:col-span-7">
                  <h3 className="border-b border-gray-100 pb-3 text-xs font-bold text-[#2D180E]">
                    Langkah-langkah
                  </h3>

                  <ol className="mt-4 space-y-4">
                    {culinaryData.steps.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#F4EBE1] text-[10px] font-bold text-[#6B2E1E]">
                          {idx + 1}
                        </span>
                        <p className="text-xs leading-relaxed text-gray-600">
                          {step}
                        </p>
                      </li>
                    ))}
                  </ol>

                  {/* Summary Bar Waktu */}
                  <div className="mt-6 grid grid-cols-4 gap-2 rounded-xl border border-gray-100 bg-[#FAF8F5] p-3 text-center">
                    <div>
                      <p className="text-[9px] text-gray-400">Persiapan</p>
                      <p className="text-xs font-bold text-gray-800">
                        {culinaryData.timeDetail.prep}
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] text-gray-400">Memasak</p>
                      <p className="text-xs font-bold text-gray-800">
                        {culinaryData.timeDetail.cook}
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] text-gray-400">Total</p>
                      <p className="text-xs font-bold text-gray-800">
                        {culinaryData.timeDetail.total}
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] text-gray-400">Porsi</p>
                      <p className="text-xs font-bold text-gray-800">
                        {culinaryData.timeDetail.servings}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3: Informasi Budaya */}
            <section
              id="sec-budaya"
              className="border-t border-gray-200 py-6"
            >
              <h2 className="text-base font-bold text-[#2D180E]">
                Informasi Budaya
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-gray-600">
                {culinaryData.cultureDescription}
              </p>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                  <div className="mb-2 flex items-center gap-2 text-[#6B2E1E]">
                    <Utensils size={16} />
                    <h3 className="text-xs font-bold">Sejarah & Asal Usul</h3>
                  </div>
                  <p className="text-[11px] leading-relaxed text-gray-500">
                    {culinaryData.history}
                  </p>
                </div>

                <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                  <div className="mb-2 flex items-center gap-2 text-[#6B2E1E]">
                    <Award size={16} />
                    <h3 className="text-xs font-bold">Makna Budaya</h3>
                  </div>
                  <p className="text-[11px] leading-relaxed text-gray-500">
                    {culinaryData.philosophy}
                  </p>
                </div>

                <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                  <div className="mb-2 flex items-center gap-2 text-[#6B2E1E]">
                    <Calendar size={16} />
                    <h3 className="text-xs font-bold">Tradisi & Ritual</h3>
                  </div>
                  <p className="text-[11px] leading-relaxed text-gray-500">
                    {culinaryData.ritual}
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 4: Multimedia */}
            <section
              id="sec-multimedia"
              className="border-t border-gray-200 py-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-[#2D180E]">
                  Multimedia
                </h2>
                <button className="text-xs font-semibold text-[#6B2E1E] hover:underline">
                  Lihat semua
                </button>
              </div>

              {/* Sub-tab Foto/Video */}
              <div className="mt-3 flex gap-4 text-xs font-semibold">
                <button
                  onClick={() => setActiveMediaTab("foto")}
                  className={`border-b-2 pb-1 ${
                    activeMediaTab === "foto"
                      ? "border-[#6B2E1E] text-[#6B2E1E]"
                      : "border-transparent text-gray-400"
                  }`}
                >
                  Foto
                </button>
                <button
                  onClick={() => setActiveMediaTab("video")}
                  className={`border-b-2 pb-1 ${
                    activeMediaTab === "video"
                      ? "border-[#6B2E1E] text-[#6B2E1E]"
                      : "border-transparent text-gray-400"
                  }`}
                >
                  Video
                </button>
              </div>

              <div className="relative mt-4 grid grid-cols-3 gap-3">
                <div className="h-40 overflow-hidden rounded-xl bg-gray-100">
                  <img
                    src={lawarMain}
                    alt="Media 1"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="h-40 overflow-hidden rounded-xl bg-gray-100">
                  <img
                    src={lawarThumb2}
                    alt="Media 2"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="relative flex h-40 items-center justify-center overflow-hidden rounded-xl bg-black/60 text-sm font-bold text-white">
                  <img
                    src={lawarThumb3}
                    alt="Media 3"
                    className="absolute inset-0 -z-10 h-full w-full object-cover opacity-50"
                  />
                  +16
                </div>

                {/* Navigation Arrow Controls */}
                <button className="absolute -left-3 top-1/2 -translate-y-1/2 rounded-full bg-white p-1.5 text-gray-700 shadow-md hover:bg-gray-50">
                  <ChevronLeft size={16} />
                </button>
                <button className="absolute -right-3 top-1/2 -translate-y-1/2 rounded-full bg-white p-1.5 text-gray-700 shadow-md hover:bg-gray-50">
                  <ChevronRight size={16} />
                </button>
              </div>
            </section>

            {/* SECTION 5: Lokasi (OpenStreetMap via React Leaflet) */}
            <section id="sec-lokasi" className="border-t border-gray-200 py-6">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-[#2D180E]">Lokasi</h2>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${culinaryData.coordinates.lat},${culinaryData.coordinates.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs font-semibold text-[#6B2E1E] hover:underline"
                >
                  Lihat di Peta <ChevronRight size={14} />
                </a>
              </div>

              <div className="mt-4 h-64 w-full overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
                <MapContainer
                  center={[
                    culinaryData.coordinates.lat,
                    culinaryData.coordinates.lng,
                  ]}
                  zoom={13}
                  scrollWheelZoom={false}
                  className="h-full w-full z-0"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker
                    position={[
                      culinaryData.coordinates.lat,
                      culinaryData.coordinates.lng,
                    ]}
                    icon={customIcon}
                  >
                    <Popup>
                      <div className="font-semibold text-[#2D180E]">
                        {culinaryData.title}
                      </div>
                      <div className="text-xs text-gray-600">
                        {culinaryData.relatedDestinations}
                      </div>
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </section>

            {/* Sumber & Referensi */}
            <div className="mt-4 flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-5 text-xs text-gray-500 sm:flex-row sm:items-center gap-2">
              <div>
                <span className="font-bold text-gray-700">
                  Sumber & Referensi:
                </span>
                <p className="mt-0.5">{culinaryData.source}</p>
              </div>
              <span className="shrink-0 text-[11px] text-gray-400">
                Terakhir diperbarui: {culinaryData.lastUpdated}
              </span>
            </div>
          </div>

          {/* Sidebar Area Right (4 Cols) */}
          <div className="sticky top-20 h-fit space-y-6 lg:col-span-4">
            {/* 1. Informasi Singkat */}
            <div className="rounded-2xl border border-[#F2E8D9] bg-[#FDF9F3] p-5">
              <h3 className="border-b border-[#F2E8D9] pb-3 text-sm font-bold text-[#2D180E]">
                Informasi Singkat
              </h3>

              <div className="mt-4 space-y-4 text-xs">
                <div>
                  <p className="text-[10px] font-medium text-gray-400">
                    Nama Lain
                  </p>
                  <p className="font-semibold text-gray-800">
                    {culinaryData.alias}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-medium text-gray-400">Jenis</p>
                  <p className="font-semibold text-gray-800">
                    {culinaryData.type}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-medium text-gray-400">
                    Cita Rasa
                  </p>
                  <p className="font-semibold text-gray-800">
                    {culinaryData.taste}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-medium text-gray-400">
                    Bahan Utama
                  </p>
                  <p className="font-semibold text-gray-800">
                    {culinaryData.mainIngredients}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-medium text-gray-400">
                    Cara Penyajian
                  </p>
                  <p className="font-semibold text-gray-800">
                    {culinaryData.servingWay}
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Diverifikasi oleh */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <p className="mb-3 text-[11px] font-medium text-gray-400">
                Diverifikasi oleh
              </p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-200">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
                    alt={culinaryData.verifier.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-800">
                    {culinaryData.verifier.name}
                  </p>
                  <p className="text-[10px] font-medium text-[#6B2E1E]">
                    {culinaryData.verifier.role}
                  </p>
                  <p className="mt-0.5 text-[9px] text-gray-400">
                    {culinaryData.verifier.date}
                  </p>
                </div>
              </div>
            </div>

            {/* 3. Keterkaitan */}
            <div className="space-y-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="border-b border-gray-100 pb-3 text-sm font-bold text-[#2D180E]">
                Keterkaitan
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <p className="mb-1 text-[10px] font-medium text-gray-400">
                    Bahan Terkait
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {culinaryData.relatedIngredients.map((item, i) => (
                      <span
                        key={i}
                        className="rounded-md bg-[#F9F1E5] px-2.5 py-1 text-[11px] font-semibold text-[#6B2E1E]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-1 text-[10px] font-medium text-gray-400">
                    Agenda Terkait
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {culinaryData.relatedAgendas.map((item, i) => (
                      <span
                        key={i}
                        className="rounded-md bg-gray-100 px-2.5 py-1 text-[11px] font-medium text-gray-700"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-1 text-[10px] font-medium text-gray-400">
                    Destinasi Terkait
                  </p>
                  <span className="inline-block rounded-md bg-gray-100 px-2.5 py-1 text-[11px] font-medium text-gray-700">
                    {culinaryData.relatedDestinations}
                  </span>
                </div>
              </div>
            </div>

            {/* 4. Tahukah Kamu? */}
            <div className="relative overflow-hidden rounded-2xl border border-[#F2E3CE] bg-gradient-to-br from-[#FDF8F2] to-[#FAF1E4] p-5">
              <h3 className="text-sm font-bold text-[#4B2417]">Tahukah Kamu?</h3>
              <p className="relative z-10 mt-3 text-xs italic leading-relaxed text-gray-600">
                "{culinaryData.funFact}"
              </p>
              <div className="absolute -bottom-4 -right-4 -z-0 h-20 w-20 rounded-full bg-[#E8D5C2]/30" />
            </div>

            {/* 5. Rekomendasi Kuliner Terkait */}
            <div className="space-y-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="border-b border-gray-100 pb-3 text-sm font-bold text-[#2D180E]">
                Kuliner Serupa
              </h3>
              <div className="space-y-3">
                {[
                  {
                    name: "Ayam Betutu",
                    location: "Gianyar, Bali",
                    img: lawarThumb3,
                  },
                  {
                    name: "Sate Lilit Bali",
                    location: "Denpasar, Bali",
                    img: lawarThumb2,
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="group flex cursor-pointer items-center gap-3"
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      className="h-12 w-12 rounded-xl object-cover transition group-hover:scale-105"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-gray-800 transition group-hover:text-[#6B2E1E]">
                        {item.name}
                      </h4>
                      <p className="text-[10px] text-gray-400">
                        {item.location}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CulinaryDetail;